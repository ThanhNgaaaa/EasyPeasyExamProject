import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import jwtDecode from "jwt-decode";
import { FiEye, FiEyeOff } from "react-icons/fi";

const cx = classNames.bind(styles);
const Profile = () => {
  const token = localStorage.getItem("jwtToken");
  const email = localStorage.getItem("email");
  console.log(jwtDecode(token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
  const [showPassword, setShowPassword] = useState(false);
  const [icon, setIcon] = useState(<FiEyeOff className={cx("eye-icon")} />);
  const togglePasswordVisibility = () => {
    setShowPassword(showPassword ? false : true);

    setIcon(
      showPassword ? <FiEyeOff className={cx("eye-icon")} /> : <FiEye className={cx("eye-icon")} />,
    );
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("section-title")}>
          <h4>My profile</h4>
        </div>
        <div className={cx("profile")}>
          <div className={cx("profile-title")}>UserName :</div>
          <div className={cx("profile-content")}>{jwtDecode(token).username}</div>
        </div>
        <div className={cx("profile")}>
          <div className={cx("profile-title")}>Email :</div>
          <div className={cx("profile-content")}>{email}</div>
        </div>
        <div className={cx("profile")}>
          <div className={cx("profile-title")}>Role :</div>
          {jwtDecode(token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]}
          <div className={cx("profile-content")}>{}</div>
        </div>
        <div className={cx("profile")}>
            <div className={cx("profile-title")}>Password :</div>
            <div className={cx("profile-content", "password")}>
              {showPassword ? jwtDecode(token).password : "*****"}
            </div>
            <div className={cx("eye-icon-wrapper")} onClick={togglePasswordVisibility}>
              {icon}
            </div>
          </div>
      </div>
    </div>
  );
};

export default Profile;
