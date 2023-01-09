export type SubCategory = {
  key: string;
  name: string;
};

export type TCategory = {
  key: string;
  name: string;
  multilevel: boolean;
  subCategories: SubCategory[];
};

export type SingleCategory = {
  category: string;
}