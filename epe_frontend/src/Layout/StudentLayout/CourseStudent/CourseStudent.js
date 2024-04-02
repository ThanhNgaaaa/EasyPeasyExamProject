import React, { useEffect, useState } from "react";
import CourseItem from './CourseItem/CourseItem'
import styles from "./CourseStudent.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import routes from "../../../config/routes";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import jwtDecode from "jwt-decode";

const cx = classNames.bind(styles);

function CourseStudent() {
  const [courseList, setCourseList] = useState([]);
  const [coursePerPage, setCoursePerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    fetch(`https://localhost:7121/api/Courses/GetCourseByInstrId/` + jwtDecode(token).userID)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setCourseList(response);
      });
  }, []);
  console.log(jwtDecode(token).userID)
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
      <h3>My Courses</h3>
      <Link to={routes.createCourseStudent} className={cx("btn-create")}>
        Create
      </Link>
      <div className={cx("container")}>
        <div className={cx("courseList")}>
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
    </div>
  );
}

export default CourseStudent;
