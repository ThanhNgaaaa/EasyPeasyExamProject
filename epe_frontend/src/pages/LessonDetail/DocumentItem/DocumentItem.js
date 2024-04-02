import React from "react";
import classNames from "classnames/bind";
import styles from "../VideoItem/VideoItem.module.scss";
import routes from "../../../config/routes";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ReactQuill from "react-quill";
const cx = classNames.bind(styles);
const DocumentItem = ({ data }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("lesson-top-bar")}>
        <div className={cx("lesson-top-left")}>
          <div className={cx("lesson-toggle")}>
            {/* to={`${routes.courseDetail}/${data.CourseId}`} */}
            <Link className={cx("lesson-btn-back")}>
              <FiArrowLeft className={cx("lesson-back-icon")} />
            </Link>
            <h4 className={cx("video-title")}>{data.Title}</h4>
          </div>
        </div>
      </div>
      <div className={cx("inner")}>
        <ReactQuill value={data.Content} readOnly={true} theme={"bubble"} />
      </div>
    </div>
  );
};

export default DocumentItem;
