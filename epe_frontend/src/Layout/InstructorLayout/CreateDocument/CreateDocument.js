import React, { Component, useEffect, useState } from "react";
import styles from "./CreateDocument.module.scss";
import classNames from "classnames/bind";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "../../../components/EditorToolbar/EditorToolbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiChevronLeft, FiInfo } from "react-icons/fi";
import { Flip, ToastContainer, toast } from "react-toastify";
import axios from "axios";
import routes from "../../../config/routes";

const cx = classNames.bind(styles);
const CreateDocument = () => {
  const [value, setValue] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");
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
  console.log(CourseId);
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const createAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const postDocument = async () => {
    try {
      var newDocument={
        Title: documentTitle,
        Content: value,
        LessonId: LessonId,
        CreateAt: createAt,
      };
      const response = await axios.post("https://localhost:7121/api/Document", newDocument);
      toast.success("Update Successfully", {
        position: "top-center",
        transition: Flip,
        autoClose: 2000,
      });
      console.log("Document posted successfully:", response.data);
      // navigate(`${routes.createLesson}/${CourseId}`);
    } catch (error) {
      toast.error("Document hasn't been saved", {
        position: "top-center",
        transition: Flip,
      });
      console.error("Error posting Document:", error);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <ToastContainer/>
      <div className={cx("header")}>
        <Link to={`${routes.createLesson}/${CourseId}`} className={cx("btn-back")}>
          <FiChevronLeft className={cx("btn-back_icon")} />
        </Link>
        <span>My Lesson</span>
      </div>
      <div className={cx("container")}>
        <div className={cx("app-content")}>
          <div className={cx("content")}>
            <div className={cx("document-field")}>
              <span className={cx("document-field_text")}>Title</span>
              <input
                type="text"
                className={cx("document-field_input")}
                placeholder="Document Title"
                required
                onChange={(e) => setDocumentTitle(e.target.value)}
              />
              <small className={cx("video-field_notifi")}>
                <FiInfo className={cx("video-field_icon")} />
                Title should be 30 characters.
              </small>
            </div>
            <div className={cx("document-field")}>
              <span className={cx("document-field_text")}>Content</span>
              <EditorToolbar toolbarId={"t1"} className={cx("toolbar")} />
              <ReactQuill
                className={cx("editor-toolbar")}
                theme="snow"
                placeholder="Enter text..."
                value={value}
                onChange={setValue}
                modules={modules("t1")}
                formats={formats}
              />
            </div>
          </div>
          <div className={cx("btnContainer")}>
            <button onClick={postDocument} className={cx("btn-save")}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateDocument;
