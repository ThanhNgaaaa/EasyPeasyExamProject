import React from "react";
import classNames from "classnames/bind";
import styles from "./QuizGame.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";
import { FiX } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
const cx = classNames.bind(styles);
const QuizGame = () => {
  const { ExamId } = useParams();
  const [exam, setExam] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exam.Duration * 60);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://localhost:7121/api/Quiz/${ExamId}`)
      .then((response) => {
        setExam(response.data[0]);
        setTimeLeft(response.data[0].Duration);
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  let formattedTime;
  if (timeLeft >= 3600) {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  } else if (timeLeft >= 60) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  } else {
    formattedTime = `${timeLeft} seconds`;
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsQuizFinished(true);
    }
  }, [timeLeft]);
  const handleAnswered = (isCorrect) => {
    if (isCorrect) {
      setNumCorrectAnswers((prevNumCorrectAnswers) => prevNumCorrectAnswers + 1);
    }
  };
  const handleNextClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  const handleLastClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };
  const handleFinishClick = () => {
    setIsQuizFinished(true);
  };
  const handleRestartClick = () => {
    setCurrentQuestionIndex(0);
    setNumCorrectAnswers(0);
    setIsQuizFinished(false);
    setTimeLeft(exam.Duration);
  };
  const questions = exam.Questions;

  if (isQuizFinished) {
    return (
      <div className={cx("quiz-container")}>
        <QuizResult numCorrectAnswers={numCorrectAnswers} totalQuestions={questions.length} />
        <div className={cx("quiz-result-actions")}>
          <button className={cx("btn-restart")} onClick={handleRestartClick}>
            Try Again
          </button>
          <button className={cx("btn-back")} onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }
  const totalQuestions = exam.Questions && exam.Questions.length;
  const currentQuestion = exam.Questions && exam.Questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === (exam.Questions && exam.Questions.length - 1);
  const handleQuit = () => {
    if (window.confirm("Do you want to quit?")) {
      navigate("/quiz");
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div>
        <div className={cx("timer")}>
          <h2>
            <p id="countdown-timer">{formattedTime}</p>
          </h2>
        </div>
      </div>
      <button className={cx("btn-quit")} onClick={handleQuit}>
        <FiX className={cx("icon-quit")} />
      </button>
      <div className={cx("container")}>
        <div className={cx("content")}>
          <div className={cx("move")}>
            <div className={cx("step-count")}>
              Question <span id="activeStep">{currentQuestionIndex + 1}</span>/{totalQuestions}
            </div>
          </div>

          <div className={cx("steps")}>
            {currentQuestion && (
              <QuizQuestion
                question={questions[currentQuestionIndex]}
                onAnswered={handleAnswered}
              />
            )}
            <div className={cx("next-prev")}>
              <div className={cx("btn-action-prev")}>
                {currentQuestionIndex > 0 && (
                  <button type="button" className={cx("prev")} onClick={handleLastClick}>
                    Last Question
                  </button>
                )}
              </div>
              {isLastQuestion ? (
                <div className={cx("btn-action-next")}>
                  <button
                    type="button"
                    className={cx("next", "finish")}
                    onClick={handleFinishClick}
                  >
                    Finish
                  </button>
                </div>
              ) : (
                <div className={cx("btn-action-next")}>
                  <button type="button" className={cx("next")} onClick={handleNextClick}>
                    Next Question
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
