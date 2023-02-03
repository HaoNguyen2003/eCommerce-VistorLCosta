import { useMutation } from "react-query";

import type { ProductBriefDto } from "@/features/products/types";
import { axios } from "@/lib/axios";
import type { MutationConfig } from "@/lib/react-query";
import { queryClient } from "@/lib/react-query";

import type { CartItem } from "../types";

export const addItemToCart = (product: ProductBriefDto): Promise<CartItem> =>
  axios.post("/cart/add", {
    id: product.id,
    productName: product.name,
    price: product.defaultPrice.amount,
    quantity: 1,
    pictureUrl: product.pictureUrl,
  });

type UseAddItemToCartOptions = {
  config?: MutationConfig<typeof addItemToCart>;
};

export const useAddItemToCart = ({ config }: UseAddItemToCartOptions) =>
  useMutation({
    onMutate: async (newCartData) => {
      await queryClient.cancelQueries("cart");

      const oldCartData = queryClient.getQueryData<CartItem[]>("cart");

      queryClient.setQueryData("cart", [oldCartData || newCartData]);

      return { oldCartData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries("cart");
    },
    ...config,
    mutationFn: addItemToCart,
  });
