import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "bootstrap";
import routesConfig from "../../config/routes";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import images from "../../assets/images";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from "../../config/routes";
import { FiEye, FiEyeOff } from "react-icons/fi";
const cx = classNames.bind(styles);
const Login = () => {
  const navigate = useNavigate();

  //Password
  const [passwordShown, setPasswordShown] = useState(false);
  const [icon, setIcon] = useState(<FiEyeOff className={cx("eye-icon")} />);
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
    setIcon(
      passwordShown ? (
        <FiEyeOff className={cx("eye-icon")} />
      ) : (
        <FiEye className={cx("eye-icon")} />
      ),
    );
  };
  //Move
  const [moveUp, setMoveUp] = useState("");
  const [scaleDown, setScaleDown] = useState("");
  const [showCard, setShowCard] = useState("");
  const [roleName, setRoleName] = useState("");
  const changeMoveUp = () => {
    setScaleDown("scale-down");
    setMoveUp("move-up");
  };
  const changeMoveDown = () => {
    setMoveUp("");
    setScaleDown("");
  };

  //Role
  const showCardRole = () => {
    setShowCard("showcard");
  };
  const chooseRoleInstr = (e) => {
    e.preventDefault();
    setRoleName("Instructor");
    setShowCard("");
  };
  const chooseRoleStd = () => {
    setRoleName("Student");
    setShowCard("");
  };
  //Error
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  //Login
  const [emailLogin, setEmailLogin] = useState("");
  const [pswLogin, setPswLogin] = useState("");
  //Register
  const [userNameRegister, setUserNameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [pswRegister, setPswRegister] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let inputLogin = { Email: emailLogin, PasswordHash: pswLogin };
      if (validateLogin()) {
        fetch("https://localhost:7121/api/Auth/login", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(inputLogin),
        })
          .then((res) => {
            return res.json();
          })
          .then((response) => {
            if (Object.keys(response).length === 0) {
              console.log("invalid");
            } else {
              localStorage.setItem("email", emailLogin);
              localStorage.setItem("jwtToken", response.token);
              navigate(routesConfig.home);
            }
          })
          .catch((err) => {
            toast.error("Username or password is incorrect", {
              position: "top-center",
              transition: Flip,
            });
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();
    try {
      let inputRegister = {
        Username: userNameRegister,
        Email: emailRegister,
        PasswordHash: pswRegister,
        UserRoleName: roleName,
      };
      if (validateRegister()) {
        fetch("https://localhost:7121/api/Auth/register", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(inputRegister),
        })
          .then((res) => {
            return res.json();
          })
          .then((response) => {
            if (Object.keys(response).length === 0) {
              toast.info("Please enter invalid username");
            }
            changeMoveDown();
            setShowSuccess(true);
            toast.success("Registered Successfully. You can login..", {
              position: "top-center",
              transition: Flip,
              autoClose: 2000,
            });
          })
          .catch((err) => {
            toast.error("User already exists", { autoClose: 2000 });
          });
      }
    } catch (error) {}
  };
  const validateLogin = () => {
    let result = true;
    if (emailLogin === null || emailLogin === "") {
      result = false;
      toast.warning("Enter your Email", { autoClose: 1000 });
    }
    if (
      emailLogin.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      result = true;
    }
    if (pswLogin === null || pswLogin === "") {
      result = false;
      toast.warning("Enter your password", { autoClose: 1000 });
    }
    return result;
  };
  const validateRegister = () => {
    let result = true;
    if (userNameRegister === null || userNameRegister === "") {
      result = false;
      toast.warning("Enter your Username", { autoClose: 1000 });
    }
    if (pswRegister === null || pswRegister === "") {
      result = false;
      toast.warning("Enter your password", { autoClose: 1000 });
    }
    if (emailRegister === null || emailRegister === "") {
      result = false;
      toast.warning("Enter your Email", { autoClose: 1000 });
    }
    return result;
  };
  const registerDivRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (registerDivRef.current && !registerDivRef.current.contains(event.target)) {
        setShowCard(false);
      }
    }
  }, [registerDivRef]);
  return (
    <div className={cx("wrapper")}>
      <ToastContainer />
      <div className={cx("main")}>
        <div className={cx("login")}>
          <form className={cx("form")} onSubmit={handleLogin}>
            <label aria-hidden="true" className={cx("", scaleDown)} onClick={changeMoveDown}>
              Log in
            </label>
            <input
              className={cx("input")}
              type="email"
              name="email"
              value={emailLogin}
              placeholder="Email"
              required=""
              onChange={(e) => setEmailLogin(e.target.value)}
            />
            <div className={cx("input-password")}>
              <input
                className={cx("input")}
                type={passwordShown ? "text" : "password"}
                name="pswd"
                value={pswLogin}
                placeholder="Password"
                required=""
                onChange={(e) => setPswLogin(e.target.value)}
              />
              <div className={cx("eye-icon-wrapper")} onClick={togglePasswordVisibility}>
                {icon}
              </div>
            </div>
            <div className={cx("forgot")}>
              <a href="///">Forgot Password ?</a>
            </div>
            <button className={cx("btn-login")}>Login</button>
          </form>
        </div>
        {/* <div className={cx("social")}>
          <div className={cx("social-message")}>
            <div className={cx("line")}></div>
            <p className={cx("message")}>Login with social accounts</p>
            <div className={cx("line")}></div>
          </div>
          <div className={cx("social-icons")}>
            <button aria-label="Log in with Google" className={cx("icon")}>
              <FaGoogle className={cx("icon-image")} />
            </button>
            <button aria-label="Log in with Google" className={cx("icon")}>
              <img
                src={images.facebookImage}
                alt="facebook"
                className={cx("icon-image")}
              />
            </button>
            <button aria-label="Log in with Google" className={cx("icon")}>
              <img src={images.twitterImage} alt="twitter" className={cx("icon-image")} />
            </button>
          </div>
        </div> */}
        {/* Register */}
        <div className={cx("register", moveUp)}>
          <form className={cx("form-register")} onSubmit={handleRegister}>
            {error && <Alert variant="danger">{error}</Alert>}

            <label
              className={cx("label-register")}
              aria-hidden="true"
              onClick={() => {
                changeMoveUp();
                showCardRole();
              }}
            >
              Register
            </label>
            <input
              className={cx("input")}
              type="text"
              name="txt"
              value={userNameRegister}
              placeholder="Username"
              required=""
              onChange={(e) => setUserNameRegister(e.target.value)}
            />
            <input
              className={cx("input")}
              type="email"
              name="email"
              value={emailRegister}
              placeholder="Email"
              required=""
              onChange={(e) => setEmailRegister(e.target.value)}
            />
            <input
              className={cx("input", "input-pass")}
              type="password"
              name="pswd"
              value={pswRegister}
              placeholder="Password"
              required=""
              onChange={(e) => setPswRegister(e.target.value)}
            />
            <button className={cx("btn-register")}>Register</button>
          </form>
        </div>
      </div>
      <div ref={registerDivRef} className={cx("role-register", showCard)}>
        <h2>You Are ...?</h2>
        <div className={cx("role-register-container")}>
          <div className={cx("role-register-card")} onClick={chooseRoleInstr}>
            <div className={cx("role-register-img")}>
              <img src={images.instructorImg} className={cx("role-img")} alt="Instructor" />
            </div>
            <p className={cx("role-register-title")}>Instructor</p>
          </div>
          <div className={cx("role-register-card")} onClick={chooseRoleStd}>
            <div className={cx("role-register-img")}>
              <img src={images.studentImg} className={cx("role-img")} alt="Student" />
            </div>
            <p className={cx("role-register-title")}>Student</p>
          </div>
        </div>
      </div>
      <Link to={routes.home} className={cx("back")}>
        Back to Home
      </Link>
    </div>
  );
};

export default Login;
