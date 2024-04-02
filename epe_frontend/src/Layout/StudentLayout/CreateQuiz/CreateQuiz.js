import React from "react";
import Header from "../../components/Header/Header";
import classNames from "classnames/bind";
import styles from "./CreateQuiz.module.scss";
import { FiAward, FiClock, FiPlus, FiTrash2 } from "react-icons/fi";
import images from "../../../assets/images";
import Button from "../../components/Button/Button";
import routesConfig from "../../../config/routes";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import routes from "../../../config/routes";
const cx = classNames.bind(styles);
const CreateQuiz = () => {
  const { ExamId } = useParams();
  const [question, setQuestion] = useState("");
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [answerC, setAnswerC] = useState("");
  const [answerD, setAnswerD] = useState("");
  const [correctAnswerA, setCorrectAnswerA] = useState(false);
  const [correctAnswerB, setCorrectAnswerB] = useState(false);
  const [correctAnswerC, setCorrectAnswerC] = useState(false);
  const [correctAnswerD, setCorrectAnswerD] = useState(false);
  const navigate = useNavigate();

  const handleIsCorrectAnswer = (key) => {
    if (key === "A") {
      setCorrectAnswerA(true);
    }
    if (key === "B") {
      setCorrectAnswerB(true);
    }
    if (key === "C") {
      setCorrectAnswerC(true);
    }
    if (key === "D") {
      setCorrectAnswerD(true);
    }
  };
  const handleSave = () => {
    const newChoices = [
      {
        ChoiceContent: answerA,
        IsCorrect: correctAnswerA,
        QuestionId: ExamId,
        ImageChoice: null,
      },
      {
        ChoiceContent: answerB,
        IsCorrect: correctAnswerB,
        QuestionId: ExamId,
        ImageChoice: null,
      },
      {
        ChoiceContent: answerC,
        IsCorrect: correctAnswerC,
        QuestionId: ExamId,
        ImageChoice: null,
      },
      {
        ChoiceContent: answerD,
        IsCorrect: correctAnswerD,
        QuestionId: ExamId,
        ImageChoice: null,
      },
    ];
    const newQuestion = {
      ExamId: ExamId,
      Content: question,
      Choices: newChoices,
      Point: 1.0,
      QuestionImage: null,
      VideoLink: null,
    };

    axios
      .post("https://localhost:7121/api/Quiz", newQuestion)
      .then((response) => {
        // Xử lý kết quả trả về khi thành công
        console.log(response.data);
        // window.location.reload();
      })
      .catch((error) => {
        // Xử lý lỗi khi yêu cầu thất bại
        console.log(error);
      });
    navigate(`${routes.quizDetailStudent}/${ExamId}`);
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
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className={cx("content-answer-wrapper")}>
              <div className={cx("row")}>
                <div className={cx("content-answer")}>
                  <div className={cx("answer-color-A")}>
                    <input
                      type="radio"
                      id="A"
                      value="A"
                      name="op"
                      className={cx("input-radio")}
                      onChange={() => handleIsCorrectAnswer("A")}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter answer "
                    className={cx("answer-input")}
                    value={answerA}
                    onChange={(e) => setAnswerA(e.target.value)}
                  />
                </div>
                <div className={cx("content-answer")}>
                  <div className={cx("answer-color-B")}>
                    <input
                      type="radio"
                      id="B"
                      name="op"
                      value="B"
                      className={cx("input-radio")}
                      onChange={() => handleIsCorrectAnswer("B")}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter answer "
                    className={cx("answer-input")}
                    value={answerB}
                    onChange={(e) => setAnswerB(e.target.value)}
                  />
                </div>
              </div>
              <div className={cx("row")}>
                <div className={cx("content-answer")}>
                  <div className={cx("answer-color-C")}>
                    <input
                      type="radio"
                      value="C"
                      id="C"
                      name="op"
                      className={cx("input-radio")}
                      onChange={() => handleIsCorrectAnswer("C")}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter answer "
                    className={cx("answer-input")}
                    value={answerC}
                    onChange={(e) => setAnswerC(e.target.value)}
                  />
                </div>
                <div className={cx("content-answer")}>
                  <div className={cx("answer-color-D")}>
                    <input
                      type="radio"
                      id="D"
                      name="op"
                      value="D"
                      className={cx("input-answer-true", "input-radio")}
                      onChange={() => handleIsCorrectAnswer("D")}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter answer "
                    className={cx("answer-input")}
                    value={answerD}
                    onChange={(e) => setAnswerD(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={cx("content-action")}>
            <Link to={`${routes.quizDetailStudent}/${ExamId}`} className={cx("btn-exit")}>
              Exit
            </Link>
            <button
              // to={`${routes.quizDetail}/${ExamId}`}
              onClick={handleSave}
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

export default CreateQuiz;
