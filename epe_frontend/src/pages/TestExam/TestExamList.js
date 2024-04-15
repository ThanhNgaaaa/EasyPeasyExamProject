import React, { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import styles from "../Quizzes/Quizzes.module.scss";
import classNames from "classnames/bind";
import Header from '../../Layout/components/Header/Header';
import TestExamItem from './TestExamItem';
import { Link } from 'react-router-dom';
import routes from '../../config/routes';
const cx = classNames.bind(styles);
const TestExamList = () => {
  const [quizList, setQuizList] = useState([]);
  const [quizPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  useEffect(() => {
    fetch(`https://localhost:7121/api/Exams`)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setQuizList(response);
      });
  }, []);
  const handleQuizItemClick = (quiz) => {
    setSelectedQuiz(quiz);
    setShowModal(true);
  };
  const numOfTotalPage = Math.ceil(quizList.length / quizPerPage);
  // const pages = [...Array(numOfTotalPage + 1).keys()].slice(1);

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
      <Header />
      <h2>Our Tests</h2>

      <div className={cx("content")}>
        {visibleQuiz.map((result) => (
          <TestExamItem key={result.ExamId} data={result} onClick={() => handleQuizItemClick(result)} />
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
      {showModal && (
        <div className={cx("modal", "js-modal")}>
          <div className={cx("modal-container")}>
            <button
              className={cx("modal-close")}
              onClick={() => {
                setShowModal(false);
              }}
            >
              <FiX className={cx("modal-close-icon")} />
            </button>
            <div className={cx("modal-header")}>
              <img src={selectedQuiz.ImageSrc} alt="" className={cx("modal-image")} />
            </div>
            <div className={cx("modal-body")}>
              <div>
                <div className={cx("modal-name")}>{selectedQuiz.Title}</div>
                <div className={cx("modal-des")}>{selectedQuiz.ExamDescription}</div>
              </div>
              <div className={cx("modal-action")}>
                <Link to={`${routes.testExam}/${selectedQuiz.ExamId}`} className={cx("modal-btn")}>
                  PLAY
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestExamList