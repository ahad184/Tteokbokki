export interface Product {
  id: string;
  _id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating?: number;
  _dbId?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
