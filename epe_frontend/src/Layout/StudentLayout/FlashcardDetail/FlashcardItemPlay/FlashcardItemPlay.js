import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../FlashCardDetail.module.scss";
const cx = classNames.bind(styles);
const FlashcardItemPlay = ({ data, isActive, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const [height, setHeight] = useState("initial");
  const frontEl = useRef();
  const backEl = useRef();

  const handleCardClick = () => {
    if (isActive) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      className={cx("container-play", { active: isActive, flipped: isFlipped })}
      onClick={handleCardClick}
    >
      <div className={cx("card", "front")} ref={frontEl}>
        <div className={cx("title")}>{data.Title}</div>
      </div>
      <div className={cx("card", "back")} ref={backEl}>
        <div className={cx("title")}>{data.Content}</div>
      </div>
      {/* <div className={cx("card", isFlipped ? "back" : "front")} ref={isFlipped ? backEl : frontEl}>
        <div className={cx("title")}>{isFlipped ? data.Content : data.Title}</div>
      </div> */}
      {/* <div className={cx("card", "front")} ref={frontEl}>
            <div className={cx("title")}>{data.Title}</div>
        </div>
        <div className={cx("card", "back")} ref={backEl}>
            <div className={cx("title")}>{data.Content}</div>
        </div> */}
    </div>
  );
};

export default FlashcardItemPlay;
