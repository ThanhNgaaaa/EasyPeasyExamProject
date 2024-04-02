import React, { useEffect, useState } from "react";
import styles from "./UpdateDocument.module.scss";
import classNames from "classnames/bind";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "../../../components/EditorToolbar/EditorToolbar";
import { Link, useParams } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import axios from "axios";
import { Flip, ToastContainer, toast } from "react-toastify";
import routes from "../../../config/routes";

const cx = classNames.bind(styles);
const UpdateDocument = () => {
  const [value, setValue] = useState("");
  const [document, setDocument] = useState({});
  const {DocumentId} = useParams();
  const [title, setTitle]= useState("");
  const [courseId, setCourseId]= useState("");
  useEffect(() => {
    fetch(`https://localhost:7121/api/Document/${DocumentId}`)
      .then((response) => response.json())
      .then((data) => {
        setDocument(data);
        setValue(data.Content);
        setTitle(data.Title);
        console.log(data);
        
        // Sau khi lấy document, tiến hành lấy courseId
        fetch(`https://localhost:7121/api/Lessons/${data.LessonId}`)
          .then((response) => response.json())
          .then((lessonData) => {
            console.log(lessonData);
            setCourseId(lessonData.CourseId);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const createAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const handleUpdate = async () => {
    const updatedDocument = {
      ...document,
      CreateAt: createAt,
      content: value // Cập nhật giá trị mới từ ReactQuill
    };

    await axios
        .put(`https://localhost:7121/api/Document/${DocumentId}`, updatedDocument)
        .then((response) => {
          console.log(response.data);
          toast.success("Update Successfully", {
            position: "top-center",
            transition: Flip,
            autoClose: 2000,
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Document hasn't been saved", {
            position: "top-center",
            transition: Flip,
          });
        });
  };
  return (
    <div className={cx("wrapper")}>
      <ToastContainer/>
      <div className={cx("header")}>
        <Link to={`${routes.createLessonStudent}/${courseId}`}  className={cx("btn-back")}>
        
          <FiChevronLeft className={cx("btn-back_icon")} />
          <span>Back to lesson</span>
        </Link>
        <span className={cx("document-title")}>{title}</span>
      </div>
      <div className={cx("container")}>
        <div className={cx("app-content")}>
          <div className={cx("content")}>
            <EditorToolbar toolbarId={"t1"} className={cx("toolbar")} />
            <ReactQuill
              className={cx("editor-toolbar")}
              theme="snow"
              placeholder="Enter text..."
              value={value}
              onChange={setValue}
              modules={modules("t1")}
              formats={formats}
            />{" "}
          </div>
          <div className={cx("btnContainer")}>
            <button className={cx("btn-save")} onClick={handleUpdate}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDocument;
