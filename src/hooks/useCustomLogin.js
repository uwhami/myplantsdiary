import { createSearchParams, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginPostAsync, logout } from "../slices/loginSlice";
import { signinState } from "../atoms/signinState";
import { useRecoilState, useResetRecoilState } from "recoil";
import { removeCookies, setCookie } from "../util/cookieUtil";
import { loginPost } from "../api/memberApi";
import { cartState } from "../atoms/cartState";

const useCustomLogin = () => {
  const [loginState, setLoginState] = useRecoilState(signinState);
  const resetState = useResetRecoilState(signinState);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const loginState = useSelector((state) => state.loginSlice);
  const resetCartState = useRecoilState(cartState);

  const exceptionHandle = (ex) => {
    console.log("Excpeption------------------------------");
    console.log(ex);
    const errorMsg = ex.response.data.error;
    const errorStr = createSearchParams({ error: errorMsg }).toString();

    if (errorMsg === "REQUIRE_LOGIN") {
      alert("로그인이 필요합니다.");
      navigate({ pathname: "/member/login", search: errorStr });
    } else if (ex.response.data.error === "ERROR_ACCESSDENIED") {
      alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.");
      navigate({ pathname: "/member/login", search: errorStr });
    }
  };

  const isLogin = !!loginState.email;

  const doLogin = async (loginParam) => {
    // const action = await dispatch(loginPostAsync(loginParam));
    // return action.payload;
    const result = await loginPost(loginParam);
    saveAsCookie(result);
    return result;
  };

  const doLogout = () => {
    // dispatch(logout());
    removeCookies(`member`);
    resetState();
    resetCartState();
  };

  const saveAsCookie = (data) => {
    setCookie(`member`, JSON.stringify(data), 1);
    setLoginState(data);
  };

  const moveToPath = (path) => {
    navigate({ pathname: path }, { replace: true });
  };

  const moveToLogin = () => {
    navigate({ pathname: "/member/login" }, { replace: true });
  };

  const moveToLoginReturn = () => {
    return <Navigate to="/member/login" replace />;
  };

  return {
    loginState,
    isLogin,
    doLogout,
    moveToPath,
    doLogin,
    moveToLogin,
    moveToLoginReturn,
    exceptionHandle,
    saveAsCookie,
  };
};

export default useCustomLogin;
