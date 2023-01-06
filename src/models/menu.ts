export type SubCategory = {
  key: string;
  name: string;
};

export type TCategory = {
  key: string;
  name: string;
  subCategories: SubCategory[];
};
