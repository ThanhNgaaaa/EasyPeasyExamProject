import React from "react";
import styles from "./Quizzes.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export const QuizItem = ({ data, onClick, ...passProps }) => {
  const props = {
    onClick,
    ...passProps,
  };

  return (
    <div {...props} className={cx("quiz-item")}>
      <div className={cx("quiz-item-content")}>
        <img src={data.ImageSrc} className={cx("quiz-item-image")} alt="quiz" />
        <div className={cx("info")}>
          <span className={cx("cate")}>Quiz</span>
          <span className={cx("name")}>{data.Title}</span>
          <span className={cx("description")}>{data.ExamDescription}</span>
        </div>
      </div>
    </div>
  );
};
