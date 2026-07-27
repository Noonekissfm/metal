import React, { FC, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SEARCH_MIN_LENGTH, searchProducts } from 'src/api/catalog';
import { useCatalog } from 'src/context/CatalogContext';
import { useDebouncedValue } from 'src/hooks';
import { CategoryNode, Product } from 'src/models/catalog';
import { buildCatalogUrl, buildProductUrl } from 'src/utils/catalogUrl';
import { formatPrice } from 'src/utils/price';

import style from './style.module.css';

const DEBOUNCE_MS = 250;
const CATEGORY_LIMIT = 5;

interface Hit {
    /** Готовый адрес — по нему же различаем строки списка. */
    url: string;
    title: string;
    /** Две ближайшие категории — двадцать «Труба 40х40» иначе не отличить.
     *  Весь путь не годится: в каталоге шесть уровней, это шесть строк. */
    context: string;
    price: number | null;
}

export const SearchBar: FC = () => {
    const navigate = useNavigate();
    const { root, getPathKeys, getEffectivePrice } = useCatalog();

    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const listId = useId();

    const term = query.trim();
    const isReady = term.length >= SEARCH_MIN_LENGTH;
    const debouncedTerm = useDebouncedValue(isReady ? term : '', DEBOUNCE_MS);

    // Категории лежат в памяти целиком, поэтому ищутся без запроса к серверу.
    const categoryHits = useMemo<Hit[]>(() => {
        if (!isReady || !root) return [];

        // Как и у товаров: слова могут стоять в любом порядке.
        const words = term.toLocaleLowerCase('ru').split(/\s+/).filter(Boolean);
        const found: CategoryNode[] = [];

        const walk = (node: CategoryNode) => {
            if (found.length >= CATEGORY_LIMIT) return;

            const title = node.title.toLocaleLowerCase('ru');

            if (node !== root && words.every((word) => title.includes(word))) {
                found.push(node);
            }

            node.children.forEach(walk);
        };

        walk(root);

        return found.map((node) => ({
            url: buildCatalogUrl(getPathKeys(node.id)),
            title: node.title,
            context: node.menu_path.slice(-3, -1).join(' / '),
            price: null,
        }));
    }, [isReady, term, root, getPathKeys]);

    useEffect(() => {
        if (!debouncedTerm) {
            setProducts([]);
            setIsSearching(false);
            return;
        }

        let cancelled = false;
        setIsSearching(true);

        searchProducts(debouncedTerm)
            .then((items) => {
                if (!cancelled) setProducts(items);
            })
            .catch(() => {
                // Поиск не должен ломать шапку: остаются найденные категории.
                if (!cancelled) setProducts([]);
            })
            .finally(() => {
                if (!cancelled) setIsSearching(false);
            });

        return () => {
            cancelled = true;
        };
    }, [debouncedTerm]);

    const productHits = useMemo<Hit[]>(
        () =>
            products.map((product) => {
                const categoryPath = getPathKeys(product.category);

                return {
                    url: buildProductUrl(categoryPath, product.key),
                    title: product.title,
                    context: product.menu_path.slice(-3, -1).join(' / '),
                    price: getEffectivePrice(product),
                };
            }),
        [products, getPathKeys, getEffectivePrice],
    );

    const hits = useMemo(() => [...categoryHits, ...productHits], [categoryHits, productHits]);

    useEffect(() => setActiveIndex(-1), [hits]);

    // Клик вне поля закрывает подсказки.
    useEffect(() => {
        if (!isOpen) return;

        const onPointerDown = (event: MouseEvent) => {
            if (!wrapperRef.current?.contains(event.target as Node)) setIsOpen(false);
        };

        document.addEventListener('mousedown', onPointerDown);

        return () => document.removeEventListener('mousedown', onPointerDown);
    }, [isOpen]);

    const go = (url: string) => {
        setIsOpen(false);
        setQuery('');
        window.scrollTo({ top: 0 });
        navigate(url);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
            setIsOpen(false);
            return;
        }

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            if (!hits.length) return;

            event.preventDefault();
            setIsOpen(true);
            setActiveIndex((current) => {
                const next = current + (event.key === 'ArrowDown' ? 1 : -1);

                if (next < 0) return hits.length - 1;
                if (next >= hits.length) return 0;

                return next;
            });
            return;
        }

        if (event.key === 'Enter') {
            const hit = hits[activeIndex] || hits[0];

            if (hit) {
                event.preventDefault();
                go(hit.url);
            }
        }
    };

    const showPanel = isOpen && isReady;
    const isEmpty = !isSearching && !hits.length;

    const renderGroup = (label: string, groupHits: Hit[], offset: number) =>
        groupHits.length > 0 && (
            <li className={style.group}>
                <p className={style.groupTitle} id={`${listId}-${label}`}>
                    {label}
                </p>
                <ul className={style.groupList} aria-labelledby={`${listId}-${label}`}>
                    {groupHits.map((hit, index) => {
                        const position = offset + index;

                        return (
                            <li key={hit.url}>
                                <button
                                    type="button"
                                    id={`${listId}-option-${position}`}
                                    role="option"
                                    aria-selected={position === activeIndex}
                                    className={
                                        position === activeIndex
                                            ? `${style.option} ${style.optionActive}`
                                            : style.option
                                    }
                                    // mousedown закрыл бы список раньше клика.
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={() => go(hit.url)}
                                >
                                    <span className={style.optionTitle}>{hit.title}</span>
                                    {!!hit.context && (
                                        <span className={style.optionContext}>{hit.context}</span>
                                    )}
                                    {hit.price !== null && (
                                        <span className={style.optionPrice}>
                                            {formatPrice(hit.price)} руб./т
                                        </span>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </li>
        );

    return (
        <div className={style.wrapper} ref={wrapperRef}>
            <input
                type="search"
                className={style.input}
                placeholder="Поиск по каталогу"
                aria-label="Поиск по каталогу"
                value={query}
                onChange={(event) => {
                    setQuery(event.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                onKeyDown={onKeyDown}
                role="combobox"
                aria-expanded={showPanel}
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={
                    activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined
                }
                autoComplete="off"
            />

            {showPanel && (
                <ul className={style.panel} id={listId} role="listbox">
                    {renderGroup('Категории', categoryHits, 0)}
                    {renderGroup('Товары', productHits, categoryHits.length)}
                    {isSearching && !hits.length && <li className={style.hint}>Ищем…</li>}
                    {isEmpty && <li className={style.hint}>Ничего не найдено</li>}
                </ul>
            )}
        </div>
    );
};
