import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ModalCreateAI.module.scss";

const cx = classNames.bind(styles);
const ModalCreateAI = ({ isOpen, onRequestClose, handleGenerate }) => {
  const [topicName, setTopicName] = useState("");
  const [quantity, setQuantity] = useState("");
  if (!isOpen) return null;
  const handleGenerateClick = () => {
    // You may want to perform validation here before calling handleGenerate
    handleGenerate(topicName, quantity);
    onRequestClose();
  };

  return (
    <div onClick={onRequestClose} className={cx("overlay")}>
      {/* <div className={cx("modal-overlay")} onClick={onRequestClose}></div> */}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cx("modalContainer")}
      >
        <div className={cx("modal-content")}>
          <h2>Generate Flashcards</h2>
          <label htmlFor="topicName">Topic Name:</label>
          <input
            required
            type="text"
            id="topicName"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            className={cx("modal-input")}
          />
          <label htmlFor="quantity">Quantity:</label>
          <input
            required
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={cx("modal-input")}
          />
          <div className={cx("modal-buttons")}>
            <button onClick={handleGenerateClick}>Generate</button>
            <button onClick={onRequestClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateAI;
