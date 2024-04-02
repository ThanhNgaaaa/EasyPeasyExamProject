import React from "react";
import classNames from "classnames/bind";
import styles from "./LessonDetail.module.scss";
import images from "../../assets/images";
import routes from "../../config/routes";
import video from "../../assets/video";
import { FiArrowLeft, FiPlayCircle, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VideoItem from "./VideoItem/VideoItem";
import LectureItem from "./LectureItem/LectureItem";
import DocumentItem from "./DocumentItem/DocumentItem";
const cx = classNames.bind(styles);
const LessonDetail = () => {
  const [videoList, setVideoList] = useState([]);
  const { CourseId } = useParams();
  const [lessonByCourseId, setLessonByCourseId] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isActive, setIsActive] = useState("");
  const [lectureList, setLectureList] = useState({});
  const [selectedLecture, setSelectedLecture] = useState(null);
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
  console.log(lessonByCourseId);
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Lấy phần tử đầu tiên từ mảng items
        const initialItem = lessonByCourseId[0].items[0];

        // Kiểm tra xem phần tử có tồn tại không trước khi thực hiện axios
        if (initialItem) {
          if (initialItem.hasOwnProperty("DocumentId")) {
            // Nếu là document, gọi API document
            const response = await axios.get(
              `https://localhost:7121/api/Document/${initialItem.DocumentId}`,
            );
            setSelectedLecture(response.data);
            // Xử lý response cho document
            console.log(response.data);
          } else if (initialItem.hasOwnProperty("VideoId")) {
            // Nếu là video, gọi API video
            const response = await axios.get(
              `https://localhost:7121/api/Video/${initialItem.VideoId}`,
            );
            setSelectedLecture(response.data);
            // Xử lý response cho video
            console.log(response.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Gọi hàm loadInitialData khi lessonByCourseId thay đổi
    loadInitialData();
  }, [lessonByCourseId]);
  const handleVideoClick = async (videoId) => {
    try {
      const response = await axios.get(`https://localhost:7121/api/Video/${videoId}`);
      setSelectedLecture(response.data);
      setIsActive('active');
      setSelectedVideo(videoId);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDocumentClick = async (documentId) => {
    try {
      const response = await axios.get(`https://localhost:7121/api/Document/${documentId}`);
      setSelectedLecture(response.data);
      setIsActive('active');
      setSelectedDocument(documentId);
      console.log(selectedLecture);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("left-sidebar")}>
        <div className={cx("section-title")}>
          <h4>Course Content</h4>
        </div>
        <hr />
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
                  className={cx({ isActive: selectedDocument === document.DocumentId })}
                />
              ))}
              {lesson.lecture.Videos.map((video) => (
                <LectureItem
                  key={video.VideoId}
                  data={video}
                  dataType="Video"
                  onClick={() => handleVideoClick(video.VideoId)}
                  className={cx({ isActive: selectedVideo === video.VideoId })}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={cx("right-sidebar")}>
        {selectedLecture && selectedLecture.hasOwnProperty("VideoId") ? (
          <VideoItem data={selectedLecture} />
        ) : (
          selectedLecture && <DocumentItem data={selectedLecture} />
        )}
      </div>
    </div>
  );
};

export default LessonDetail;
