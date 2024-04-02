import React from "react";
import classNames from "classnames/bind";
import styles from "./LessonItem.module.scss";
const cx = classNames.bind(styles);
const LessonItem = ({ data }) => {
  return (
    <div className={cx("lesson-item")}>
      <h2 className={cx("lesson-header")}>{data.LessonTitle}</h2>
      <div className={cx("lesson-content")}>
        <ul>
          <li>
           <div className={cx("list-video")}>
            
           </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LessonItem;
