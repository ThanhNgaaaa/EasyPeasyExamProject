import React from "react";
import Button from "../../../components/Button/Button";
import classNames from "classnames/bind";
import styles from "../CourseStudent.module.scss";
import images from "../../../../assets/images";
import routes from "../../../../config/routes";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
const CourseItem = ({ data }) => {
  const onDeleteCourse = (e, id) => {
    console.log(id);
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this ?"))
      fetch(`https://localhost:7121/api/Courses/${id}`, {
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
    <div className={cx("course-item")}>
    <div className={cx("course-item-content")}>
      <Link  to={`${routes.createLessonStudent}/${data.CourseId}`}>
        <img src={data.ImageSrc} className={cx("course-item-image")} alt="Course" />
      </Link>
      <div className={cx("info")}>
        <Link to={`${routes.createLessonStudent}/${data.CourseId}`}className={cx("name")}>
          {data.CourseName}
        </Link>
        <div className={cx("action")}>
          <Link to={`${routes.updateCourseStudent}/${data.CourseId}`} className={cx("action-link")}>
            <FiEdit className={cx("icon")} />
            Edit
          </Link>
          <button
            className={cx("action-link")}
            onClick={(e) => onDeleteCourse(e, parseInt(data.CourseId))}
          >
            <FiTrash2 className={cx("icon")} />
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CourseItem;
