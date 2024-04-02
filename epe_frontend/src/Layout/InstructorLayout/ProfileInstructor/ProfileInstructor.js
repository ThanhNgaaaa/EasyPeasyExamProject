import React from "react";
import classNames from "classnames/bind";
import styles from "./ProfileInstructor.module.scss";
import Box from "../../components/Box/Box";
import jwtDecode from "jwt-decode";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

const cx = classNames.bind(styles);

const ProfileInstructor = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [icon, setIcon] = useState(<FiEyeOff className={cx("eye-icon")} />);
  const togglePasswordVisibility = () => {
    setShowPassword(showPassword ? false : true);

    setIcon(
      showPassword ? <FiEyeOff className={cx("eye-icon")} /> : <FiEye className={cx("eye-icon")} />,
    );
  };
  const token = localStorage.getItem("jwtToken");
  const email = localStorage.getItem("email");
  return (
    <div className={cx("wrapper")}>
      <Box>
        <h3>My Profile</h3>
        <div className={cx("content")}>
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
            <div className={cx("profile-content")}>
              {jwtDecode(token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]}
            </div>
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
      </Box>
    </div>
  );
};

export default ProfileInstructor;
