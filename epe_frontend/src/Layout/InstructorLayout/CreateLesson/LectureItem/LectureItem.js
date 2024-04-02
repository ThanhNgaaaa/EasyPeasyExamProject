import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "../CreateLesson.module.scss";
import { FiEdit2, FiFileText, FiPlayCircle, FiPlus, FiTrash } from "react-icons/fi";
import ModalAddContent from "../Modal/ModalAddContent";
import axios from "axios";
import { Link } from "react-router-dom";
import routes from "../../../../config/routes";
import ModalDeleteLecture from "../Modal/ModalDeleteLecture/ModalDeleteLecture";

const cx = classNames.bind(styles);
const LectureItem = ({ data, dataType, lectureNumber }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitleLecture, setEditedTitleLecture] = useState(data.Title);
  const [lectureRoute,setLectureRoute]= useState(dataType);
  const [openModalDelete,setOpenModalDelete] = useState(false);
  const handelEditingClick = () => {
    setIsEditing(true);
  };
  const handleEditClickCancel = () => {
    setIsEditing(false);
  };
  const handelSaveEditLessonTitle = async () => {
    try {
      var editedData = {};
      if (dataType === "Document") {
        editedData = {
          DocumentId: data.DocumentId,
          Title: editedTitleLecture,
          LessonId: data.LessonId,
        };
        await axios
        .put(`https://localhost:7121/api/${dataType}/${data.DocumentId}`, editedData)
        .then((response) => {
          console.log(response.data);
          setIsEditing(false);
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        editedData = {
          VideoId: data.VideoId,
          Title: editedTitleLecture,
          LessonId: data.LessonId,
        };
        await axios
        .put(`https://localhost:7121/api/${dataType}/${data.VideoId}`, editedData)
        .then((response) => {
          console.log(response.data);
          setIsEditing(false);
        })
        .catch((error) => {
          console.log(error);
        });
      }

      console.log(editedData);
      
    } catch (err) {
      console.log(err);
    }
  };
  const getIconForDataType = (dataType) => {
    switch (dataType) {
      case "Document":
        return <FiFileText className={cx("lecture-title_icon")} />;
      case "Video":
        return <FiPlayCircle className={cx("lecture-title_icon")} />;
      default:
        return null;
    }

  };
  console.log(data);
  return (
    <div className={cx("lecture-item")}>
      <div className={cx("lecture-item-content")}>
        <div className={cx("lecture-item-title")}>
          <span className={cx("lecture-item_span")}>Lecture {lectureNumber}:</span>
          {getIconForDataType(dataType)}

          {isEditing ? ( // Kiểm tra trạng thái isEditing để xác định xem có hiển thị <input> hay <span>
            <div className={cx("editLectureContainer")}>
              <input
                className={cx("lesson-title_name", "lecture-title_input")} // Sử dụng className mới cho <input>
                value={editedTitleLecture}
                onChange={(e) => {
                  setEditedTitleLecture(e.target.value);
                }}
              />
              <button
                className={cx("btn-edit-lecture", "btn-edit-cancel")}
                onClick={handleEditClickCancel}
              >
                <span>Cancel</span>
              </button>
              <button className={cx("btn-edit-lecture")} onClick={handelSaveEditLessonTitle}>
                <span>Save</span>
              </button>
            </div>
          ) : (
            
            <Link to={dataType === 'Document' ? `${routes.updateDocument}/${data.DocumentId}` : `${routes.videoDetail}/${data.VideoId}`}  className={cx("lecture-item_name")}>
              {editedTitleLecture}
            </Link>
          )}
          <div className={cx("lecture-btnContainer")}>
            <button className={cx("lecture-item-btn-edit", "lecture-item-btn")}>
              <FiEdit2 className={cx("lecture-item-title_icon")} onClick={handelEditingClick} />
            </button>
            <button className={cx("lecture-item-btn-delete", "lecture-item-btn")} onClick={() => setOpenModalDelete(true)}>
              <FiTrash className={cx("lecture-item-title_icon")} />
            </button>
          </div>
          {data.LectureId !== -1 ? null : (
          <button className={cx("btn-add-content")} onClick={() => setOpenModal(true)}>
            <FiPlus className={cx("btn-add_icon")} />
            Add content
          </button>
        )}
        </div>
        
      </div>
      <ModalAddContent lessonId={data.LessonId} open={openModal} onClose={() => setOpenModal(false)} />
      <ModalDeleteLecture data={data} dataType={dataType} open={openModalDelete} onClose={() => setOpenModalDelete(false)}/>
    </div>
  );
};

export default LectureItem;
