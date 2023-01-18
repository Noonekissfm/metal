// Get sub Categories data

import { Categories, SubCategories } from "src/models/menu";

export const getRenderData = (
  keys: string[],
  data: Categories[]
): Categories | SubCategories => {
  // 1. Рендер дата = первый и единственный объект, точка входа
  const renderData = data[0];

  // 2. Если есть ключи
  if (keys.length > 0) {
    // 3. Создаем переменную и присваем ей рендер дату
    let tempData: Categories | SubCategories = renderData;

    // 4. Перебираем ключи
    for (let i = 1; i < keys.length; i++) {
      // 5. Если нет тем даты, пропускаем итерацию
      const foundSubcategory: undefined | SubCategories =
        tempData.subCategory.find((item) => item.key === keys[i]);

      if (foundSubcategory) {
        tempData = foundSubcategory;
      }
    }
    return tempData;
  }

  //  Возвращает единственный объект без доп параметров
  return renderData;
};

interface IDescription {
  description: string[];
  wordsCount: number;
}

export const getDescriptionData = (description: string): IDescription => {
  const arr = [...description.split("\n").filter((item) => item !== "")];
  const data = {
    description: arr,
    wordsCount: description.split(" ").length,
  };
  return data;
};
