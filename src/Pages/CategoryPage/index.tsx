import React, { FC, useMemo } from "react";
import { useUrlParams } from "src/hooks";
import { getRenderData } from "src/utils/utils";

import { NotFoundPage } from "../NotFoundPage";
import { Navigation } from "./components/Navigation";
import { CategoryItem } from "./components/CategoryItem";

import { Categories } from "src/models/menu";

import style from "./style.module.css";
interface IProps {
  data: Categories[];
}

export const CategoryPage: FC<IProps> = ({ data }) => {
  const keys = useUrlParams();

  const renderData = useMemo(() => {
    return getRenderData(keys, data);
  }, [data, keys]);

  return (
    <>
      {renderData && (
        <div className={style.wrapper}>
          <div className={style.category}>
            <Navigation
              keys={keys}
              titles={
                "menu_path" in renderData ? renderData.menu_path : undefined
              }
            />
            <CategoryItem data={renderData} />
          </div>
        </div>
      )}
      {!renderData && <NotFoundPage />}
    </>
  );
};
