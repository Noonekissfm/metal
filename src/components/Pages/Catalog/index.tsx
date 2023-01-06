import React, { FC, useMemo } from "react";

import { TCategory } from "../../../models/menu";
import { Category } from "../../Category";

import "./style.css";

interface IProps {
  data: any;
}

export const Catalog: FC<IProps> = ({ data }) => {
  const renderData: TCategory[] = useMemo(() => {
    const keys = Object.keys(data).filter((key) => key !== "_meta");

    // Get sub Categories data
    const getSubCategories = (category: any, key: string) => {
      const keys = Object.keys(category[key]).filter(
        (subKey) => subKey !== "_meta"
      );
      return keys.map((subKey) => ({
        key: subKey,
        name: category[key][subKey]._meta.title,
      }));
    };

    return keys.map((key) => ({
      key,
      name: data[key]._meta.title,
      subCategories: getSubCategories(data, key),
    }));
  }, [data]);

  return (
    <div className="wrapper">
      <ul className="catalog">
        {renderData.map((item) => (
          <Category data={item} />
        ))}
      </ul>
    </div>
  );
};
