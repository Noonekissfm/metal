import React, { FC } from "react";
import { Category } from "src/components/Category";
import { ItemCard } from "src/components/ItemCard";
import { sortData } from "./utils";

import style from "./style.module.css";
import { Description } from "../Description";
import { Categories, SubCategories } from "src/models/menu";

interface IProps {
  data: SubCategories | Categories;
}

export const CategoryItem: FC<IProps> = ({ data }) => {
  const isSubCategory = data.subCategory && data.subCategory.length > 0;
  const isCategoryDescription =
    "description" in data && !!data.description && isSubCategory;
  const renderData = isSubCategory && sortData(data.subCategory, "title");
  const subCategory = "menu_path" in data ? data : null;

  return (
    <>
      {isSubCategory && (
        <div className={style["menu_item_wrapper"]}>
          {renderData.map((item: { title: string; key: string }) => {
            return (
              item.title && (
                <Category
                  categoryKey={item.key}
                  title={item.title}
                  key={item.key}
                />
              )
            );
          })}
        </div>
      )}
      {isCategoryDescription && <Description description={data.description} />}
      {!!subCategory && !subCategory.subCategory.length && (
        <ItemCard data={subCategory} />
      )}
    </>
  );
};
