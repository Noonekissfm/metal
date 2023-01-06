import React, { FC, useState } from "react";

import { TCategory } from "../../models/menu";

interface IProps {
  data: TCategory;
}

export const Category: FC<IProps> = ({ data }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setShow(true);
    console.log("mouse enter");
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setShow(false);
    }, 200);
    console.log("mouse leave");
  };

  const handleChooseProduct = (subKey: string) => {
    // route
    console.log(data.key, subKey);
  };

  return (
    <>
      <li
        className="catalog_item"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {data.name}
      </li>
      {show && !!data.subCategories && (
        <ul
          style={{
            position: "absolute",
            transform: `translate(700px)`,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {data.subCategories.map((item) => (
            <li onClick={() => handleChooseProduct(item.key)}>{item.name}</li>
          ))}
        </ul>
      )}
    </>
  );
};
