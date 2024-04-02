import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./CreateCourse.module.scss";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../../config/routes";
import Box from "../../components/Box/Box";
import { FiInfo, FiUpload } from "react-icons/fi";
import axios from "axios";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
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
};

const CreateCourse = () => {
  const [values, setValues] = useState(initialFieldValues);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState({});
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(value);
  };
  const handleInputChangeCa = (event) => {
    const value = event.target.value;
    setValues((prevValues) => ({
      ...prevValues,
      categoryId: value,
    }));
    console.log(value);
    // giá trị của categoryId sẽ được in ra console
    // sau đó bạn có thể thực hiện các thao tác với giá trị này
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
  const validate = () => {
    let temp = {};
    temp.courseName = values.courseName == "" ? false : true;
    temp.courseImageSrc = values.courseImageSrc == defaultImageSrc ? false : true;
    setError(temp);
    return Object.values(temp).every((x) => x == true);
  };
  const resetData = () => {
    setValues(initialFieldValues);
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

    axios
      .post("https://localhost:7121/api/Courses", formData)
      .then((response) => {
        console.log(response.data);
        const courseId = response.data.CourseId;
        navigate(`${routes.createLesson}/${courseId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // onClick={createCourse}
  
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
                required
                onInvalid="setCustomValidity()"
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
                required
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
                      required
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
              NEXT
            </button>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default CreateCourse;
