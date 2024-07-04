import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";

function KakaoRedirectPage(props) {
  const [searchParams] = useSearchParams();

  const authCode = searchParams.get("code");

  useEffect(() => {
    getAccessToken(authCode).then((data) => {
      console.log("data", data);

      getMemberWithAccessToken(data).then((result) => {
        console.log("result==================");
        console.log(result);
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
