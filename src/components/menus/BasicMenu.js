import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";

/* eslint-disable multiline-ternary */
function BasicMenu(props) {
  // const loginState = useSelector((state) => state.loginSlice);
  //
  // console.log("loginSlice....");
  // console.log(loginState);

  const { loginState } = useCustomLogin();

  return (
    <nav id="navbar" className="flex bg-blue-300">
      <div className="w-4/5 bg-gray-500">
        <ul className="flex p-4 text-white front-bold">
          <li className="pr-6 text-2xl">
            <Link to={"/"}>Main</Link>
          </li>
          <li className="pr-6 text-2xl">
            <Link to={"/about"}>About</Link>
          </li>

          {loginState.email ? (
            <>
              <li className="pr-6 text-2xl">
                <Link to={"/todo"}>Todo</Link>
              </li>
              <li className="pr-6 text-2xl">
                <Link to={"/products"}>Products</Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>

      <div className="w-1/5 flex justify-end bg-orange-300 p-4 front-medium">
        {!loginState.email ? (
          <div className="text-white text-sm m-1 rounded">
            <Link to={"/member"}>Login</Link>
          </div>
        ) : (
          <div className="text-white text-sm m-1 rounded">
            <Link to={"/member/logout"}>Logout</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default BasicMenu;
