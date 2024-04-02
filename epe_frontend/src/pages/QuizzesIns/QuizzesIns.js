import React from "react";
import classNames from "classnames/bind";
import styles from "./QuizzesIns.module.scss";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import { useEffect } from "react";
import routes from "../../config/routes";
import jwtDecode from "jwt-decode";
import QuizInsItem from "./QuizInsItem/QuizInsItem";
const cx = classNames.bind(styles);
const QuizzesIns = () => {
  const [quizList, setQuizList] = useState([]);
  const [quizPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    fetch(`https://localhost:7121/api/Exams/GetExamByInstructorId/` + jwtDecode(token).userID)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setQuizList(response);
      });
  }, []);
  const numOfTotalPage = Math.ceil(quizList.length / quizPerPage);
  const pages = [...Array(numOfTotalPage + 1).keys()].slice(1);

  const indexOfLastQuiz = currentPage * quizPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizPerPage;
  const visibleQuiz = quizList.slice(indexOfFirstQuiz, indexOfLastQuiz);

  const [pageGroup, setPageGroup] = useState(0);
  const groupSize = 3;
  const startPage = pageGroup * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, numOfTotalPage);
  const prevPageHandle = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if (currentPage === startPage) {
        setPageGroup(pageGroup - 1);
      }
    }
  };
  const nextPageHandle = () => {
    if (currentPage < numOfTotalPage) {
      setCurrentPage(currentPage + 1);
      if (currentPage === endPage) {
        setPageGroup(pageGroup + 1);
        console.log(pageGroup);
      }
    }
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <h3>My Quiz</h3>
      <Link to={routes.createExam} className={cx("btn-create")}>
        Create
      </Link>
      <div className={cx("container")}>
        <div className={cx("courseList")}>
          {visibleQuiz.map((result) => (
            <QuizInsItem key={result.ExamId} data={result} />
          ))}
        </div>
        <div className={cx("pagination")}>
          <ul className={cx("pagination-list")}>
            <li onClick={prevPageHandle}>
              <FiChevronLeft className={cx("icon-nav")} />
            </li>
            <div className={cx("pagination-number")}>
              {Array.from({ length: groupSize }).map((_, index) => {
                const page = pageGroup * groupSize + index + 1;
                return (
                  page <= numOfTotalPage && (
                    <li
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cx({ active: currentPage === page })}
                    >
                      {page}
                    </li>
                  )
                );
              })}
            </div>
            <li onClick={nextPageHandle}>
              <FiChevronRight className={cx("icon-nav")} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuizzesIns;
