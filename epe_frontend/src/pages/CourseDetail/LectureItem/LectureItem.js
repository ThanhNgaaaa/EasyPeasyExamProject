import React from 'react'
import classNames from "classnames/bind";
import styles from "../CourseDetail.module.scss";
import { FiFileText, FiPlayCircle } from "react-icons/fi";
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';
const cx = classNames.bind(styles);
const LectureItem = ({ data, dataType,onClick,className,courseId}) => {
  return (
    <Link to={`${routes.lesson}/${courseId}`} className={cx("accordion-item-content",className)} onClick={onClick}>
      <div className={cx("lesson-link")}>
        <div className={cx("lesson-content")}>
          {dataType==="Video" ? <FiPlayCircle className={cx("lesson-icon")} />: <FiFileText className={cx("lesson-icon")}/>}
          
          <span className={cx("lesson-text")}>{data.Title}</span>
        </div>
      </div>
    </Link>
  );
};

export default LectureItem