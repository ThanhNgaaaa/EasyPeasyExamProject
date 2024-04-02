import React from "react";

import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import Menu from "./Menu/Menu";
import MenuItem from "./Menu/MenuItem";
import routesConfig from "../../../config/routes";
import { FiUser, FiBookOpen, FiSettings, FiLogOut, FiHome, FiHelpCircle } from "react-icons/fi";
const cx = classNames.bind(styles);

const Sidebar = () => {
  return (
    <div className={cx("wrapper")}>
      <Menu>
        <h4 className={cx("section-title")}>Welcome</h4>
        <MenuItem icon={<FiHome />} title="Dashboard" to={routesConfig.dashboardInstructor} />
        <MenuItem icon={<FiUser />} title="My profile" to={routesConfig.profileInstructor} />
        <MenuItem icon={<FiBookOpen />} title="My Courses" to={routesConfig.coursesInstructor} />
        <MenuItem icon={<FiHelpCircle />} title="My Quizzes" to={routesConfig.quizzesInstructor} />
        <h4 className={cx("section-title")}>User</h4>
        <MenuItem icon={<FiSettings />} title="Settings" to={routesConfig.settings} />
        <MenuItem icon={<FiLogOut />} title="Logout" to={routesConfig.logout} />
      </Menu>
    </div>
  );
};

export default Sidebar;
