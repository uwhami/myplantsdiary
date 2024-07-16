import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

function KakaoRedirectPage(props) {
  const [searchParams] = useSearchParams();

  const { moveToPath, saveAsCookie } = useCustomLogin();

  const authCode = searchParams.get("code");

  // const dispatch = useDispatch();

  useEffect(() => {
    getAccessToken(authCode).then((data) => {
      console.log("data", data);

      getMemberWithAccessToken(data).then((memberInfo) => {
        console.log("memberInfo result==================");
        console.log(memberInfo);
        // dispatch(login(memberInfo));

        saveAsCookie(memberInfo);

        if (memberInfo && memberInfo.social) {
          moveToPath("/member/modify");
        } else {
          moveToPath("/");
        }
      });
    });
  }, [authCode]);

  return (
    <div>
      <div>Kakao Login Redirect</div>
      <div>{authCode}</div>
    </div>
  );
}

export default KakaoRedirectPage;
