import React, { useState } from "react";
import styles from "./FcGenerateModal.module.scss";
import classNames from "classnames/bind";
import Modal from "react-modal";
const cx = classNames.bind(styles);
const FlashcardGenerateModal = ({ isOpen, onRequestClose, onGenerate }) => {
  const customStyles = {
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "50%",
      display: "flex",
      flexDirection: "column",
      width: "40%",
    },
  };
  const [topic, setTopic] = useState("");
  const [quantity, setQuantity] = useState(0);
  const handleGenerate = () => {
    onGenerate({ topic, quantity });
    onRequestClose();
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className={cx("modal-header")}>
        <h2 className={cx("modalsubHeader")}>Generate Flashcard</h2>
        <button className={cx("closeBtn")} onClick={onRequestClose}>
          X
        </button>
      </div>
    
      <div>
        Topic: <input className={cx('modalinput')} type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
      </div>
      <div>
        Quantity:
        <input type="number" className={cx('modalinput')} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </div>
      <div className={cx("btnContainer")}>
        <button onClick={handleGenerate}>Generate</button>
        <button className={cx('btnCancel')} onClick={onRequestClose}>Cancel</button>
      </div>
    </Modal>
  );
};

export default FlashcardGenerateModal;
