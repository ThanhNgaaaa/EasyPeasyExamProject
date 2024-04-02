import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "../CreateFlashCard.module.scss";
import { FiChevronDown, FiChevronUp, FiEdit, FiEdit2, FiTrash } from "react-icons/fi";
import axios from "axios";
const cx = classNames.bind(styles);
const FlashcardItem = ({ data, onUpdateNewFlashcard,onDeleteFlashcard }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDisplayButton, setIsDisplayButton] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleInputChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "content") {
      setContent(e.target.value);
    }
  };
  const handleCancel = () => {
    onDeleteFlashcard(data.Id); 
    setIsEditing(false);
    setIsDisplayButton(false);
  };
  const handleSave = () => {
    onUpdateNewFlashcard({
      ...data,
      Title: title,
      Content: content,
    });
    setIsEditing(false);
    setIsExpanded(!isExpanded);
    setIsDisplayButton(false);
  };
  return (
    <div className={cx("fc-item")}>
      <div className={cx("fc-item_title")}>
        {isEditing ? (
            <input
              name="title"
              required
              className={cx("topic_name", "input_create")}
              value={title}
              onChange={handleInputChange}
              placeholder="New flashcard title"
            />
        ) : (
          <span>{title}</span>
        )}
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
             <input
             required
             className={cx("topic_name", "input_create")}
             value={content}
             name="content"
             onChange={handleInputChange}
             placeholder="New flashcard content"
           />
        ) : (
          <span>{content}</span>
        )}
        
      </div>
      {isDisplayButton && (
        <div className={cx("editContainer", { "listbtn-notexpanded": isExpanded })}>
          <button
            className={cx("btn-edit-topic", "btn-edit-cancel")}
            onClick={handleCancel}
          >
            <span>Cancel</span>
          </button>
          <button className={cx("btn-edit-topic")} onClick={handleSave}>
            <span>Save</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FlashcardItem;
