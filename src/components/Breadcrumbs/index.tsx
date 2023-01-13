import React, { FC } from "react";

import { CurrentPage } from "./components/CurrentPage/CurrentPage";
import { PreviousPage } from "./components/PreviousPage/PreviousPage";

import { getLinksObject } from "./utils";

import "./style.css";

interface IProps {
  keys: string[];
  titles: string[];
}

export const Breadcrumbs: FC<IProps> = ({ keys, titles }) => {
  const links = getLinksObject(keys, titles);

  return (
    <ul className="breadcrumbs">
      {links.map((item: any, index: number) => {

        const isLastLink = index === links.length - 1;
        const key = `${item}-${index}`;

        if (isLastLink) {
          return <CurrentPage key={key} title={item.title} />;
        }

        return (
          <PreviousPage
            link={item._link}
            title={item.title}
            key={key}
          />
        );
      })}
    </ul>
  );
};
