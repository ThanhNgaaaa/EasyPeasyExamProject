import React from "react";
import classNames from "classnames/bind";
import styles from "./ModalDelete.module.scss";
import axios from "axios";
const cx = classNames.bind(styles);
const ModalDelete = ({ open, onClose, data, dataType}) => {
  if (!open) return null;
  const handleOnClickDelete = () => {
    if (dataType === "Document") {
      axios
        .delete(`https://localhost:7121/api/Document/${data.DocumentId}`)
        .then(() => {
          window.location.reload();
          onClose();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .delete(`https://localhost:7121/api/Video/${data.VideoId}`)
        .then(() => {
          window.location.reload();
          onClose();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <div onClick={onClose} className={cx("overlay")}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cx("modalContainer")}
      >
        <div className={cx("modalContent")}>
          <div>
            <p className={cx("modalsubHeader")}>Do you want to delete `Color` Flashcard ???</p>
            <p className={cx("closeBtn")} onClick={onClose}>
              X
            </p>
          </div>

          <div className={cx("btnContainer")}>
            <button className={cx("btnOk")} onClick={handleOnClickDelete}>
              <span className={cx("bold")}>OK</span>
            </button>
            <button className={cx("btnCancel")} onClick={onClose}>
              <span className={cx("bold")}>Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
