import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div className={"bg-red-700"}>Loading...</div>;
const ProductsList = lazy(() => import("../pages/products/ListPage"));

const productsRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <ProductsList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace={true} to={"/products/list"} />,
    },
  ];
};

export default productsRouter;
