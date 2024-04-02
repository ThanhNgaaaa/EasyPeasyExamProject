import React, { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import { Wrapper as PopperWrapper } from "../index";
import MenuItem from "./MenuItem";

const cx = classNames.bind(styles);
const Menu = ({ children, items = [], hideOnClick = false, className, handleLogout }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [name, setName] = useState("");
  const renderItems = () => {
    return items.map((item, index) => (
      <MenuItem key={index} data={item} handleLogout={handleLogout} />
    ));
  };
  return (
    <Tippy
      // visible
      offset={[12, 11]}
      interactive
      placement="bottom-end"
      hideOnClick={hideOnClick}
      render={(attrs) => (
        <div className={cx("menu-list", className)} tabIndex="-1" {...attrs}>
          <PopperWrapper>{renderItems()}</PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
};
export default Menu;
