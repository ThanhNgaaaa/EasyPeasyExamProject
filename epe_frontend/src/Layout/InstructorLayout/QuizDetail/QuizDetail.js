import React from "react";
import classNames from "classnames/bind";
import styles from "./QuizDetail.module.scss";
import { FiClock, FiEdit, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import routes from "../../../config/routes";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import QuizQuestion from "./QuizQuestion";

const cx = classNames.bind(styles);
const defaultImageSrc = "/image/thumbnail-placeholder.png";
const QuizDetail = () => {
  const [exam, setExam] = useState({});
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [duration, setDuration] = useState("900");
  const [examImage, setExamImage] = useState("");
  const [examImageSrc, setExamImageSrc] = useState(defaultImageSrc);
  const [imageFile, setImageFile] = useState(null);
  const [examId, setExamId] = useState("");
  const [userId, setUserId] = useState("");
  const { ExamId } = useParams();
  const [timeLeft, setTimeLeft] = useState(exam.Duration * 60);
 
  useEffect(() => {
    fetch(`https://localhost:7121/api/Quiz/${ExamId}`)
      .then((response) => response.json())
      .then((data) => {
        // window.location.reload();
        setExam(data);
        console.log(data);
        console.log(data.Questions);
        // Điền các giá trị khóa học vào các trường đầu vào
        setTitle(data.Title);
        setDes(data.ExamDescription);
        setTimeLeft(data.Duration);
        setExamImage(data.ExamImage);
        setImageFile(null);
        setExamImageSrc(data.ImageSrc || defaultImageSrc);
        setExamId(data.ExamId);
      });
  }, [ExamId]);
  let formattedTime;
  if (timeLeft >= 3600) {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  } else if (timeLeft >= 60) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  } else {
    formattedTime = `${timeLeft} seconds`;
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("col-3")}>
        <div className={cx("sidebar")}>
          <div className={cx("sidebar-wrapper")}>
            <div className={cx("sidebar-header")}>
              <h3 className={cx("title")}>{title}</h3>
            </div>

            <div className={cx("duration")}>
              <FiClock className={cx("duration-icon")} />
              {formattedTime}
            </div>
            <div className={cx("sidebar-description")}>
              <span>{des} </span>
            </div>
          </div>
          <div className={cx("sidebar-aciton")}>
            <Link to={routes.quizzesInstructor} className={cx("btn-exit")}>
              EXIT
            </Link>
          </div>
        </div>
      </div>
      <div className={cx("col-9")}>
        <div className={cx("container")}>
          <div className={cx("create-quiz")}>
            <Link to={`${routes.createQuizzes}/${examId}`} className={cx("btn-create")}>
              <FiPlusCircle className={cx("icon-create")} />
              Create a new question
            </Link>
          </div>
          {exam.Questions &&
            exam.Questions.map((question, index) => (
              <QuizQuestion key={question.QuestionId} question={question} index={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;
