import React, { useEffect, useState } from "react";
import { API_SERVER_HOST } from "../../api/todoApi";
import { getOne } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
  pno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

function ReadComponent({ pno }) {
  const [product, setProduct] = useState({ ...initState });
  const [fetching, setFetching] = useState(false);
  const { moveToList, moveToModify } = useCustomMove();

  const { cartItems, changeCart } = useCustomCart();
  const { loginState } = useCustomLogin();

  useEffect(() => {
    setFetching(true);
    getOne(pno).then((data) => {
      console.log(data);
      setProduct(data);
      setFetching(false);
    });
  }, [pno]);

  const handleClickAddCart = () => {
    let quantity = 1;
    const addedItem = cartItems.filter((item) => item.pno === parseInt(pno))[0];
    if (addedItem) {
      if (
        !window.confirm("이미 장바구니에 있는 상품입니다. 추가하시겠습니까?")
      ) {
        return;
      }
      quantity = addedItem.quantity + 1;
    }
    changeCart({ email: loginState.email, pno: pno, quantity: quantity });
  };

  return (
    <div>
      {fetching ? <FetchingModal /> : <></>}
      {makeDiv("PNO", product.pno)}
      {makeDiv("PNAME", product.pname)}
      {makeDiv("PDESC", product.pdesc)}
      {makeDiv("PRICE", product.price)}
      {makeImageDiv(product.uploadFileNames)}

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-green-500"
          onClick={() => handleClickAddCart()}
        >
          Add Cart
        </button>

        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={() => moveToModify(product.pno)}
        >
          Modify
        </button>

        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={() => moveToList()}
        >
          List
        </button>
      </div>
    </div>
  );
}

const makeDiv = (title, value) => (
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">{title}</div>
      <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
        {value}
      </div>
    </div>
  </div>
);

const makeImageDiv = (value) => (
  <div className="w-full justify-center flex flex-col m-auto items-center">
    {value.map((imgFile, i) => (
      <img
        alt="product"
        key={i}
        className="p-4 w-1/2"
        src={`${host}/api/products/view/${imgFile}`}
      />
    ))}
  </div>
);

export default ReadComponent;
