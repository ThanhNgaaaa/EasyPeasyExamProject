import React from "react";
import classNames from "classnames/bind";
import styles from "./Loading.module.scss";
const cx = classNames.bind(styles);
const Loading = () => {
  return (
    <div className={cx("loader")}>
      <span  className={cx("l")}>L</span>
      <span  className={cx("o")}>o</span>
      <span  className={cx("a")}>a</span>
      <span  className={cx("d")}>d</span>
      <span  className={cx("i")}>i</span>
      <span  className={cx("n")}>n</span>
      <span  className={cx("g")}>g</span>
      <span  className={cx("d1")}>.</span>
      <span  className={cx("d2")}>.</span>
    </div>
  );
};

export default Loading;
