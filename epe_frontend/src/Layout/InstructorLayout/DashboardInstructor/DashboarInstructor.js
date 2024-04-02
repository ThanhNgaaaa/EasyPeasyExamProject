import React from "react";
import styles from "./DashboardInstructor.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Box from "../../components/Box/Box";
import routesConfig from "../../../config/routes";
import images from "../../../assets/images";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
const cx = classNames.bind(styles);
const DashboarInstructor = () => {
  const [userId, setUserId] = useState("");
  const [courseLength, setCourseLength] = useState([]);
  const [quizLength, setQuizLength] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("jwtToken");
    if (!token) {
      setUserId("");
      return;
    }
    const decodedToken = jwtDecode(token);
    if (!decodedToken || !decodedToken.username) {
      setUserId("");
      return;
    }
    setUserId(decodedToken.userID);
    const getSumCourseItem = async () => {
      try {
        // console.log(userId);
        const response = await axios.get(
          `https://localhost:7121/api/Courses/GetCourseByInstrId/${userId}`,
        );
        setCourseLength(response.data.length);
        console.log(response.data.length);
      } catch (error) {
        console.error(error);
      }
    };
    const getSumQuizItem = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7121/api/Exams/GetExamByInstructorId/${userId}`,
        );
        setQuizLength(response.data.length);
        console.log(response.data.length);
      } catch (error) {
        console.error(error);
      }
    };

    getSumCourseItem();
    getSumQuizItem();
  }, [userId]);
  return (
    <div className={cx("wrapper")}>
      <Box className={cx("box")}>
        <h3>Dashboard</h3>
        <div className={cx("container")}>
          <div className={cx("col-2")}>
            <div className={cx("inner", "blue")}>
              <Link to={routesConfig.coursesInstructor} className={cx("link")}>
                <div className={cx("round-icon")}>
                  <img src={images.enrollementDB} alt="" />
                </div>
                <div className={cx("content")}>
                  <h2 className={cx("counter")}>{courseLength}</h2>
                  <span className={cx("title")}>My COURSES</span>
                </div>
              </Link>
            </div>
          </div>
          <div className={cx("col-2")}>
            <div className={cx("inner","pink")}>
              <Link to={routesConfig.quizzesInstructor} className={cx("link")}>
                <div className={cx("round-icon")}>
                  <img src={images.quizDB} alt="" />
                </div>
                <div className={cx("content")}>
                  <h2 className={cx("counter")}>{quizLength}</h2>
                  <span className={cx("title")}>My Quizzes</span>
                </div>
              </Link>
            </div>
          </div>
          
        </div>
      </Box>
    </div>
  );
};

export default DashboarInstructor;
