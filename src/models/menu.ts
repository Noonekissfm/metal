export type SubCategories = {
  subCategory: [SubCategories, ...SubCategories[]] | [];
  key: string
  img_link: string | null
  img_title: string | null;
  description:string | null
  title:string
  menu_path: string[]
  price: string | null
};

export type Categories = {
  subCategory: SubCategories[]
  key: string;
  title: string;
};
