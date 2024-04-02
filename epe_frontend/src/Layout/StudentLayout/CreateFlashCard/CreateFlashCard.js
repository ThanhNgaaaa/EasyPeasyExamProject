import axios from "axios";
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CreateFlashCard.module.scss";
import {
  FiArrowLeft,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiDelete,
  FiEdit2,
  FiPlus,
  FiTrash,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../../config/routes";
import FlashcardItem from "./FlashcardItem/FlashcardItem";
import jwtDecode from "jwt-decode";
import { Modal } from "bootstrap";
import ModalCreateTopic from "./ModalCreateTopic/ModalCreateTopic";
import ModalCreateAI from "./ModalCreateAI/ModalCreateAI";
import fetchChatOpenAI from "./fetchChatOpenAI"


const cx = classNames.bind(styles);
const CreateFlashCard = () => {
  const navigate = useNavigate();
  const [flashcardsAI, setFlashcardsAI] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [topicName, setTopicName] = useState("");
  const [fctopicId, setFctopicId] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [userId, setUserId] = useState("");
  const [fcList, setFcList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [newFlashcard, setNewFlashcard] = useState({
    Title: title,
    Content: content,
  });
  const [updatedFcList, setUpdatedFcList] = useState([]);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const handleGenerateModalShow = () => setShowGenerateModal(true);
  const handleGenerateModalClose = () => setShowGenerateModal(false);
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
    setShowModal(true);
  }, []);
  const generateFlashcards = () => {
    axios
      .post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt: `Generate flashcards:\n\n${userInput}`,
          max_tokens: 100,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_API_KEY", // Thay YOUR_API_KEY bằng API key của bạn
          },
        },
      )
      .then((response) => {
        const flashcards = response.data.choices[0].text.trim().split("\n");
        setFlashcards(flashcards);
      })
      .catch((error) => {
        console.error("Request failed", error);
      });
  };
  const handleAddItem = () => {
    setFcList((prevFcList) => [...prevFcList, newFlashcard]);
  };
  const handleUpdateNewFlashcard = (updatedFlashcard, index) => {
    console.log(updatedFlashcard);
    setUpdatedFcList((prevUpdatedFcList) => [...prevUpdatedFcList, updatedFlashcard]);
    setFcList((prevFcList) => {
      const updatedFcList = [...prevFcList];
      if (index > 0 && index < prevFcList.length) {
        updatedFcList[index] = updatedFlashcard;
      } else {
        updatedFcList.push(updatedFlashcard);
      }
      return updatedFcList;
    });
  };
  const handleSave = async () => {
    try {
      var flashcards = [...updatedFcList];
      var fcTopic = {
        TopicName: topicName,
        UserId: userId,
        Flashcards: flashcards,
      };
      axios
        .post("https://localhost:7121/api/FlashcardTopic", fcTopic)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      navigate(routes.flashcard);
    } catch (error) {
      console.error("Request failed", error);
    }
  };
  const handleGenerateFlashcards = async (topicName, quantity) => {
    await fetchChatOpenAI(topicName, quantity, setFlashcardsAI);
    handleGenerateModalClose();
    console.log(flashcardsAI);
  };
  

  return (
    <div className={cx("wrapper")}>
      <ModalCreateAI
        isOpen={showGenerateModal}
        onRequestClose={handleGenerateModalClose}
        handleGenerate={handleGenerateFlashcards}
      />
      <div className={cx("sidebar-left")}>
        <div>
          <div className={cx("createContainer")}>
            <div className={cx("header")}>
              <p className={cx("subHeader")}>Create a New Flashcard Set</p>
            </div>
            <div className={cx("body")}>
              <span>Topic Name:</span>
              <input
                required
                className={cx("input_create")}
                type="text"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={cx("btnContainer")}>
          <Link to={routes.flashcard} className={cx("btn-exit")}>
            EXIT
          </Link>
          <button className={cx("btn-generate")} onClick={handleGenerateModalShow}>
            Generate
          </button>
        </div>
      </div>
      <div className={cx("container")}>
        <div className={cx("fc-list")}>
          {fcList.map((result, index) => (
            <FlashcardItem
              key={index}
              data={result}
              onUpdateNewFlashcard={handleUpdateNewFlashcard}
            />
          ))}
          <div className={cx("fc-item_btn")}>
            <button className={cx("btn-add")} onClick={handleAddItem}>
              <span className={cx("btn-add_text")}>Add Item</span>
              <FiPlus className={cx("btn-add_icon")} />
            </button>
          </div>
        </div>
        <div className={cx("lesson-submit")}>
          <button onClick={handleSave} className={cx("btn-save")}>
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFlashCard;
