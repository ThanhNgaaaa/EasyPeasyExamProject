import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Flashcard.module.scss";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import routes from "../../../config/routes";
import ModalDelete from "./ModalDelete/ModalDelete";
const cx = classNames.bind(styles);
const FlashcardItem = ({ data }) => {
  const [openModalDelete,setOpenModalDelete] = useState(false);
  // const onDeleteCourse = (e, id) => {
  //   e.stopPropagation();
  //   if (window.confirm("Are you sure you want to delete this ?"))
  //     fetch(`https://localhost:7121/api/Courses/${id}`, {
  //       method: "DELETE",
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           window.location.reload();
  //         } else {
  //           // Xóa khóa học thất bại
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Lỗi:", error);
  //       });
  // };
  return (
    <div className={cx("fc-item")}>
      <Link to={`${routes.flashcardDetail}/${data.Id}`} className={cx("fc-item-content")}>
        {/* <img src={data.ImageSrc} className={cx("course-item-image")} alt="Course" /> */}
        <div className={cx("info")}>
          <span className={cx("name")}>{data.TopicName}</span>
        </div>
      </Link>
      <div className={cx("action")}>
        <button
          className={cx("action-link")}
          onClick={(e) => setOpenModalDelete(true)}
        >
          <FiTrash2 className={cx("icon")} />
          Delete
        </button>
      </div>
      <ModalDelete  open={openModalDelete} onClose={() => setOpenModalDelete(false)}/>
    </div>
  );
};

export default FlashcardItem;
