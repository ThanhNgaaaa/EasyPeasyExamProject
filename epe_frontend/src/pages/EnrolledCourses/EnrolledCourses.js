import React from 'react'
import Box from "../../Layout/components/Box/Box";
// import { Link } from "react-router-dom";
// import routesConfig from "../../config/routes";
import classNames from "classnames/bind";
import styles from "./EnrolledCourses.module.scss";
// import images from "../../assets/images";
const cx = classNames.bind(styles);

const EnrolledCourses = () => {
  return (
    <div className={cx('wrapper')}>
        <Box>
            <h3>Enrolled Courses</h3>
            {/* <Course/> */}
        </Box>
    </div>
  )
}

export default EnrolledCourses