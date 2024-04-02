import React from "react";
import classNames from "classnames/bind";
import styles from "./UpdateCourse.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import routes from "../../../config/routes";
import Box from "../../components/Box/Box";
import { FiInfo, FiUpload } from "react-icons/fi";
import axios from "axios";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useState } from "react";
const cx = classNames.bind(styles);
const defaultImageSrc = "/image/thumbnail-placeholder.png";
const initialFieldValues = {
  courseName: "",
  courseDescription: "",
  courseImage: "",
  courseImageSrc: defaultImageSrc,
  createDate: "",
  imageFile: null,
  categoryId: "1",
  courseId: "",
};
const UpdateCourse = () => {
  const [values, setValues] = useState(initialFieldValues);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState({});
  const [userId, setUserId] = useState("");
  const { CourseId } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`https://localhost:7121/api/Courses/${CourseId}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
        console.log(data);
        // Điền các giá trị khóa học vào các trường đầu vào
        setValues({
          courseName: data.CourseName,
          courseDescription: data.CourseDescription,
          courseImage: data.CourseImage,
          courseImageSrc: data.ImageSrc || defaultImageSrc,
          createDate: data.CreateDate,
          imageFile: null,
          categoryId: data.CategoryId,
          courseId: data.CourseId,
        });
      });
  }, [CourseId]);
  console.log(values);
  useEffect(() => {
    let token = localStorage.getItem("jwtToken");
    if (!token) {
      setUserId("");
      return;
    }
    const decodedToken = jwtDecode(token);
    if (!decodedToken || !decodedToken.userID) {
      setUserId("");
      return;
    }
    setUserId(decodedToken.userID);
    console.log(userId);
  });
  useEffect(() => {
    axios
      .get("https://localhost:7121/api/Category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleInputChangeCa = (event) => {
    const value = event.target.value;
    console.log(value);
  };
  const showPrerview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          courseImageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        courseImageSrc: defaultImageSrc,
      });
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("CourseName", values.courseName);
    formData.append("CourseDescription", values.courseDescription);
    formData.append("CourseImage", values.courseImage);
    formData.append("ImageFile", values.imageFile);
    formData.append("CategoryId", values.categoryId);
    formData.append("InstructorId", userId);
    formData.append("CourseId", CourseId);
    console.log(formData);
    axios
      .put(`https://localhost:7121/api/Courses/${CourseId}`, formData)
      .then((response) => {
        console.log(response.data);
        navigate(routes.coursesInstructor);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={cx("wrapper")}>
      <Box className={cx("container")}>
        <h3 className={cx("course-info_text")}>Course Infomation</h3>

        <form onSubmit={handleFormSubmit}>
          <div className={cx("content")}>
            <div className={cx("course-field")}>
              <span className={cx("course-field_text")}>Course Title</span>
              <input
                type="text"
                name="courseName"
                className={cx("course-field_input")}
                placeholder="Course Title"
                value={values.courseName}
                onChange={handleInputChange}
              />
            </div>
            <div className={cx("course-field")}>
              <span className={cx("course-field_text")}>Course Description</span>
              <textarea
                type="text"
                name="courseDescription"
                className={cx("course-field_input")}
                placeholder="Course Description"
                value={values.courseDescription}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className={cx("course-field")}>
              <span className={cx("course-field_text")}>Course Thumbnail</span>
              <div className={cx("course-field_thumbnail")}>
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
                    <img
                      src={values.courseImageSrc}
                      alt="Course Thumbnail"
                      className={cx("thumbnail-image")}
                    />
                    <div className={cx("upload-title")}>
                      <FiUpload className={cx("upload-icon")} />
                      <span>Choose a file</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("course-field")}>
              <span className={cx("course-field_text")}>Course Category</span>
              <select
                name="categoryId"
                className={cx("select-cate")}
                value={values.categoryId}
                onChange={handleInputChangeCa}
              >
                {categories.map((category) => (
                  <option key={category.CategoryId} value={category.CategoryId}>
                    {category.CategoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={cx("actions")}>
            <Link to={routes.coursesInstructor} className={cx("btn-exit")}>
              EXIT
            </Link>
            <button type="submit" className={cx("btn-next")}>
              UPDATE
            </button>
            {/* to={routes.createLesson} */}
          </div>
        </form>
      </Box>
    </div>
  );
};

export default UpdateCourse;
