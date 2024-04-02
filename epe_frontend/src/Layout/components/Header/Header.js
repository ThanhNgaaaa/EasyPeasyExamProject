import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "../../../assets/images";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import Menu from "../Popper/Menu/Menu";
import routesConfig from "../../../config/routes";
//font feather
import {
  FiLogIn,
  FiUser,
  FiBookOpen,
  FiBook,
  FiSettings,
  FiLogOut,
  FiHelpCircle,
  FiHome,
} from "react-icons/fi";
import jwtDecode from "jwt-decode";
// font CirumIcon

const cx = classNames.bind(styles);

const MENU_ITEMS_STUDENTS = [
  {
    icon: <FiHome />,
    title: "Dashboard",
    to: "/dashboard",
  },
  {
    icon: <FiUser />,
    title: "My profile",
    to: "/profile",
  },
  {
    icon: <FiBookOpen />,
    title: "Flash Card",
    to: "/createFlashcard",
  },
  {
    icon: <FiBook />,
    title: "My Courses",
    to: "/courseStudent",
  },
  {
    icon: <FiHelpCircle />,
    title: "My Quizes",
    to: "/quizStudent",
  },
  {
    icon: <FiSettings />,
    title: "Settings",
    to: "/settings",
    seperate: true,
  },
  {
    icon: <FiLogOut />,
    title: "Logout",
    to: "/logout",
  },
];

const MENU_ITEMS_INSTRUCTOR = [
  {
    icon: <FiHome />,
    title: "Dashboard",
    to: "/dashboardInstructor",
  },
  {
    icon: <FiUser />,
    title: "My profile",
    to: "/profileInstructor",
  },
  {
    icon: <FiBookOpen />,
    title: "My Courses",
    to: "/coursesInstructor",
  },
  {
    icon: <FiHelpCircle />,
    title: "My Quizes",
    to: "/quizzesInstructor",
  },
  {
    icon: <FiSettings />,
    title: "Settings",
    to: "/settings",
    seperate: true,
  },
  {
    icon: <FiLogOut />,
    title: "Logout",
    //onClick: handleLogOut, // Truyền hàm handleLogout vào menu item "Logout"
  },
];
const Header = () => {
  const [name, setName] = useState("");
  const [isScrolled, setIsScrolled] = useState("");
  const [currentUser, setCurrentUser] = useState(false);
  const [role, setRole] = useState("");
  const handleScroll = () => {
    if (window.scrollY >= 100) {
      setIsScrolled("scrolled");
    } else {
      setIsScrolled("");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    let token = localStorage.getItem("jwtToken");

    if (!token) {
      setCurrentUser(false);
      setName("");
      setRole("");
      return;
    }
    const decodedToken = jwtDecode(token);
    if (!decodedToken || !decodedToken.username) {
      setCurrentUser(false);
      setName("");
      setRole("");
      return;
    }
    setCurrentUser(true);
    setName(decodedToken.username);
    setRole(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
    const email = localStorage.getItem("email");
    if (!email) {
      localStorage.setItem("email", decodedToken.email);
    }
  }, []);
  const handleLogout = () => {
    setCurrentUser(false);
    setName("");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  const menuItems = role === "Instructor" ? MENU_ITEMS_INSTRUCTOR : MENU_ITEMS_STUDENTS;
  return (
    <div className={cx("header")}>
      <header className={cx("header-transparent", isScrolled)}>
        <div className={cx("inner")}>
          <div className={cx("logo")}>
            <Link to={routesConfig.home}>
              <img src={images.logo} alt="My Logo" className={cx("logo_image")} />
            </Link>
          </div>
          <Navbar />
          <div className={cx("header-right")}>
            {/* Search */}
            <Search />
            {/* Login */}
            <div className="header-account">
              {currentUser ? (
                <>
                  <Menu
                    items={menuItems}
                    handleLogout={handleLogout}
                    className={cx("menu-transition")}
                  >
                    <div className={cx("current-user")}>
                      <FiUser />
                      <h4 className={cx("user-name")}>{name}</h4>
                    </div>
                  </Menu>
                </>
              ) : (
                <Link to={routesConfig.login} className={cx("header_login")}>
                  <FiLogIn className={cx("header_login-icon")} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
