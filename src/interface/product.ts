export interface Product{
    productId: number;
    productName: string;
    productPrice: number;
}

export interface ProductRegi{
    productName: string;
    productPrice: number;
}

export interface CartItem {
    productId: number;
    name: string;
    price: number;
    quantity: number;
  };

export interface CartData {
    productId: number,
    quantity: number,
}