import React from "react";
import classNames from "classnames/bind";
import styles from "../QuizStudent.module.scss";
import routes from "../../../../config/routes";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import images from "../../../../assets/images";
const cx = classNames.bind(styles);
const QuizInsItem = ({ data }) => {
  const onDeleteCourse = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this quiz ?"))
      fetch(`https://localhost:7121/api/Exams/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            window.location.reload();
          } else {
            // Xóa khóa học thất bại
          }
        })
        .catch((error) => {
          console.error("Lỗi:", error);
        });
  };
  return (
    <Link to={`${routes.quizDetailStudent}/${data.ExamId}`} className={cx("course-item")}>
      <div className={cx("course-item-content")}>
        <img src={data.ImageSrc} className={cx("course-item-image")} alt="Course" />
        <div className={cx("info")}>
          <span className={cx("name")}>{data.Title}</span>
          <div className={cx("action")}>
            <Link to={`${routes.updateQuizStudent}/${data.ExamId}`} className={cx("action-link")}>
              <FiEdit className={cx("icon")} />
              Edit
            </Link>
            <button
              className={cx("action-link")}
              onClick={(e) => onDeleteCourse(e, parseInt(data.ExamId))}
            >
              <FiTrash2 className={cx("icon")} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuizInsItem;
