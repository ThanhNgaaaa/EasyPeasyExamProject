import axios from "axios";
import React, { useState } from "react";

const fetchChatOpenAI = async (topicName, quantity, setFlashcardsAI) => {
  try {
    // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
    const apiKey = "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";

    const response = await axios
      .post(
        "https://api.openai.com/v1/chat/completions",
        {
          // prompt: `Create ${topicName}-themed flashcards\n`,
          // max_tokens: quantity * 10,
          // temperature: 0.7,
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant.",
            },
            {
              role: "user",
              content: `Create ${topicName}-themed flashcards about ${quantity}\n`,
            },
          ],
        },
        {
          headers: {
            // "Content-Type": "application/json",
            // Authorization: `Bearer ${apiKey}`,
            Authorization: "Bearer " + apiKey,
            "Content-Type": "application/json",
          },
        },
      )
      .then((response) => {
        console.log(response.data.choices[0].message.content);
      })
      .catch((error) => {
        console.error(error);
      });

    const generatedFlashcards = response.data.choices[0].message.content;

    // Update your flashcards state accordingly
    
    console.log(generatedFlashcards);
    const flashcardArray = generatedFlashcards.split('\n\n');
    const flashcards = flashcardArray.map((flashcard) => {
      const lines = flashcard.split('\n').filter(line => line.trim() !== '');
      const frontSide = lines[1].replace('Front side: ', '');
      const backSide = lines[2].replace('Back side: ', '');
    
      return { frontSide, backSide };
    });
    
    console.log(flashcards);
    setFlashcardsAI(flashcards);
  } catch (error) {
    console.error("Error generating flashcards:", error);
    // Handle errors as needed
  }
};
export default fetchChatOpenAI;
