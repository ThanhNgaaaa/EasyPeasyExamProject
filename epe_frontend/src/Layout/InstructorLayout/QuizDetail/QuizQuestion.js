import React from "react";
import classNames from "classnames/bind";
import styles from "./QuizDetail.module.scss";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { useEffect } from "react";
import routes from "../../../config/routes";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const QuizQuestion = ({ question, index }) => {
  const questionNumber = index + 1;
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    // Set the selected answer to the correct answer when the component is first rendered
    const correctAnswerIndex = question.Choices.findIndex((choice) => choice.IsCorrect);
    setSelectedAnswer(correctAnswerIndex);
  }, [question.Choices]);

  const isCorrectAnswer = (answerIndex) => {
    return selectedAnswer === answerIndex && question.Choices[answerIndex].IsCorrect;
  };
  const onDeleteCourse = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this ?"))
      fetch(`https://localhost:7121/api/Quiz/${id}`, {
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
    <div className={cx("container-oi")}>
      <div className={cx("container-question")}>
        <div className={cx("content")}>
          <div className={cx("header-question")}>
            <span> Question {questionNumber}</span>
            <div className={cx("actions")}>
              <Link
                to={`${routes.updateQuestion}/${question.QuestionId}`}
                className={cx("btn-edit")}
              >
                <FiEdit className={cx("icon-edit")} />
                Edit
              </Link>
              <button
                className={cx("btn-delete")}
                onClick={(e) => onDeleteCourse(e, parseInt(question.QuestionId))}
              >
                <FiTrash2 className={cx("icon-del")} />
              </button>
            </div>
          </div>

          <div className={cx("footer-question")}></div>
        </div>
      </div>
      <div className={cx("content-question")}>
        <div className={cx("question")}>{question.Content}</div>
        <span className={cx("span-ques")}>answer choices</span>
        <div className={cx("answer")}>
          {question.Choices.map((choice, index) => (
            <div key={choice.ChoiceId} className={cx("choice", "col-2")}>
              <span
                className={cx("choice-color", {
                  "correct-answer": isCorrectAnswer(index),
                })}
              ></span>
              <div  className={cx("choice-content")}>{choice.ChoiceContent}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
