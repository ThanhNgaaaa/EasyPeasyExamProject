import React from "react";
import classNames from "classnames/bind";
import styles from "./VideoItem.module.scss";
import { FiArrowLeft, FiX } from "react-icons/fi";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import routes from "../../../config/routes";
const cx = classNames.bind(styles);
const VideoItem = ({ data }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("lesson-top-bar")}>
        <div className={cx("lesson-top-left")}>
          <div className={cx("lesson-toggle")}>
          {/* to={`${routes.courseDetail}/${data.CourseId}`} */}
            <Link   className={cx("lesson-btn-back")}>
              <FiArrowLeft className={cx("lesson-back-icon")} />
            </Link>
            <h4 className={cx("video-title")}>{data.Title}</h4>
          </div>
        </div>
      </div>
      <div className={cx("inner")}>
        <div className={cx("video")}>
          <ReactPlayer
            className={cx("video-container")}
            width="100%"
            height="450px"
            controls={true}
            url={data.VideoUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
