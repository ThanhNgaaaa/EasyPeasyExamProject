import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./UpdateQuiz.module.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import routes from "../../../config/routes";
import { Flip, ToastContainer, toast } from "react-toastify";
import axios from "axios";

const cx = classNames.bind(styles);
const UpdateQuiz = () => {
  const navigate = useNavigate();
  const { QuestionId } = useParams();
  const [ExamId, setExamId] = useState("");
  const [content, setContent] = useState("");

  const [answersContent, setAnswersContent] = useState([]);

  useEffect(() => {
    fetch(`https://localhost:7121/api/Questions/${QuestionId}`)
      .then((response) => response.json())
      .then((data) => {
        setContent(data.Content);
        setExamId(data.ExamId);
        setAnswersContent(data.Choices);
      });
  }, [QuestionId]);

  const handleInputChange = (choiceId, event) => {
    const { value } = event.target;

    console.log("Giá trị thay đổi:", value);
    console.log("ID của input:", choiceId);

    const updatedChoices = answersContent.map((choice) => {
      if (choice.ChoiceId === choiceId) {
        return {
          ...choice,
          ChoiceContent: value,
        };
      }
      return choice;
    });

    setAnswersContent(updatedChoices);
  };

  const handleIsCorrectAnswer = (choiceId) => {
    const updatedChoices = answersContent.map((choice) => {
      if (choice.ChoiceId === choiceId) {
        return {
          ...choice,
          IsCorrect: true, // Set the current choice as the correct answer
        };
      } else {
        return {
          ...choice,
          IsCorrect: false, // Set other choices as incorrect
        };
      }
    });

    setAnswersContent(updatedChoices);
  };
  console.log(answersContent);

  const updateChoices = [
    {
      ChoiceContent: "answerA",
      IsCorrect: "correctAnswerA",
      QuestionId: "ExamId",
      ImageChoice: null,
    },
    {
      ChoiceContent: "answerB",
      IsCorrect: "correctAnswerB",
      QuestionId: "ExamId",
      ImageChoice: null,
    },
    {
      ChoiceContent: "answerC",
      IsCorrect: "correctAnswerC",
      QuestionId: "ExamId",
      ImageChoice: null,
    },
    {
      ChoiceContent: "answerD",
      IsCorrect: "correctAnswerD",
      QuestionId: "ExamId",
      ImageChoice: null,
    },
  ];
  const handleSave = async () => {
    try {
      const updateQuestion = {
        QuestionId: QuestionId,
        ExamId: ExamId,
        Content: content,
        Choices: answersContent,
        Point: 1.0,
        QuestionImage: null,
        VideoLink: null,
      };
      await axios
        .put(`https://localhost:7121/api/Quiz/${QuestionId}`, updateQuestion)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      navigate(`${routes.quizDetailStudent}/${ExamId}`);
    } catch (error) {
      console.log("Đã xảy ra lỗi:", error);
      // Xử lý lỗi nếu có
    }
  };
  return (
    <div>
      <div className={cx("wrapper")}>
        <div className={cx("content")}>
          <div className={cx("content-box")}>
            <div className={cx("content-question")}>
              <input
                className={cx("content-input_text")}
                type="text"
                placeholder=" Enter your question"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            {/* <div className={cx("content-answer-wrapper")}>
              <div className={cx("row")}>
                <div className={cx("content-answer")}>
                  <div className={cx("answer-color-A")}>
                    <input
                      type="radio"
                      id={idAnswerA}
                      value="A"
                      name="op"
                      checked={correctAnswerA}
                      className={cx("input-radio")}
                      onChange={() => handleIsCorrectAnswer("A")}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter answer "
                    className={cx("answer-input")}
                    value={answerA}
                    onChange={(e) => {
                      setAnswerA(e.target.value);
                      handleInputChange(e);
                    }}
                  />
                </div>
                <div className={cx("content-answer")}>
                  <div className={cx("answer-color-B")}>
                    <input
                      type="radio"
                      id={idAnswerB}
                      name="op"
                      value="B"
                      checked={correctAnswerB}
                      className={cx("input-radio")}
                      onChange={() => handleIsCorrectAnswer("B")}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter answer "
                    className={cx("answer-input")}
                    value={answerB}
                    onChange={(e) => {
                      setAnswerB(e.target.value);
                      handleInputChange(e);
                    }}
                  />
                </div>
              </div>
              <div className={cx("row")}>
                <div className={cx("content-answer")}>
                  <div className={cx("answer-color-C")}>
                    <input
                      type="radio"
                      value="C"
                      id={idAnswerC}
                      name="op"
                      checked={correctAnswerC}
                      className={cx("input-radio")}
                      onChange={() => handleIsCorrectAnswer("C")}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter answer "
                    className={cx("answer-input")}
                    value={answerC}
                    onChange={(e) => {
                      setAnswerC(e.target.value);
                      handleInputChange(e);
                    }}
                  />
                </div>
                <div className={cx("content-answer")}>
                  <div className={cx("answer-color-D")}>
                    <input
                      type="radio"
                      id={idAnswerD}
                      name="op"
                      value="D"
                      checked={correctAnswerD}
                      className={cx("input-answer-true", "input-radio")}
                      onChange={() => handleIsCorrectAnswer("D")}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter answer "
                    className={cx("answer-input")}
                    value={answerD}
                    onChange={(e) => {
                      setAnswerD(e.target.value);
                      handleInputChange(e);
                    }}
                  />
                </div>
              </div>
            </div> */}
            <div className={cx("content-answer-wrapper")}>
              <div className={cx("row")}>
                {answersContent.map((choice) => (
                  <div className={cx("content-answer")} key={choice.ChoiceId}>
                    <div className={cx(`answer-color-${choice.ChoiceId}`)}>
                      <input
                        type="radio"
                        id={`idAnswer${choice.ChoiceId}`}
                        value={choice.ChoiceId}
                        name="op"
                        checked={choice.IsCorrect}
                        className={cx("input-radio")}
                        onChange={() => handleIsCorrectAnswer(choice.ChoiceId)}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter answer"
                      className={cx("answer-input")}
                      value={choice.ChoiceContent}
                      onChange={(e) => handleInputChange(choice.ChoiceId, e)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={cx("content-action")}>
            <Link to={`${routes.quizDetailStudent}/${ExamId}`} className={cx("btn-exit")}>
              Exit
            </Link>
            <button
              onClick={handleSave}
              // to={`${routes.quizDetail}/${ExamId}`}
              // to="#"
              className={cx("btn-save")}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuiz;
