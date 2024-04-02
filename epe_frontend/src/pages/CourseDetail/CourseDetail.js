import React from "react";
import classNames from "classnames/bind";
import styles from "./CourseDetail.module.scss";
import { Link } from "react-router-dom";
import images from "../../assets/images";
import { FiArrowRight, FiChevronLeft, FiEye, FiPlayCircle } from "react-icons/fi";
import routes from "../../config/routes";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LectureItem from "./LectureItem/LectureItem";
const cx = classNames.bind(styles);
const CourseDetail = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState(null);
  const { CourseId } = useParams();
  const [lessonByCourseId, setLessonByCourseId] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isActive, setIsActive] = useState("");
  const [lectureList, setLectureList] = useState({});
  const [selectedLecture, setSelectedLecture] = useState(null);

  useEffect(() => {
    fetch(`https://localhost:7121/api/Courses/${CourseId}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
      });
  }, [CourseId]);

  useEffect(() => {
    const fetchData = async () => {
      if (CourseId !== null && CourseId !== undefined) {
        try {
          const response = await axios.get(
            `https://localhost:7121/api/Lessons/GetLessonByCourseId/${CourseId}`,
          );
          if (response.data.length > 0) {
            const promises = response.data.map(async (lesson) => {
              const dataResponse = await axios.get(
                `https://localhost:7121/api/Lessons/GetLessonData/${lesson.LessonId}`,
              );
              return {
                ...lesson,
                lecture: dataResponse.data,
                items: [...dataResponse.data.Documents, ...dataResponse.data.Videos],
              };
            });
            const dataLecture = await Promise.all(promises);
            setLessonByCourseId(dataLecture);
            console.log(lessonByCourseId);
          } else {
            console.log("Response is empty");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [CourseId]);

  if (!course) {
    return <div>Loading...</div>;
  }
  const handleVideoClick = async (videoId) => {
    try {
      const response = await axios.get(`https://localhost:7121/api/Video/${videoId}`);
      setSelectedLecture(response.data);
      setIsActive("active");
      setSelectedVideo(videoId);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDocumentClick = async (documentId) => {
    try {
      const response = await axios.get(`https://localhost:7121/api/Document/${documentId}`);
      setSelectedLecture(response.data);
      setIsActive("active");
      setSelectedDocument(documentId);
      console.log(selectedLecture);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("banner")}>
        <div className={cx("banner-image")}></div>
        <div className={cx("banner-content")}>
          <div className={cx("banner-content-top")}>
            <div className={cx("container")}>
              <div className={cx("row")}>
                <div className={cx("content")}>
                  <h2 className={cx("title", "theme-title-gradient")}>{course.CourseName}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("section-overlay")}>
          <div className={cx("inner")}>
            <div className={cx("container")}>
              <div className={cx("col-12")}>
                <div className={cx("video-content")}>
                  <img src={course.ImageSrc} alt="Video Man" className={cx("video-image")} />
                  <span className={cx("play-view-text")}>
                    <FiEye className={cx("play-view-icon")} />
                    Preview this course
                  </span>
                </div>
                <div className={cx("row", "row-pt")}>
                  <div className={cx("col-4")}>
                    <div className={cx("course-sidebar", "gradient-border")}>
                      <div className={cx("inner-sidebar")}>
                        <div className={cx("learn-now-btn")}>
                          <Link
                            to={`${routes.lesson}/${CourseId}`}
                            className={cx("learn-now-text")}
                          >
                            Learn Now
                            <FiArrowRight className={cx("learn-now-icon")} />
                          </Link>
                        </div>
                        <div className={cx("back-btn")}>
                          <Link to={routes.home} className={cx("back-text")}>
                            Back to home
                            <FiChevronLeft className={cx("back-icon")} />
                          </Link>
                        </div>
                        <div className={cx("widget-detail")}></div>
                      </div>
                    </div>
                  </div>
                  <div className={cx("col-8")}>
                    <div className={cx("course-detail-content")}>
                      <div className={cx("course-feature-box")}>
                        <div className={cx("course-feature-inner")}>
                          <div className={cx("section-title")}>
                            <h4>What you'll learn</h4>
                          </div>
                          <p className={cx("section-description")}>{course.CourseDescription}</p>
                        </div>
                      </div>
                    </div>
                    <div className={cx("course-content", "course-feature-box")}>
                      <div className={cx("section-title")}>
                        <h4>Course Content</h4>
                      </div>
                      <div className={cx("accordion")}>
                        {lessonByCourseId.map((lesson) => (
                          <div key={lesson.LessonId} className={cx("accordion-item")}>
                            <h2 className={cx("accordion-header")}>{lesson.LessonTitle}</h2>
                            {lesson.lecture.Documents.map((document) => (
                              <LectureItem
                                key={document.DocumentId}
                                data={document}
                                dataType="Document"
                                onClick={() => handleDocumentClick(document.DocumentId)}
                                className={cx({
                                  isActive: selectedDocument === document.DocumentId,
                                })}
                                courseId={CourseId}
                              />
                            ))}
                            {lesson.lecture.Videos.map((video) => (
                              <LectureItem
                                key={video.VideoId}
                                data={video}
                                dataType="Video"
                                onClick={() => handleVideoClick(video.VideoId)}
                                className={cx({ isActive: selectedVideo === video.VideoId })}
                                courseId={CourseId}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
