import axios from "axios";
import React from "react";
// import { GoogleLogin } from "react-google-login";
const LoginGoogle = () => {
  const responseGoogle = async (response) => {
    try {
      const res = await axios.post("https://localhost:7121/api/Auth/login-google", { IdToken: response.tokenId });
      if (res.status === 200) {
        localStorage.setItem("jwtToken", res.token);
      } else {
        console.log("Login failed");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {/* <GoogleLogin
        clientId="601308064605-7atn1qg86832tifpel0jlrlk10q0ojbv.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      /> */}
    </div>
  );
};

export default LoginGoogle;
