import React, { useState } from "react";
import styles from "./TestExam.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const TestQuestion = ({ data, questionNumber, onAnswered, isAnswered }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
    const isAnswerCorrect = (choiceContent) => {
        const selectedChoice = data.Choices.find(
          (choice) => choice.ChoiceContent === choiceContent,
        );
        return selectedChoice && selectedChoice.IsCorrect;
      };
    const handleAnswerChange = (event) => {
        const choiceContent = event.target.value;
        setSelectedAnswer(choiceContent);
        if (isAnswerCorrect(choiceContent)) {
          onAnswered(true);
          setNumCorrectAnswers(numCorrectAnswers + 1);
          setAnsweredQuestions([...answeredQuestions, data.QuestionId]);
        } else {
          setAnsweredQuestions([...answeredQuestions, data.QuestionId]);
          onAnswered(false);
        }
      };
  return (
    <div className={cx("test-question-wrapper", { answered: isAnswered })}>
      <p>Question {questionNumber}: </p>
      <div className={cx("test-question")}>{data.Content}</div>
      <div>
        <table cellpadding="2" className={cx("test-answers")}>
          {data.Choices.map((choice) => (
            <tr key={choice.ChoiceId}>
              <td className={cx("test-answers-content")}>
                <input
                  type="radio"
                  name={choice.QuestionId}
                  value={choice.ChoiceContent}
                  checked={selectedAnswer === choice.ChoiceContent}
                  onChange={handleAnswerChange}
                  className={cx('test-inputChoice')}
                  id={choice.ChoiceContent}
                />
                 <label htmlFor={choice.ChoiceContent}>{choice.ChoiceContent}</label>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default TestQuestion;
