import React from "react";
import styles from "./VideoDetail.module.scss";
import classNames from "classnames/bind";
import { Flip, ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import routes from "../../../config/routes";
import { FiChevronLeft, FiPlus } from "react-icons/fi";
import ReactPlayer from "react-player";

const cx = classNames.bind(styles);
const VideoDetail = () => {
  return (
    <div className={cx("wrapper")}>
      <ToastContainer />
      <div className={cx("header")}>
        <Link to={`${routes.createLessonStudent}`} className={cx("btn-back")}>
          <FiChevronLeft className={cx("btn-back_icon")} />
          <span>Back to lesson</span>
        </Link>
        <span className={cx("document-title")}>English sentence structure - English grammar lesson</span>
      </div>
      <div className={cx("container")}>
        <div className={cx("app-content")}>
          <div className={cx("lesson-subheader")}>Video Infomation</div>
          <div className={cx("content")}>
            <div className={cx("inner")}>
              <span>Video:</span>
              <div className={cx("video")}>
                <ReactPlayer
                  className={cx("video-container")}
                  width="50%"
                  height="250px"
                  controls={true}
                  url="https://www.youtube.com/watch?v=jul2urONzOQ&list=PLD6t6ckHsruY_i7_rZhKcRBmXDdawiqUM"
                />
              </div>
            </div>
            <div className={cx("video-item")}>
              <span>Url:</span>
              <input
                type="text"
                name="videoName"
                className={cx("video-field_input")}
                placeholder="video Title"
                value="https://www.youtube.com/watch?v=jul2urONzOQ&list=PLD6t6ckHsruY_i7_rZhKcRBmXDdawiqUM"
                // onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <button className={cx("btn-add-content")}>
                <FiPlus className={cx("btn-add_icon")} />
                Add Description
              </button>
            </div>
          </div>
          <div className={cx("lesson-submit")}>
          <button className={cx("btn-save")}>Save</button>
        </div>
        </div>
       
      </div>
    </div>
  );
};

export default VideoDetail;
