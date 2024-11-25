import { CartItem } from "@/interface/product";
import { createOrder, getOrder } from "@/lib/orderApi";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useOrder = () => {
    return useQuery({
      queryKey: ['orderall'],
      queryFn: getOrder,
    })
  };

  interface Orderdata {
    orderItems: CartItem[];
}

export const useCreateOrder = () => {
    return useMutation({
      mutationFn: (data: Orderdata) => createOrder(data),
    })
  };

