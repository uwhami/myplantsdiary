import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { getMemberWithAccessToken } from "../../api/googleApi";

function GoogleLoginComponent(props) {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log("credentialResponse", credentialResponse);
        getMemberWithAccessToken(credentialResponse).then((param) => {
          console.log("credentialResponse Param", param);
        });
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}

export default GoogleLoginComponent;
