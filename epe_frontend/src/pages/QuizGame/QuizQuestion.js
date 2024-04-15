import React from "react";
import classNames from "classnames/bind";
import styles from "./QuizGame.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import correctAudio from "../../assets/audio/woweffect.mp3";
import inCorrectSound from "../../assets/audio/caigidobanoi.mp3";
const cx = classNames.bind(styles);
const QuizQuestion = ({ question, onAnswered, selectedAnswers }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [color, setColor] = useState({});
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
  const [correctSound, setCorrectSound] = useState(null);
  const [incorrectSound, setIncorrectSound] = useState(null);
  const [answered, setAnswered] = useState(false);
  const handleAnswerChange = (event) => {
    const choiceContent = event.target.value;
    setSelectedAnswer(choiceContent);
    setColor((prevColor) => {
      const newColor = { ...prevColor };
      for (const choice of question.Choices) {
        if (choice.ChoiceContent === choiceContent) {
          newColor[choiceContent] = isAnswerCorrect(choiceContent)
            ? "correct-answer"
            : "incorrect-answer";
        } else if (isAnswerCorrect(choice.ChoiceContent)) {
          newColor[choice.ChoiceContent] = "correct-answer";
        } else {
          newColor[choice.ChoiceContent] = "";
        }
      }
      return newColor;
    });
    if (isAnswerCorrect(choiceContent)) {
      onAnswered(true);
      setNumCorrectAnswers(numCorrectAnswers + 1);
      setAnsweredQuestions([...answeredQuestions, question.QuestionId]);
      if (correctSound) correctSound.play();
    } else {
      setAnsweredQuestions([...answeredQuestions, question.QuestionId]);
      onAnswered(false);
      if (incorrectSound) incorrectSound.play();
    }
  };

  useEffect(() => {
    if (selectedAnswer) {
      const selectedChoice = question.Choices.find(
        (choice) => choice.ChoiceContent === selectedAnswer,
      );
      if (!selectedChoice) return;
      const otherChoices = question.Choices.filter(
        (choice) => choice.ChoiceContent !== selectedAnswer,
      );
      for (const choice of otherChoices) {
        const choiceInput = document.querySelector(`input[value="${choice.ChoiceContent}"]`);
        if (choiceInput) {
          choiceInput.disabled = true;
        }
      }
    }
  }, [selectedAnswer]);
  const isAnswerCorrect = (choiceContent) => {
    const selectedChoice = question.Choices.find(
      (choice) => choice.ChoiceContent === choiceContent,
    );
    return selectedChoice && selectedChoice.IsCorrect;
  };

  useEffect(() => {
    setColor((prevColor) => {
      const newColor = { ...prevColor };
      for (const choice of question.Choices) {
        if (choice.ChoiceContent === selectedAnswer) {
          newColor[choice.ChoiceContent] = isAnswerCorrect(choice.ChoiceContent)
            ? "correct-answer"
            : "incorrect-answer";
        } else {
          delete newColor[choice.ChoiceContent];
        }
      }
      return newColor;
    });
  }, [selectedAnswer, question.CorrectChoiceId]);
  return (
    <div>
      <h1 className={cx("quiz-question")}>{question.Content}</h1>
      <fieldset>
        {!answered && (
          <div className={cx("row")}>
            {question.Choices.map((choice) => (
              <div key={choice.ChoiceId} className={cx("col-md-6")}>
                <div className={cx("input-field", color[choice.ChoiceContent])}>
                  <input
                    type="radio"
                    name="op5"
                    value={choice.ChoiceContent}
                    className={cx("input-answer")}
                    checked={selectedAnswer === choice.ChoiceContent}
                    onChange={handleAnswerChange}
                    disabled={answeredQuestions.includes(question.QuestionId)}
                  />
                  <label className={cx("label-input")}>{choice.ChoiceContent}</label>
                </div>
              </div>
            ))}
          </div>
        )}
      </fieldset>
      {selectedAnswer && (
        <div>{isAnswerCorrect(selectedAnswer) ? <p>Yeah, Correct!</p> : <p>Oh No!</p>}</div>
      )}
    </div>
  );
};

export default QuizQuestion;
