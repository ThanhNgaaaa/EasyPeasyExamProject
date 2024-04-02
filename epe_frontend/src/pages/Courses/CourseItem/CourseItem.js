import React from "react";
import Button from "../../../Layout/components/Button/Button";
import classNames from "classnames/bind";
import styles from "../Course.module.scss";
import images from "../../../assets/images";
import routes from "../../../config/routes";
import { BsFillStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
const CourseItem = ({ data }) => {
  return (
    <Link to={`${routes.courseDetail}/${data.CourseId}`} className={cx("course-item")}>
      <div className={cx("course-item-content")}>
        <img src={data.ImageSrc} className={cx("course-item-image")} alt="Course" />
        <div className={cx("info")}>
          <div className={cx("course-item-review")}>
            <BsFillStarFill />
            <BsFillStarFill />
            <BsFillStarFill />
            <BsStarHalf />
            <BsStar />
          </div>
          <span className={cx("name")}>{data.CourseName}</span>
          <span className={cx("description")}>{data.CourseDescription}</span>
          <button to={`${routes.courseDetail}/${data.CourseId}`} className={cx("btn-join")}>
            Learn more
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CourseItem;
