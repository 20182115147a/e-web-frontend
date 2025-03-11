export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    seller: {
      _id: string;
      username: string;
      email: string;
    };
    images: string[];
    stock: number;
    ratings: {
      userId: string;
      rating: number;
      comment: string;
      createdAt: string;
    }[];
    createdAt: string;
    updatedAt: string;
  }
  export interface Seller {
    _id: string;
    username: string;
    email: string;
  }
  
  export interface ProductCRUD {
    _id: string;
    name: string;
    description: string;
    price: string;
    category: string;
    seller: Seller;
    images: FileList;
    stock: string;
  }