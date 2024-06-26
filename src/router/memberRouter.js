import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div className={"bg-red-700"}>Loading...</div>;
const Login = lazy(() => import("../pages/member/LoginPage"));
const Logout = lazy(() => import("../pages/member/LogoutPage"));

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
    {
      path: "logout",
      element: (
        <Suspense fallback={Loading}>
          <Logout />
        </Suspense>
      ),
    },
  ];
};

export default memberRouter;
