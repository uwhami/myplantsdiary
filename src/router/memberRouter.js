import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div className={"bg-red-700"}>Loading...</div>;
const Login = lazy(() => import("../pages/member/LoginPage"));
const Logout = lazy(() => import("../pages/member/LogoutPage"));
const KakaoRedirect = lazy(() => import("../pages/member/KakaoRedirectPage"));
const MemberModify = lazy(() => import("../pages/member/ModifyPage"));

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
    {
      path: "kakao",
      element: (
        <Suspense fallback={Loading}>
          <KakaoRedirect />
        </Suspense>
      ),
    },
    {
      path: "modify",
      element: (
        <Suspense fallback={Loading}>
          <MemberModify />
        </Suspense>
      ),
    },
  ];
};

export default memberRouter;
