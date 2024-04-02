import React from "react";
import classNames from "classnames/bind";
import styles from "../LessonDetail.module.scss";
import { FiFileText, FiPlayCircle } from "react-icons/fi";
const cx = classNames.bind(styles);
const LectureItem = ({ data, dataType,onClick,className}) => {
  return (
    <div className={cx("accordion-item-content",className)} onClick={onClick}>
      <div className={cx("lesson-link")}>
        <div className={cx("lesson-content")}>
          {dataType==="Video" ? <FiPlayCircle className={cx("lesson-icon")} />: <FiFileText className={cx("lesson-icon")}/>}
          
          <span className={cx("lesson-text")}>{data.Title}</span>
        </div>
      </div>
    </div>
  );
};

export default LectureItem;
