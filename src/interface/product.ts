export interface Product{
    productId?: number;
    productName: string;
    productPrice: number;
}

export interface CartItem {
    productId: number;
    name: string;
    price: number;
    quantity: number;
  };