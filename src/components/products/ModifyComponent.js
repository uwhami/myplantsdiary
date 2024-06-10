import React, { useEffect, useRef, useState } from "react";
import { getOne } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";

const initState = {
  pno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  delFlag: false,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

function ModifyComponent({ pno }) {
  const [product, setProduct] = useState({ ...initState });
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(false);

  const uploadRef = useRef();

  useEffect(() => {
    setFetching(true);

    getOne(pno).then((data) => {
      setProduct(data);
      setFetching(false);
    });
  }, [pno]);

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;

    setProduct({ ...product });
  };

  const deleteOldImages = (imageName) => {
    const resultFileNames = product.uploadFileNames.filter(
      (fileName) => fileName !== imageName,
    );

    product.uploadFileNames = resultFileNames;
    setProduct({ ...product });
  };

  return (
    <div className="border-2 order-sky-200 mt-10 m-2 p-4">
      Products Modify Component
      {fetching ? <FetchingModal /> : <></>}
      {makeDiv("name", product.pname, true, "text", handleChangeProduct)}
      {makeDiv("price", product.price, false, "number", handleChangeProduct)}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">DELETE</div>
          <select
            name="delFlag"
            value={product.delFlag}
            onChange={handleChangeProduct}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
          >
            <option value={false}>사용</option>
            <option value={true}>삭제</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Files</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type={"file"}
            multiple={true}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Images</div>
          <div className="w-4/5 justify-center flex flex-wrap items-start">
            {product.uploadFileNames.map((imgFile, i) => (
              <div
                className="flex justify-center flex-col w-1/3 m-1 align-baseline"
                key={i}
              >
                <button
                  className="bg-blue-500 text-3xl text-white"
                  onClick={() => deleteOldImages(imgFile)}
                >
                  DELETE
                </button>
                <img
                  alt="img"
                  src={`${host}/api/products/view/S_${product.uploadFileNames[0]}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const makeDiv = (title, value, readonly, type, handleChangeProduct) => (
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">{title}</div>
      <input
        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
        name={title}
        type={type}
        value={value}
        onChange={handleChangeProduct}
      ></input>
    </div>
  </div>
);

export default ModifyComponent;
