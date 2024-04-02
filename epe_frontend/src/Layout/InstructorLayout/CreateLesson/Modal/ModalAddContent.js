import React from "react";
import classNames from "classnames/bind";
import styles from "./ModalAddContent.module.scss";
import images from "../../../../assets/images";
import { Link } from "react-router-dom";
import routes from "../../../../config/routes";
const cx = classNames.bind(styles);
const ModalAddContent = ({lessonId, open, onClose }) => {
  if (!open) return null;
  console.log(lessonId);
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
            <p className={cx("modalsubHeader")}>Add your content</p>
            <p className={cx("closeBtn")} onClick={onClose}>
              X
            </p>
          </div>

          <div className={cx("btnContainer")}>
            <Link to={`${routes.createVideo}/${lessonId}`} className={cx("btnVideo")}>
              <img src={images.videoTypeIcon} alt="Video" className={cx("btn_img")} />
              <span className={cx("bold")}>Video</span>
            </Link>
            <Link to={`http://localhost:3000/createDocument/${lessonId}`} className={cx("btnText")}>
              <img src={images.textIcon} alt="Text" className={cx("btn_img")} />
              <span className={cx("bold")}>Text</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddContent;
