import React from "react";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
// import { Link } from "react-router-dom";
import Button from "../../Button/Button";
const cx = classNames.bind(styles);
const MenuItem = ({ data,handleLogout }) => {
  const classes = cx("menu-item",{
    seperate:data.seperate
  })
  const handleClick = () => {
    if (data.onClick) {
      data.onClick();
    }

    if (data.title === "Logout" && handleLogout) {
      handleLogout();
    }
  };
  return (
    <Button className={classes} to={data.to} leftIcon={data.icon} onClick={handleClick}>
      {data.title}
    </Button>
  );
};
export default MenuItem;
