import React from "react";
import classNames from "classnames/bind";
import styles from "./CourseItem.module.scss";
import { Link } from "react-router-dom";
import routes from "../../config/routes";
const cx = classNames.bind(styles);
const CourseItem = ({ data }) => {
  return (
    <Link to={`${routes.courseDetail}/${data.CourseId}`} className={cx("wrapper")}>
      <img src={data.ImageSrc} className={cx("image-course")} alt="Course" />
      <div className={cx("info")}>
        <span className={cx("name")}>{data.CourseName}</span>
      </div>
    </Link>
  );
};

export default CourseItem;
