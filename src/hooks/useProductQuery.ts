import { Product } from "@/interface/product";
import { createProduct, getProduct } from "@/lib/productApi";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useProduct = () => {
    return useQuery({
      queryKey: ['productall'],
      queryFn: getProduct,
    })
  }

export const useCreateProduct = () => {
    return useMutation({
      mutationFn: (data: Product) => createProduct(data),
    })
  };

