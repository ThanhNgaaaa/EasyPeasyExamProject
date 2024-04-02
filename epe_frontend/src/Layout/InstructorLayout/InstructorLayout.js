import React from "react";
import classNames from "classnames/bind";
import styles from "./InstructorLayout.module.scss";
import Header from "../components/Header/Header";
import Sidebar from "./Sidebar/Sidebar";
const cx = classNames.bind(styles);
const InstructorLayout = ({ children }) => {
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

export default InstructorLayout;
