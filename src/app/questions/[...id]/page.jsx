'use client'
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { questionsContext } from "@/Context/questioncontext";
import { useRouter } from "next/navigation";
import style from './questions.module.css'



export default function Question() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {handleAnswerSelect,selectedAnswers}=useContext(questionsContext)
  const { id } = useParams();
  const router=useRouter()

  useEffect(() => {
    async function fetchQuestions() {
      const session = await getSession();
      const { data } = await axios.get(
        `https://exam.elevateegy.com/api/v1/questions?exam=${id}`,
        { headers: { token: session?.token } }
      );
      console.log(data)
      setQuestions(data.questions);
    }

    fetchQuestions();
  }, [id]);


  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.push('/result')
      
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

 

  if (questions.length ===0) {
    return <p>Loading questions...</p>;
  }
  const currentQuestion = questions[currentIndex];

  return (

<div className="p-6 flex flex-col items-center">
  <div className="mb-6 border p-4 w-[686px] rounded-lg">
    <h1 className="font-bold mb-4 text-[#4461F2]">
      Question {currentIndex + 1} of {questions.length}
    </h1>
    <p className="font-semibold mb-2 text-2xl">{currentQuestion.question}</p>
    {currentQuestion.answers.map((answer) => (
      <div
        key={answer.key}
        className={`flex items-center gap-2 p-2 w-[638px] h-[72px] rounded-[10px] mb-2 bg-gray-100 ${
          selectedAnswers[currentQuestion._id] === answer.key ? "bg-blue-100" : ""
        }`}
      >
        <input
          id={`question-${currentIndex}-answer-${answer.key}`}
          type="radio"
          name={`question-${currentIndex}`}
          className={`${style.element1}`}
          checked={selectedAnswers[currentQuestion._id] === answer.key}
          onChange={() => handleAnswerSelect(currentQuestion._id, answer.key)}
        />
        <label
          htmlFor={`question-${currentIndex}-answer-${answer.key}`}
          className="cursor-pointer w-full"
        >
          {answer.answer}
        </label>
      </div>
    ))}
    <div className="flex gap-10 mt-8">
      <button
        onClick={handleBack}
        disabled={currentIndex === 0}
        className={`px-4 py-2 rounded ${
          currentIndex === 0
            ? "border border-blue-600 text-blue-600 font-bold text-xl rounded-full h-[56px]  w-[295px] cursor-not-allowed"
            : "font-bold text-xl rounded-full h-[56px] border border-blue-600 text-blue-600 w-[295px]"
        }`}
      >
        Back
      </button>
      <button
        onClick={handleNext}
        className={`${
          currentIndex === questions.length - 1 ? "bg-green-500" : "bg-blue-500"
        } w-[295px] font-bold text-xl h-[56px] rounded-full text-white px-4 py-2 hover:bg-blue-600`}
      >
        {currentIndex === questions.length - 1 ? "Submit" : "Next"}
      </button>
    </div>
  </div>
</div>


 

  );
}



