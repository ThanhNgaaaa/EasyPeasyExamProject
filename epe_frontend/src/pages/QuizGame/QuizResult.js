import React from "react";
import classNames from "classnames/bind";
import styles from "./QuizGame.module.scss";
const cx = classNames.bind(styles);
const QuizResult = ({ numCorrectAnswers, totalQuestions, className }) => {
  const percentage = ((numCorrectAnswers / totalQuestions) * 10).toFixed(2);
  return (
    <div className={cx("result-wrapper", classNames)}>
      <div className={cx("result-quiz")}>
        <h2 className={cx("result-content")}>Your result:</h2>

        <div className={cx("result-content")}>
          <p className={cx("result-per")}>{percentage}%</p>
          <div>
            <p className={cx("result-detail")}>
              Total number of questions :{" "}
              <span className={cx("result-details")}> {totalQuestions}</span>
            </p>

            <p className={cx("result-detail")}>
              Number of correct answers:
              <span className={cx("result-details")}> {numCorrectAnswers}</span>{" "}
            </p>

            <p className={cx("result-detail")}>
              Number of wrong answers:
              <span className={cx("result-details")}> {totalQuestions - numCorrectAnswers}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
