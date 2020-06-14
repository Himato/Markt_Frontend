import { Image, Subcategory, Brand } from './util.models';

export class Report {
  uri: string;
  name: string;
  numberOfFinishedPurchases: number;
  numberOfAwaitPurchases: number;
  totalSoldQuantity: number;
  totalAwaitQuantity: number;
  totalAvailableMoney: number;
  totalExpectedMoney: number;
}

export class Product {
  id: number;
  uri: string;
  name: string;
  description: string;
  specification: string;
  returnInfo: string;
  dateTime: Date;
  price: number;
  isInStock: boolean;
  subcategoryId: number;
  subcategory: Subcategory;
  brandId: number;
  brand: Brand;
  images?: Image[];
}

export class SingleProduct {
  id: number;
  name: string;
  sellerName: string;
  description: string;
  specification: string;
  returnInfo: string;
  price: number;
  isInStock: boolean;
  images: string[];
  numberOfReviews: number;
  review: number;
  brandId: number;
  userReview?: Review;
}

export class ProductResult {
  id: number;
  name: string;
  sellerName: string;
  sellerUsername: string;
  uri: string;
  price: number;
  isInStock: boolean;
  imageUri: string;
  brandId: number;
}

export class SellerProduct {
  sellerName: string;
  products: ProductResult[];
}

export class Review {
  id: number;
  rate: number;
}
