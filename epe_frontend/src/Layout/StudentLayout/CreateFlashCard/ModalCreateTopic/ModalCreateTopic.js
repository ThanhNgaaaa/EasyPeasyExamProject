import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ModalCreateTopic.module.scss";
import ReactModal from "react-modal";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import routes from "../../../../config/routes";
import jwtDecode from "jwt-decode";
import axios from "axios";
const cx = classNames.bind(styles);

const ModalCreateTopic = ({ isOpen, onRequestClose,onSetTopicName,onSetFctopicId}) => {
  const [topic, setTopic] = useState("");
  const [fctopicId, setFctopicId] = useState("");
  const [userId, setUserId] = useState("");
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
      padding: "20px 40px",
    },
  };
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
  const handleCreateTopic = () => {
    var fcTopic = {
      TopicName: topic,
      UserId: userId,
    };
    axios
      .post("https://localhost:7121/api/FlashcardTopic", fcTopic)
      .then((response) => {
        console.log(response.data);
        onRequestClose();
        onSetTopicName(topic);
        setFctopicId(response.data.Id);
        onSetFctopicId(response.data.Id);
        console.log(response.data.Id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className={cx("modal-header")}>
        <p className={cx("modalsubHeader")}>Create a New Flashcard Set</p>
        <Link to={routes.flashcard} className={cx("closeBtn")}>
          &times;
        </Link>
      </div>
      <div className={cx("modal-body")}>
        <span>Topic Name:</span>
        <input
          className={cx("modalinput")}
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>
      <div className={cx("btnContainer")}>
        <button onClick={handleCreateTopic}>Create</button>
        <Link className={cx("btnCancel")} to={routes.flashcard}>
          Cancel
        </Link>
      </div>
    </Modal>
  );
};

export default ModalCreateTopic;
