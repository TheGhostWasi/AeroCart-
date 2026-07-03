export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  subcategory?: string;
  stock: number;
  vendor: string;
  isFlashSale?: boolean;
  colors?: string[];
  variants?: string[];
  images?: string[];
  insideDhakaCharge?: number;
  outsideDhakaCharge?: number;
  insideDhakaTime?: string;
  outsideDhakaTime?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  itemCount: number;
  color?: string;
  bgColor?: string;
  subcategories?: string[];
}

export interface Question {
  id: number;
  questionText: string;
  askedBy: string;
  answerText: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
