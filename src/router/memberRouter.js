import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div className={"bg-red-700"}>Loading...</div>;
const Login = lazy(() => import("../pages/member/LoginPage"));

const memberRouter = () => {
  return [
    {
      path: "",
      element: <Navigate replace={true} to={"/member/login"} />,
    },
    {
      path: "login",
      element: (
        <Suspense fallback={Loading}>
          <Login />
        </Suspense>
      ),
    },
  ];
};

export default memberRouter;
