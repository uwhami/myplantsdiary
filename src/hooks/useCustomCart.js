import { useDispatch, useSelector } from "react-redux";
import { getCartItemsAsync, postChangeCartAsync } from "../slices/cartSlice";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { cartState } from "../atoms/cartState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCartItems, postChangeCart } from "../api/cartApi";
import { getOne } from "../api/todoApi";

const useCustomCart = () => {
  // redux 를 사용한 내용은 주석처리 하고, recoil 을 사용.
  // const cartItems = useSelector((state) => state.cartSlice);
  //
  // const dispatch = useDispatch();
  //
  // const refreshCart = () => {
  //   dispatch(getCartItemsAsync());
  // };
  //
  // const changeCart = (param) => {
  //   dispatch(postChangeCartAsync(param));
  // };
  //
  // return { cartItems, refreshCart, changeCart };

  const [cartItems, setCartItems] = useRecoilState(cartState);

  const queryClient = useQueryClient();

  const changeMutation = useMutation({
    mutationFn: (param) => postChangeCart(param),
    onSuccess: (result) => setCartItems(result),
  });

  const query = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (query.isSuccess || changeMutation.isSuccess) {
      queryClient.invalidateQueries("cart");
      setCartItems(query.data);
    }
  }, [query.isSuccess]);

  const changeCart = (param) => {
    changeMutation.mutate(param);
  };

  return { cartItems, changeCart };
};

export default useCustomCart;
