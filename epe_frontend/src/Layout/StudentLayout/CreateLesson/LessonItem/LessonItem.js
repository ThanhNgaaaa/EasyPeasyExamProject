import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "../CreateLesson.module.scss";
import { FiChevronDown, FiChevronUp, FiEdit2, FiFile, FiPlus, FiTrash } from "react-icons/fi";
import LectureItem from "../LectureItem/LectureItem";
import axios from "axios";
import ModalDeleteLessonItem from "../Modal/ModalDeleteLessonItem/ModalDeleteLessonItem";

const cx = classNames.bind(styles);
const LessonItem = ({ data, lessonNumber, courseId }) => {
  const [lectureList, setLectureList] = useState({ Documents: [], Videos: [] });
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitleLesson, setEditedTitleLesson] = useState(data.LessonTitle);
  const [openModalDelete,setOpenModalDelete] = useState(false);
  const [showDefaultLecture, setShowDefaultLecture] = useState(false);
  const defaultLecture = {
    LessonId:data.LessonId,
    LectureId: -1,
    Title:"new lecture",
  };
  const createDefaultLecture = () => {
   
    return <LectureItem data={defaultLecture} dataType="" lectureNumber={allItems.length + 1}  />;
  };
  useEffect(() => {
    if (!isDataAvailable) {
      setIsDataLoaded(false); // Reset giá trị của isDataLoaded khi không có data
    }

    if (data) {
      setIsDataAvailable(true); // Đặt giá trị của isDataAvailable thành true nếu có data
      setIsDataLoaded(true); // Kích hoạt effect khi có data
    }
  }, [data, isDataAvailable]);
  useEffect(() => {
    if (isDataLoaded && data.LessonId !== -1) {
      const fetchLessonData = async () => {
        try {
          const response = await fetch(
            `https://localhost:7121/api/Lessons/GetLessonData/${data.LessonId}`,
          );
          const responseData = await response.json();
          setLectureList(responseData);
          setIsDataLoaded(false);
          // console.log(responseData);
        } catch (error) {
          console.error("Error fetching lesson data:", error);
        }
      };

      fetchLessonData();
    }
  }, [data, isDataLoaded]);
  const allItems = lectureList.Documents.concat(lectureList.Videos);
  console.log(allItems);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleEditClickCancel = () => {
    setEditedTitleLesson(data.LessonTitle);
    setIsEditing(false);
  };
  const handelSaveEditLessonTitle =async () => {
    try{
      var editedData = {
        LessonId: data.LessonId,
        LessonTitle: editedTitleLesson,
        CourseId: courseId,
      };
      console.log(editedData);
  
      await axios
        .put(`https://localhost:7121/api/Lessons/${data.LessonId}`, editedData)
        .then((response) => {
          console.log(response.data);
          setIsEditing(false); 
        })
        .catch((error) => {
          console.log(error);
        });
    }catch(err){
      console.log(err);
    }
    
  };
  const showLectureItemDefault = () => { 
    console.log(defaultLecture);
    setShowDefaultLecture(true);
  };
  
  return (
    <div className={cx("lesson-item")}>
      <div className={cx("lesson-title")}>
        <span className={cx("lesson-title_section")}>
          Lesson {data.LessonId === -1 ? 1 : lessonNumber}:
        </span>
        <FiFile className={cx("lesson-title_icon")} />
        {isEditing ? ( // Kiểm tra trạng thái isEditing để xác định xem có hiển thị <input> hay <span>
          <div className={cx("editLessonContainer")}>
            <input
              className={cx("lesson-title_name", "lesson-title_input")} // Sử dụng className mới cho <input>
              value={editedTitleLesson}
              onChange={(e) => {
                setEditedTitleLesson(e.target.value);
              }}
            />
            <button className={cx("btn-edit-lesson","btn-edit-cancel")} onClick={handleEditClickCancel}>
              <span>Cancel</span>
            </button>
            <button className={cx("btn-edit-lesson")} onClick={handelSaveEditLessonTitle}>
              <span>Save</span>
            </button>
          </div>
        ) : (
          <span className={cx("lesson-title_name")}>
            {editedTitleLesson}
          </span>
        )}
        <div className={cx("lesson-btnContainer")}>
          <button className={cx("lesson-btn-edit", "lesson-btn")} onClick={handleEditClick}>
            <FiEdit2 className={cx("lesson-title_icon")} />
          </button>
          <button className={cx("lesson-btn-delete", "lesson-btn")} onClick={() => setOpenModalDelete(true)}>
            <FiTrash className={cx("lesson-title_icon")} />
          </button>
        </div>
        <button
          className={cx("lesson-btn-chevron", "lesson-btn")}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <FiChevronUp className={cx("lesson-title_icon")} />
          ) : (
            <FiChevronDown className={cx("lesson-title_icon")} />
          )}
        </button>
      </div>
      <div className={cx("lesson-lecture-list", { "list-expanded": isExpanded })}>
        {isDataAvailable &&
          allItems
            .sort((a, b) => new Date(a.CreateAt) - new Date(b.CreateAt))
            .map((item, index) => (
              <LectureItem
                key={item.DocumentId || item.VideoId}
                data={item}
                lectureNumber={index + 1}
                dataType={item.DocumentId ? "Document" : "Video"}
              />
            ))}
            <div>
            {showDefaultLecture && createDefaultLecture()} {/* Hiển thị lecture mặc định khi showDefaultLecture là true */}
            </div>
        <div className={cx("lesson-add-lecture")}>
          <button className={cx("btn-add-lecture")} onClick={()=>{showLectureItemDefault()}}>
            <FiPlus className={cx("btn-add_icon")} />
            Add lecture
          </button>
        </div>
      </div>
      <ModalDeleteLessonItem data={data} open={openModalDelete} onClose={() => setOpenModalDelete(false)}/>
    </div>
  );
};

export default LessonItem;
