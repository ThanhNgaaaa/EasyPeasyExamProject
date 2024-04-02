import React from "react";
import styles from "./Popper.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const Wrapper = ({ children, className }) => {
  return <div className={cx("wrapper", className)}>{children}</div>;
};

export default Wrapper;
