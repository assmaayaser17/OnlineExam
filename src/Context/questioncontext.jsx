
'use client'
import { createContext, useState } from "react"

export const questionsContext = createContext(null);


export default function QuestionsProvider({children}) {

const [x, setX] = useState(0)
const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);



const handleAnswerSelect = (questionId, answerKey) => {
    const storedanswer=  {
      questionId:questionId,
      correct: answerKey
  }
    setSelectedAnswers((prev) => [...prev,storedanswer]);

    console.log(selectedAnswers)

    
  };

  return  <questionsContext.Provider value={{handleAnswerSelect,selectedAnswers}}> {children} </questionsContext.Provider>
  
}