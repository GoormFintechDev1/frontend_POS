import { Item } from "@/interface/shop";
import { createItem, getItem } from "@/lib/shopApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useItem = () => {
    return useQuery({
      queryKey: ['itemall'],
      queryFn: getItem,
    })
  }

export const useCreateItem = () => {
    return useMutation({
      mutationFn: (data: Item) => createItem(data),
    })
  };

