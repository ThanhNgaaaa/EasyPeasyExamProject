import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CreateVideo.module.scss";
import { FiChevronLeft, FiInfo, FiUpload } from "react-icons/fi";
import images from "../../../assets/images";
import { Link, useNavigate, useParams } from "react-router-dom";
import routes from "../../../config/routes";
import axios from "axios";
import { Flip, ToastContainer, toast } from "react-toastify";
const cx = classNames.bind(styles);
function CreateVideo() {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const { LessonId } = useParams();
  const [CourseId, setCourseId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://localhost:7121/api/Lessons/${LessonId}`)
      .then((response) => response.json())
      .then((data) => {
        // window.location.reload();
        
        console.log(data);
        setCourseId(data.CourseId);

        // Điền các giá trị khóa học vào các trường đầu vào
        
      });
  }, [LessonId]);
  console.log(LessonId);
  const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0");
const day = String(now.getDate()).padStart(2, "0");
const hours = String(now.getHours()).padStart(2, "0");
const minutes = String(now.getMinutes()).padStart(2, "0");
const seconds = String(now.getSeconds()).padStart(2, "0");

const createAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const postVideo = async () => {
    try {
      const response = await axios.post("https://localhost:7121/api/Video", {
        Title: videoTitle,
        VideoUrl: videoUrl,
        LessonId: LessonId,
        CreateAt:createAt
      });
      toast.success("Update Successfully", {
        position: "top-center",
        transition: Flip,
        autoClose: 2000,
      });
      console.log("Video posted successfully:", response.data);
      // navigate(`${routes.createLesson}/${courseId}`);
    } catch (error) {
      toast.error("video hasn't been saved", {
        position: "top-center",
        transition: Flip,
      });
      console.error("Error posting video:", error);
    }
  };
  return (
    
    <div className={cx("wrapper")}>
      <ToastContainer/>
      <div className={cx("header")}>
        <Link to={`${routes.createLessonStudent}/${CourseId}`} className={cx("btn-back")}>
          <FiChevronLeft className={cx("btn-back_icon")} />
        </Link>
        <span>My Lesson</span>
      </div>
      <div className={cx("container")}>
        <h3 className={cx("video-info_text")}>Video infomation</h3>
        <div className={cx("video-field")}>
          <span className={cx("video-field_text")}>Title</span>
          <input
            type="text"
            className={cx("video-field_input")}
            placeholder="Video Title"
            required
            onChange={(e)=>setVideoTitle(e.target.value)}
          />
          <small className={cx("video-field_notifi")}>
            <FiInfo className={cx("video-field_icon")} />
            Title should be 30 characters.
          </small>
        </div>
        <div className={cx("video-field")}>
          <span className={cx("video-field_text")}>Video</span>
          <div className={cx("video-field_thumbnail")}>
            <div className={cx("upload-area")}>
              <div className={cx("browse-file-wrapper")}>
                <input
                  name="createinputfile"
                  id="createinputfile"
                  type="file"
                  className={cx("input-file")}
                  accept="video/mp4,video/x-m4v,video/*"
                />
                <img
                  src={images.videoThumbnail}
                  alt="video Thumbnail"
                  className={cx("thumbnail-image")}
                />
                <div className={cx("upload-title")}>
                  <FiUpload className={cx("upload-icon")} />
                  <span>Choose a file</span>
                </div>
              </div>
            </div>
          </div>
          <input
            className={cx("video-field_input")}
            type="text"
            id="videoUrl"
            placeholder="Youtube video Url"
            required
            onChange={(e)=>setVideoUrl(e.target.value)}
          />
        </div>
      </div>
      <div className={cx("btnContainer")}>
        <button onClick={postVideo} className={cx("btn-save")}>Save</button>
      </div>
    </div>
  );
}

export default CreateVideo;
