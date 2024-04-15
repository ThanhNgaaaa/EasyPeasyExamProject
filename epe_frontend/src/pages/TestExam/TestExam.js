import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./TestExam.module.scss";
import classNames from "classnames/bind";
import { FiChevronLeft, FiX } from "react-icons/fi";
import TestQuestion from "./TestQuestion";
import TestResult from "./TestResult";
import routes from "../../config/routes";
import Loading from "../../components/Modals/Loading";
const cx = classNames.bind(styles);
const TestExam = () => {
  const { ExamId } = useParams();
  const [exam, setExam] = useState({});
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState([]);
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
  const [numIncorrectAnswers, setNumIncorrectAnswers] = useState(0);
  const [isAnswered, setIsAnswered] = useState(Array(question.length).fill(false));
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1);
  const [loading, setLoading] = useState(true);

  //
  const [submitResult, setSubmitResult] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };
  useEffect(() => {
    axios
      .get(`https://localhost:7121/api/Quiz/${ExamId}`)
      .then((response) => {
        setLoading(false);
        setExam(response.data[0]);
        setTitle(response.data[0].Title);
        setTimeLeft(response.data[0].Duration);
        setQuestion(response.data[0].Questions);
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ExamId]);

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
    formattedTime = `00:${timeLeft}`;
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
  const handleRestartClick = () => {
    setNumCorrectAnswers(0);
    setIsQuizFinished(false);
    setTimeLeft(exam.Duration);
  };
  const handleResultSubmit = () => {
    setSubmitResult(true);
  };
  useEffect(() => {
    if (isQuizFinished && !submitResult) {
      handleResultSubmit();
    }
  }, [isQuizFinished, submitResult]);
  if (isQuizFinished) {
    return (
      <div className={cx("quiz-container")}>
        <TestResult
          numCorrectAnswers={numCorrectAnswers}
          numIncorrectAnswers={numIncorrectAnswers}
          totalQuestions={question.length}
          submitResult={submitResult}
          onResultSubmit={handleResultSubmit}
        />
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
  const handleAnswered = (isCorrect, index) => {
    if (isCorrect) {
      setNumCorrectAnswers((prevNumCorrectAnswers) => prevNumCorrectAnswers + 1);
    } else {
      setNumIncorrectAnswers((prevNumIncorrectAnswers) => prevNumIncorrectAnswers + 1);
    }
    setIsAnswered((prevIsAnswered) => {
      const updatedIsAnswered = [...prevIsAnswered];
      updatedIsAnswered[index] = true;
      return updatedIsAnswered;
    });
  };
  const handleQuit = () => {
    if (window.confirm("Do you want to quit?")) {
      navigate("/testExamList");
    }
  };
  const handleFinishClick = () => {
    if (window.confirm("Do you want to submit?")) {
      setIsQuizFinished(true);
    }
  };

  return (
    <div className={cx("wrapper")}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={cx("menu-top")}>
            <div className={cx("menu-container")}>
              <div className={cx("menu-back")} onClick={handleQuit}>
                <FiChevronLeft className={cx("menu-back_icon")} />
                Back
              </div>
              <div className={cx("menu-time")}>
                <p id="countdown-timer">{formattedTime}</p>
              </div>
              <button className={cx("btn-submit")} onClick={handleFinishClick}>
                Submit
              </button>
            </div>
          </div>
          <div className={cx("content")}>
            <div className={cx("test-page")}>
              <h1 className={cx("test-title")}>{title}</h1>
              <div className={cx("test-box")}>
                {question.map((result, index) => (
                  <TestQuestion
                    key={result.Id}
                    data={result}
                    questionNumber={index + 1}
                    onAnswered={(isCorrect) => handleAnswered(isCorrect, index)}
                    isAnswered={isAnswered[index]}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TestExam;
