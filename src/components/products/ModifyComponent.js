import React, { useEffect, useRef, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* eslint-disable multiline-ternary */
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
  const { moveToRead, moveToList } = useCustomMove();

  const delMutation = useMutation({ mutationFn: () => deleteOne(pno) });

  const modMutation = useMutation({
    mutationFn: (product) => putOne(pno, product),
  });

  const query = useQuery({
    queryKey: ["product", pno],
    queryFn: () => getOne(pno),
    staleTime: Infinity,
  });

  const uploadRef = useRef();

  useEffect(() => {
    // setFetching(true);
    //
    // getOne(pno).then((data) => {
    //   setProduct(data);
    //   setFetching(false);
    // });

    if (query.isSuccess) {
      setProduct(query.data);
    }
  }, [pno, query.data, query.isSuccess]);

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

  const handleClickModify = () => {
    const formData = new FormData();
    const files = uploadRef.current.files;
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);
    formData.append("delFlag", product.delFlag);

    for (let i = 0; i < product.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", product.uploadFileNames[i]);
    }

    // putOne(pno, formData).then((data) => {
    //   setFetching(true);
    //   if (data.RESULT === "SUCCESS") {
    //     setResult("Modified");
    //     setFetching(false);
    //   }
    // });

    modMutation.mutate(formData);
  };

  const handleClickDelete = () => {
    // deleteOne(pno).then((data) => {
    //   console.log("delete result", data);
    //   setResult(data.RESULT === "SUCCESS" ? "Deleted" : null);
    // });

    delMutation.mutate(pno);
  };

  const queryClient = useQueryClient();

  const closeModal = () => {
    // if (result === "Deleted") {
    //   moveToList();
    // } else if (result === "Modified") {
    //   moveToRead(pno);
    // } else {
    //   setResult(null);
    // }
    queryClient.invalidateQueries(["products", pno]);
    queryClient.invalidateQueries(["products/list"]);
    if (delMutation.isSuccess) {
      moveToList();
    }
    if (modMutation.isSuccess) {
      moveToRead(pno);
    }
  };

  return (
    <div className="border-2 order-sky-200 mt-10 m-2 p-4">
      Products Modify Component
      {/* {fetching ? <FetchingModal /> : <></>} */}
      {query.isFetching || delMutation.isPending || modMutation.isPending ? (
        <FetchingModal style="z-index:1px" />
      ) : (
        <></>
      )}
      {delMutation.isSuccess || modMutation.isSuccess ? (
        <ResultModal
          style="z-index:1px"
          title={"처리결과"}
          content={"정상적으로 처리되었습니다."}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">NAME</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="pname"
            type="text"
            value={product.pname}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">description</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="pdesc"
            type="text"
            value={product.pdesc}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">price</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
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
                  src={`${host}/api/products/view/S_${product.uploadFileNames[i]}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={handleClickModify}
        >
          Modify
        </button>
      </div>
      {/* {result ? ( */}
      {/*   <ResultModal */}
      {/*     title="처리 결과" */}
      {/*     content={`${result} ${pno} Completed`} */}
      {/*     callbackFn={closeModal} */}
      {/*   /> */}
      {/* ) : ( */}
      {/*   <></> */}
      {/* )} */}
    </div>
  );
}

export default ModifyComponent;
