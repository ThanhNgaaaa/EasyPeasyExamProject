import React from "react";
import Header from "../components/Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./StudentLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const StudentLayout = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container", "row")}>
        <Sidebar />
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
};

export default StudentLayout;
