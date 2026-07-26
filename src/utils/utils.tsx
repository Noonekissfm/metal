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
