import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./FlashCardDetail.module.scss";
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
import { Link, useParams } from "react-router-dom";
import routes from "../../../config/routes";
import FlashcardItem from "./FlashcardItem/FlashcardItem";
import FlashcardItemPlay from "./FlashcardItemPlay/FlashcardItemPlay";
import FlashcardGenerateModal from "./FlashcardGenerateModal/FlashcardGenerateModal";
import openai from "openai";
import axios from "axios";
import jwtDecode from "jwt-decode";

const openaiApiKey = "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";

const cx = classNames.bind(styles);
const FlashcardDetail = () => {
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const openGenerateModal = () => setIsGenerateModalOpen(true);
  const closeGenerateModal = () => setIsGenerateModalOpen(false);
  const [userInput, setUserInput] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [fcList, setFcList] = useState([]);
  const token = localStorage.getItem("jwtToken");
  const [topicName, setTopicName] = useState("");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { Id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState("");
  const [showDefaultFC, setShowDefaultFC] = useState(false);
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const createAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const defaultFlashcard = {
    Title: "New Title",
    CreatedDate: createAt,
    TopicId: Id,
    Content: "New Content",
  };
  const createDefaultFC = () => {
    return <FlashcardItem data={defaultFlashcard} />;
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
  }, []);
  useEffect(() => {
    fetch(`https://localhost:7121/api/Flashcard/GetFlashcardByFcTopic/${Id}`)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setFcList(response);
        console.log(response);
      });
  }, []);
  useEffect(() => {
    fetch(`https://localhost:7121/api/FlashcardTopic/${Id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTopicName(data.TopicName);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };
  const handleNextCard = () => {
    if (currentCardIndex < fcList.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };
  const handleGenerateFlashcard = ({ topic, quantity }) => {
    openai.apiKey = openaiApiKey;
    openai.chat
      .create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Create flashcards for topic: ${topic} and quantity: ${quantity}`,
          },
        ],
      })
      .then((response) => {
        // Gửi response từ OpenAI lên server để lưu vào cơ sở dữ liệu
        fetch("YOUR_SERVER_API_ENDPOINT", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Thêm các headers cần thiết khác (ví dụ: Authorization header)
          },
          body: JSON.stringify({ topic, quantity, flashcards: response.data }),
        })
          .then((res) => {
            // Xử lý response từ server (nếu cần)
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleEditClickCancel = () => {
    setTopicName(topicName);
    setIsEditing(false);
  };
  const handleSaveEditTopicName = async () => {
    try {
      var editedData = {
        Id: Id,
        TopicName: topicName,
        UserId: userId,
      };
      console.log(editedData);

      await axios
        .put(`https://localhost:7121/api/FlashcardTopic/${Id}`, editedData)
        .then((response) => {
          console.log(response.data);
          setIsEditing(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const showItemDefault = () => {
    handlePostFC();
    setShowDefaultFC(true);
  };
  const handlePostFC = () => {
    var newfc = {
      Title: defaultFlashcard.Title,
      CreatedDate: createAt,
      TopicId: Id,
      Content:defaultFlashcard.Content
  };
    axios
      .post("https://localhost:7121/api/Flashcard", newfc)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("sidebar-left")}>
          <div>
            <div className={cx("fc-name")}>
              {isEditing ? (
                <div className={cx("editContainer")}>
                  <input
                    className={cx("topic_name", "topic-name_input")}
                    value={topicName}
                    onChange={(e) => {
                      setTopicName(e.target.value);
                    }}
                  />
                  <div className={cx("btnEditContainer")}>
                    <button
                      className={cx("btn-edit-topic", "btn-edit-cancel")}
                      onClick={handleEditClickCancel}
                    >
                      <span>Cancel</span>
                    </button>
                    <button className={cx("btn-edit-topic")} onClick={handleSaveEditTopicName}>
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              ) : (
                <span>{topicName}</span>
              )}
              <div>
                <button className={cx("fc-editname")} onClick={handleEditClick}>
                  <FiEdit2 className={cx("fc-editicon")} />
                  Edit name
                </button>
              </div>
            </div>

            <div className={cx("fc-list")}>
              {fcList.map((result) => (
                <FlashcardItem key={result.Id} data={result} />
              ))}
              {showDefaultFC && createDefaultFC()}
              
            </div>
            <div className={cx("fc-item_btn")}>
                <button
                  className={cx("btn-add")}
                  onClick={() => {
                    showItemDefault();
                  }}
                >
                  <span className={cx("btn-add_text")}>Add Item</span>
                  <FiPlus className={cx("btn-add_icon")} />
                </button>
              </div>
          </div>

          <div className={cx("btnContainer")}>
            <Link to={routes.flashcard} className={cx("btn-exit")}>
              EXIT
            </Link>
            {/* <button className={cx("btn-generate")} onClick={() => setIsGenerateModalOpen(true)}>
              Generate
            </button> */}
            {/* <div className={cx("lesson-submit")}>
              <button onClick={handleSave} className={cx("btn-save")}>
                Finish
              </button>
            </div> */}
          </div>
        </div>
        <div className={cx("container")}>
          <div className={cx("flexcontainer")}>
            <span className={cx("name")}>{topicName}</span>
            <span className={cx("quantity")}>
              {fcList.length > 0 && `${currentCardIndex + 1}/${fcList.length}`}
            </span>
            {fcList.length > 0 && (
              <FlashcardItemPlay
                key={fcList[currentCardIndex].Id}
                data={fcList[currentCardIndex]}
                isActive={true}
                // onClick={handleSwapt}
              />
            )}
          </div>
          <div className={cx("card-action")}>
            <button className={cx("btn-prev-fc")} onClick={handlePrevCard}>
              <FiArrowLeft className={cx("btn-prev-fc_icon")} />
            </button>
            <button className={cx("btn-next-fc")} onClick={handleNextCard}>
              <FiArrowRight className={cx("btn-next-fc_icon")} />
            </button>
          </div>
        </div>
      </div>
      <FlashcardGenerateModal
        isOpen={isGenerateModalOpen}
        onRequestClose={() => setIsGenerateModalOpen(false)}
      />
    </>
  );
};

export default FlashcardDetail;
