import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CreateLesson.module.scss";
import { Link, useParams } from "react-router-dom";
import { FiChevronLeft, FiPlus } from "react-icons/fi";
import routes from "../../../config/routes";
import LessonItem from "./LessonItem/LessonItem";
import axios from "axios";
const cx = classNames.bind(styles);

const CreateLesson = () => {
  const { CourseId } = useParams();
  const [courseTitle, setCourseTitle] = useState("");
  const [showDefaultLesson, setShowDefaultLesson] = useState(false);
  // const { CourseId } = 1;
  // ${CourseId}

  const [lessonList, setLessonList] = useState([]);
  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7121/api/Lessons/GetLessonByCourseId/${CourseId}`,
        );
        const data = await response.json();
        setLessonList(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching lesson data:", error);
      }
    };

    fetchLessonData();
  }, []);
  useEffect(() => {
    fetch(`https://localhost:7121/api/Courses/${CourseId}`)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setCourseTitle(response.CourseName);
      });
  }, []);
  const defaultLesson = {
    LessonId: -1,
    LessonTitle: "Introduction",
  };
  const createDefaultLesson = () => {
    return <LessonItem data={defaultLesson} lessonNumber={lessonList.length + 1} />;
  };
  const showLessonItemDefault = () => {
    handlePostLesson();
    setShowDefaultLesson(true);
  };
  const handlePostLesson = () => {
    var newLesson = {
      LessonTitle: defaultLesson.LessonTitle,
      CourseId: CourseId,
    };
    axios
      .post("https://localhost:7121/api/Lessons", newLesson)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSave = () => {};
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <Link to={routes.coursesInstructor} className={cx("btn-back")}>
          <FiChevronLeft className={cx("btn-back_icon")} />
        </Link>
        <span>{courseTitle}</span>
      </div>
      <div className={cx("container")}>
        <div className={cx("app-content")}>
          <div className={cx("lesson-subheader")}>Lesson Infomation</div>
          <div className={cx("content")}>
            <div className={cx("lesson-list")}>
              {/* {lessonList.length === 0
                ? createDefaultLesson()
                : lessonList.map((result, index) => (
                    <LessonItem key={result.LessonId} data={result} lessonNumber={index + 1} courseId={result.CourseId} />
                  ))} */}
              {lessonList.map((result, index) => (
                <LessonItem
                  key={result.LessonId}
                  data={result}
                  lessonNumber={index + 1}
                  courseId={result.CourseId}
                />
              ))}
              {showDefaultLesson && createDefaultLesson()}

              <div>
                <button
                  className={cx("btn-add_lesson")}
                  onClick={() => {
                    showLessonItemDefault();
                  }}
                >
                  <FiPlus className={cx("btn-add_icon")} />
                  Add Lesson
                </button>
              </div>
            </div>
            {/* <div className={cx("lesson-submit")}>
              <button onClick={handleSave} className={cx("btn-save")}>
                Save
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLesson;
