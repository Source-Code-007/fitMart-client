export type TProduct = {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  stock: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TProducts = {
  success: boolean;
  message: string;
  data: TProduct[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export type TCategory = {
  _id: string;
  name: string;
  description: string;
  icon: string;
  createdAt?: string;
  updatedAt?: string;
};
