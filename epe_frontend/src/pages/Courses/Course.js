import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Course.module.scss";
import CourseItem from "./CourseItem/CourseItem";
import Header from "../../Layout/components/Header/Header";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const cx = classNames.bind(styles);
const Course = () => {
  const [courseList, setCourseList] = useState([]);
  const [coursePerPage, setCoursePerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetch(`https://localhost:7121/api/Courses`)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setCourseList(response);
        // console.log(response);
      });
  }, []);
  const numOfTotalPage = Math.ceil(courseList.length / coursePerPage);
  const pages = [...Array(numOfTotalPage + 1).keys()].slice(1);

  const indexOfLastCourse = currentPage * coursePerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursePerPage;
  const visibleCourse = courseList.slice(indexOfFirstCourse, indexOfLastCourse);

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
      <h2>Our Courses</h2>

      <div className={cx("content")}>
        {visibleCourse.map((result) => (
          <CourseItem key={result.CourseId} data={result} />
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
  );
};

export default Course;
