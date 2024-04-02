import React from "react";
import classNames from "classnames/bind";
import styles from "./CreateExam.module.scss";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../../config/routes";
import Box from "../../components/Box/Box";
import axios from "axios";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
const cx = classNames.bind(styles);
const defaultImageSrc = "/image/thumbnail-placeholder.png";

const CreateExam = () => {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [duration, setDuration] = useState("900");
  const [examImage, setExamImage] = useState("");
  const [examImageSrc, setExamImageSrc] = useState(defaultImageSrc);
  const [imageFile, setImageFile] = useState(null);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("jwtToken");
    if (!token) {
      setUserId("");
      return;
    }
    const decodedToken = jwtDecode(token);
    if (!decodedToken || !decodedToken.username) {
      setUserId("");
      return;
    }
    setUserId(decodedToken.userID);
  });
  const showPrerview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImageFile(imageFile, x);
        setExamImageSrc(x.target.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImageFile(null);
      setExamImageSrc(defaultImageSrc);
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Title", title);
    formData.append("ExamDescription", des);
    formData.append("ExamImage", examImage);
    formData.append("ImageFile", imageFile);
    formData.append("Duration", duration);
    formData.append("InstructorId", userId);

    console.log(title);
    console.log(des);
    console.log(duration);
    console.log(imageFile);
    console.log(examImage);
    console.log(examImageSrc);
    axios
      .post("https://localhost:7121/api/Exams", formData)
      .then((response) => {
        console.log(response.data.ExamId);
        const examId = response.data.ExamId;
        navigate(`${routes.quizDetail}/${examId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={cx("wrapper")}>
      <Box className={cx("container")}>
        <h3 className={cx("exam-info_text")}>Quiz Infomation</h3>

        <form onSubmit={handleFormSubmit}>
          <div className={cx("content")}>
            <div className={cx("exam-field")}>
              <span className={cx("exam-field_text")}>Quiz Title</span>
              <input
                type="text"
                name="quizTitle"
                className={cx("exam-field_input")}
                placeholder="Quiz Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className={cx("exam-field")}>
              <span className={cx("exam-field_text")}>Quiz Description</span>
              <textarea
                type="text"
                name="quizDescription"
                className={cx("exam-field_input")}
                placeholder="Quiz Description"
                value={des}
                onChange={(e) => setDes(e.target.value)}
              ></textarea>
            </div>
            <div className={cx("exam-field")}>
              <span className={cx("exam-field_text")}>Duration</span>
              <select
                name="duration"
                className={cx("exam-field_input")}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="900">15 minutes</option>
                <option value="450">30 minutes</option>
                <option value="3600">60 minutes</option>
                <option value="5400">90 minutes</option>
              </select>
            </div>
          </div>
          <div className={cx("exam-field")}>
            <span className={cx("exam-field_text")}>Exam Thumbnail</span>
            <div className={cx("exam-field_thumbnail")}>
              <div className={cx("upload-area")}>
                <div className={cx("browse-file-wrapper")}>
                  <input
                    name="createinputfile"
                    id="createinputfile"
                    type="file"
                    className={cx("input-file")}
                    accept="image/*"
                    onChange={showPrerview}
                  />
                  <img src={examImageSrc} alt="exam Thumbnail" className={cx("thumbnail-image")} />
                  <div className={cx("upload-title")}>
                    <FiUpload className={cx("upload-icon")} />
                    <span>Choose a file</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("actions")}>
            <Link to={routes.quizzesInstructor} className={cx("btn-exit")}>
              EXIT
            </Link>
            <button type="submit" className={cx("btn-save")}>
              SAVE
            </button>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default CreateExam;
