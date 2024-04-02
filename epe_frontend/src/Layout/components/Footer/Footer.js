import React from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import images from "../../../assets/images";
const cx = classNames.bind(styles);
const Footer = () => {
  return (
    <footer className={cx("site-footer")}>
      <div className={cx("container")}>
        <div className={cx("row")}>
          <div className={cx("col-md-6")}>
            <h6>About</h6>
            <p className={cx("text-justify")}>
              Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i> is an initiative to help the upcoming
              programmers with the code. Scanfcode focuses on providing the most efficient code or
              snippets as the code wants to be simple. We will help programmers build up concepts in
              different programming languages that include C, C++, Java, HTML, CSS, Bootstrap,
              JavaScript, PHP, Android, SQL and Algorithm.
            </p>
          </div>

          <div className={cx("col-md-6", "box")}>
            <div>
              <h6>Categories</h6>
              <ul className={cx("footer-links")}>
                <li>
                  <a href="http://scanfcode.com/category/c-language/">C</a>
                </li>
                <li>
                  <a href="http://scanfcode.com/category/front-end-development/">UI Design</a>
                </li>
                <li>
                  <a href="http://scanfcode.com/category/back-end-development/">PHP</a>
                </li>
                <li>
                  <a href="http://scanfcode.com/category/java-programming-language/">Java</a>
                </li>
                <li>
                  <a href="http://scanfcode.com/category/android/">Android</a>
                </li>
                <li>
                  <a href="http://scanfcode.com/category/templates/">Templates</a>
                </li>
              </ul>
            </div>

            <div>
              <h6>Quick Links</h6>
              <ul className={cx("footer-links")}>
                <li>
                  <a href="http://scanfcode.com/about/">About Us</a>
                </li>
                <li>
                  <a href="http://scanfcode.com/contact/">Contact Us</a>
                </li>
                <li>
                  <a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a>
                </li>
                <li>
                  <a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a>
                </li>
                <li>
                  <a href="http://scanfcode.com/sitemap/">Sitemap</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("container", "line")}>
        <div className={cx("col-md-8", "col-sm-6 ", "col-xs-12")}>
          <p className={cx("copyright-text")}>
            Copyright &copy; 2023 All Rights Reserved by 
            <a href="/">ND</a>.
          </p>
        </div>

        <div className={cx("col-md-4", "col-sm-6", "col-xs-12")}>
          <ul className={cx("social-icons")}>
            <li>
              <a className={cx("facebook")} href="/">
                <img src={images.facebookFooter} alt="facebook" className={cx("img")} />
              </a>
            </li>
            <li>
              <a className={cx("twitter")} href="/">
              <img src={images.twitterFooter} alt="facebook" className={cx("img")} />
                
              </a>
            </li>
            <li>
              <a className={cx("instagram")} href="/">
              <img src={images.instagramFooter} alt="facebook" className={cx("img")} />
              </a>
            </li>
            <li>
              <a className={cx("linkedin")} href="/">
              <img src={images.linkedinFooter} alt="facebook" className={cx("img")} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
