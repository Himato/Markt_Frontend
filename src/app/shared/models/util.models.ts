import { ProductResult } from './product.models';

export class Cart {
  totalPrice: number;
  purchases: Purchase[];
}

export class Order {
  dateTime: Date;
  totalPrice: number;
  address: Address;
  purchases: Purchase[];
}

export class Purchase {
  id: number;
  quantity: number;
  totalPrice: number;
  product: ProductResult;
}

export class Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

export class AdminCategory {
  id: number;
  name: string;
  numberOfSubcategories: number;
  numberOfProducts: number;
}

export class Subcategory {
  id: number;
  uri: string;
  name: string;
  categoryId: number;
}

export class AdminSubcategory {
  id: number;
  name: string;
  numberOfProducts: number;
}

export class AdminSubcategories {
  category: Category;
  subcategories: AdminSubcategory[];
}

export class Brand {
  id: number;
  name: string;
}

export class AdminBrand {
  id: number;
  name: string;
  numberOfProducts: number;
}

export class Image {
  id: number;
  uri: string;
  productId: number;
}

export class Address {
  id: number;
  address: string;
  city: string;
  postCode: string;
  country: string;
}
