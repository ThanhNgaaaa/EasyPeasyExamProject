
import React from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import images from "../../assets/images";
import icon1 from "../../assets/Icons/icons-01.png";
import icon2 from "../../assets/Icons/icons-02.png";
import icon3 from "../../assets/Icons/icons-03.png";
import icon4 from "../../assets/Icons/icons-04.png";
import book from "../../assets/images/about_img/book64.png";
import learning from "../../assets/images/about_img/learning.png";
import creative from "../../assets/images/about_img/creative48.png";
import quiz from "../../assets/images/about_img/quiz64.png";
import Button from "../../Layout/components/Button/Button";
import routesConfig from "../../config/routes";
import Course from "../Courses/Course";




const cx = classNames.bind(styles);

const Home = () => {
  return (
    
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {/* Header */}

        <div className={cx("banner")}>
          <div className={cx("col-6")}>
            <div className={cx("inner")}>
              <h1 className={cx("title")}>
                Have your dream site in minutes
                <br />
                for
                <span className={cx("slide")}>
                  <span className={cx("words-wrapper")}>
                    <b className={cx("theme-gradient is-hidden")}>Online Course.</b>
                  </span>
                </span>
                <Button primary to={routesConfig.login} className={cx("btn-get-started")}>
                  Get Started
                </Button>
              </h1>
              <p className={cx("description")}>
                The most <strong>powerful</strong> tool in the world is
                <strong> knowledge. </strong>
              </p>
            </div>
          </div>
          <div className={cx("col-6")}>
            <div className={cx("video-popup-wrapper")}>
              <img src={images.bannerGroup} alt="Banner Group" className={cx("banner-image")} />
            </div>
          </div>
          <div className={cx("shape-wrapper")}>
            <div className={cx("shape-image", "shape-1")}>
              <img src={images.shapeBanner1} alt="Shape Images" />
            </div>
            <div className={cx("shape-image", "shape-2")}>
              <img src={images.shapeBanner2} alt="Shape Images" />
            </div>
            <div className={cx("shape-image", "shape-3")}>
              <img src={images.shapeBanner3} alt="Shape Images" />
            </div>
          </div>
        </div>
        <div className={cx("service-wrapper", "row")}>
          <div className={cx("service")}>
            <div className={cx("service-item")}>
              <div className={cx("service-icon")}>
                <img src={icon1} alt="Service" className={cx("service-icon-image")} />
              </div>
              <div className={cx("service-content")}>
                <h2 className={cx("title")}>Fast Performance</h2>
                <p>
                  Optimized for a smaller build size, faster dev compilation and dozens of other
                  improvements.
                </p>
              </div>
            </div>
            <div className={cx("service-item")}>
              <div className={cx("service-icon")}>
                <img src={icon2} alt="Service" className={cx("service-icon-image")} />
              </div>
              <div className={cx("service-content")}>
                <h2 className={cx("title")}>Perfect Responsive</h2>
                <p>
                  Our template is full perfect for all device. You can visit our template all device
                  easily.
                </p>
              </div>
            </div>
            <div className={cx("service-item")}>
              <div className={cx("service-icon")}>
                <img src={icon3} alt="Service" className={cx("service-icon-image")} />
              </div>
              <div className={cx("service-content")}>
                <h2 className={cx("title")}>Fast & Friendly Support</h2>
                <p>
                  We are provide 24 hours support for all clients.You can purchase without
                  hesitation.
                </p>
              </div>
            </div>
            <div className={cx("service-item")}>
              <div className={cx("service-icon")}>
                <img src={icon4} alt="Service" className={cx("service-icon-image")} />
              </div>
              <div className={cx("service-content")}>
                <h2 className={cx("title")}>Easy to Use</h2>
                <p>
                  Create your own custom template or section by copying, pasting, and assembling.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About us */}
        <div className={cx("about-wrapper")}>
          <div className={cx("col-6")}>
            <img src={learning} alt="learning" className={cx("about-image")} />
            <div className={cx("shape-about")}></div>
          </div>
          <div className={cx("about-content", "col-6")}>
            <p className={cx("about-title")}>About us</p>
            <span>
              Come and join us to expand your knowledge, revisit previous lessons, and sharpen your
              memory by recalling fascinating information.
            </span>
            <ul className={cx("about-list")}>
              <li className={cx("about-item")}>
                <img src={book} alt="book" className={cx("about-item-icon")} />
                Flexible unlimited training programs
              </li>
              <li className={cx("about-item")}>
                <img src={creative} alt="creative" className={cx("about-item-icon")} />
                Experience & qualified teachers
              </li>
              <li className={cx("about-item")}>
                <img src={quiz} alt="quiz" className={cx("about-item-icon")} />
                Free incoming lessons
              </li>
            </ul>
          </div>
        </div>
        {/* Courses */}
        <div className={cx("course-wrapper")}>
          <div className={cx("course-container")}>
            <div className={cx("content")}>
              <Course />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
