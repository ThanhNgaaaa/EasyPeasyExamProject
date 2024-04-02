import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "../FlashCardDetail.module.scss";
import { FiChevronDown, FiChevronUp, FiEdit, FiEdit2, FiTrash } from "react-icons/fi";
import axios from "axios";
const cx = classNames.bind(styles);
const FlashcardItem = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [Id, setId] = useState(data.Id);
  const [editedTitle, setEditedTitle] = useState(data.Title);
  const [editedContent, setEditedContent] = useState(data.Content);
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const createAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const handelEditingClick = () => {
    setIsEditing(true);
  };
  const handleEditClickCancel = () => {
    setEditedTitle(data.Title);
    setEditedContent(data.Content);
    setIsEditing(false);
  };
  const handleSaveEdit = async () => {
    try {
      var editedData = {
        Id: Id,
        Title: editedTitle,
        CreatedDate: createAt,
        TopicId: data.TopicId,
        Content: editedContent,
      };
      console.log(editedData);

      await axios
        .put(`https://localhost:7121/api/Flashcard/${Id}`, editedData)
        .then((response) => {
          console.log(response.data);
          setIsEditing(false);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={cx("fc-item")}>
      <div className={cx("fc-item_title")}>
      {isEditing ? ( 
            <div className={cx("editLectureContainer")}>
              <input
                className={cx("lesson-title_name", "lecture-title_input")} 
                value={editedTitle}
                onChange={(e) => {
                  setEditedTitle(e.target.value);
                }}
              />
              <button
                className={cx("btn-edit-lecture", "btn-edit-cancel")}
                onClick={handleEditClickCancel}
              >
                <span>Cancel</span>
              </button>
              <button className={cx("btn-edit-lecture")} onClick={handleSaveEdit}>
                <span>Save</span>
              </button>
            </div>
          ) : (
            
            <span>{editedTitle}</span>
          )}
        
        <div className={cx("fc-action")}>
          <button className={cx("fc-edit_title")} onClick={handelEditingClick}>
            <FiEdit2 className={cx("fc-edit_icon")} />
          </button>
          <button className={cx("fc-delete_title")}>
            <FiTrash className={cx("fc-delete_icon")} />
          </button>
        </div>
        <button className={cx("fc-chevron_btn")} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <FiChevronDown className={cx("fc-item_Chevron_icon")} />
          ) : (
            <FiChevronUp className={cx("fc-item_Chevron_icon")} />
          )}
        </button>
      </div>
      <div className={cx("fc-item_content", { "list-notexpanded": isExpanded })}>
      {isEditing ? ( 
            <div className={cx("editLectureContainer")}>
              <input
                className={cx("lesson-title_name", "lecture-title_input")} 
                value={editedContent}
                onChange={(e) => {
                  setEditedContent(e.target.value);
                }}
              />
            </div>
          ) : (
            
            <span>{editedContent}</span>
          )}
        {/* <div className={cx("fc-action_content")}>
          <button className={cx("fc-edit_content")}>
            <FiEdit className={cx("fc-edit_contentIcon")} />
          </button>
          <button className={cx("fc-delete_content")}>
            <FiTrash className={cx("fc-delete_contentIcon")} />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default FlashcardItem;
