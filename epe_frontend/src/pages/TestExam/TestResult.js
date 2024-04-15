import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "../QuizGame/QuizGame.module.scss";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Loading from "../../components/Modals/Loading";
import { useParams } from "react-router-dom";
const cx = classNames.bind(styles);
const TestResult = ({
  numCorrectAnswers,
  totalQuestions,
  submitResult,
  onResultSubmit,
}) => {
  const point = ((numCorrectAnswers / totalQuestions) * 10).toFixed(2);
  const { ExamId } = useParams();
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultSubmitted, setResultSubmitted] = useState(false);

  useEffect(() => {
    if (submitResult && !resultSubmitted) {
      handleSubmit();
      console.log(ExamId);
    }
  }, [submitResult, resultSubmitted]);
  useEffect(() => {
    let token = localStorage.getItem("jwtToken");
    if (!token) {
      setUserId("");
      return;
    }
    const decodedToken = jwtDecode(token);
    if (!decodedToken || !decodedToken.username) {
      setUserId("");
      return;
    }
    setUserId(decodedToken.userID);
  }, [userId]);


  const handleSubmit = (e) => {
    setLoading(true);
    axios
      .post(`https://localhost:7121/api/ExamResults`, {
        ExamId: ExamId,
        StudentId: userId,
        TotalPoint: point,
      })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setResultSubmitted(true);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  return (
    <div className={cx("result-wrapper", classNames)}>
      {loading ? (
        <Loading />
      ) : (
        <div className={cx("result-quiz")}>
          <h2 className={cx("result-content")}>Your result:</h2>

          <div className={cx("result-content")}>
            <p className={cx("result-per")}>{point}</p>
            <div>
              {/* <p className={cx("result-detail")}>
        Total number of questions :{" "}
        <span className={cx("result-details")}> {totalQuestions}</span>
      </p> */}

              <p className={cx("result-detail")}>
                Number of correct answers:
                <span className={cx("result-details")}>
                  {" "}
                  {numCorrectAnswers}/{totalQuestions}
                </span>
              </p>

              <p className={cx("result-detail")}>
                Number of wrong answers:
                <span className={cx("result-details")}>
                  {" "}
                  {totalQuestions - numCorrectAnswers}/{totalQuestions}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestResult;
