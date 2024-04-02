import React from "react";
import { Link } from "react-router-dom";
import routesConfig from "../../../config/routes";
import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";
import { FiChevronDown } from "react-icons/fi";
const cx = classNames.bind(styles);
const Navbar = () => {
  return (
    <div className={cx("navbar")}>
      <ul className={cx("navbar-list")}>
        <li className={cx("navbar-list-item")}>
          <Link to={routesConfig.home}>Home</Link>
        </li>
        <li className={cx("navbar-list-item")}>
          <Link to="/">
            About Us
            {/* <FiChevronDown className={cx("icon_chevrondown")} /> */}
          </Link>
        </li>
        <li className={cx("navbar-list-item")}>
          <Link to={routesConfig.course}>
            Courses
            {/* <FiChevronDown className={cx("icon_chevrondown")} /> */}
          </Link>
        </li>
        <li className={cx("navbar-list-item")}>
          <Link to={routesConfig.quiz}>
            Quiz
            {/* <FiChevronDown className={cx("icon_chevrondown")} /> */}
          </Link>
        </li>
        <li className={cx("navbar-list-item")}>
          <Link to={routesConfig.contact}>
            Contact
            {/* <FiChevronDown className={cx("icon_chevrondown")} /> */}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
