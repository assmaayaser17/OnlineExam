'use client'
// import axios from 'axios'
// import { getSession } from 'next-auth/react';
// import { useParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react'


// export default function Question() {

//     const[questions,setQuestion]=useState([]);
//     const[answers,setAnswers]=useState([]);


//     let {id} = useParams();
   
 

//     useEffect(()=>{
//       async  function getQuestion(){
//         const session = await getSession();
//             let {data}=await axios.get(`https://exam.elevateegy.com/api/v1/questions?exam=${id}`,{
//                 headers:{ token: session?.token },
//             })
//             console.log(id)
//             console.log(data);
//             setQuestion(data.questions)
//             // setAnswers(data.questions.answers)
//         }

//         getQuestion()



//     },[])
//     const handleAnswerSelect = (questionId, answerKey) => {
//       setAnswers((prev) => ({
//         ...prev,
//         [questionId]: answerKey,
//       }));
//     };

//   return (
   
// <>
//       {questions.map((question, index) => (
//         <div key={index} className="p-6 fixed inset-0 flex items-center justify-center   ">
//           <div className="p-6 bg-white flex flex-col gap-5 w-[686px] rounded-[20px] shadow-lg">
//             <div>
//               <p>
//            { question.question}
         
//           </p>
//             </div>
//             {questions.answers?.map((answer,index)=>(
//               <div key={index}>
//                 <p>{answer.key}</p>
              
//               </div>
//             ))} 
//           </div>
//         </div>
//       ))}
//     </>
//   )


    
    
    
// }

import { useEffect, useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const { id } = useParams();

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

 
  const handleAnswerSelect = (questionId, answerKey) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerKey,
    }));
  };

  
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Submit answers to check API
  // const handleSubmit = async () => {
  //   try {
  //     const session = await getSession();
      
  //     // Transform selectedAnswers object into an array of { questionId, answerKey }
  //     const answersArray = Object.entries(selectedAnswers).map(([questionId, answerKey]) => ({
  //       questionId,
  //       answer: answerKey,
  //     }));
  
  //     const handleSubmit = async () => {
  //       try {
  //         const session = await getSession();
  //         console.log("Session Token:", session?.token); // Check the token value
      
  //         const answersArray = Object.entries(selectedAnswers).map(([questionId, answerKey]) => ({
  //           questionId,
  //           answer: answerKey,
  //         }));
      
  //         const { data } = await axios.post(
  //           "https://exam.elevateegy.com/api/v1/questions/check",
  //           { answers: answersArray },
  //           { headers: { token: session?.token } } // Check the token here
  //         );
      
  //         const correctCount = data.correct;
  //         const incorrectCount = data.incorrect;
      
  //         setScore({ correct: correctCount, incorrect: incorrectCount });
  //         setShowResult(true);
  //       } catch (error) {
  //         console.error("Error checking answers:", error.response?.data || error.message);
  //         alert("Failed to submit answers. Please log in again or check your credentials.");
  //       }
  //     };
      
  
  //     // Parse correct and incorrect count from response
  //     const correctCount = data.correct;
  //     const incorrectCount = data.incorrect;
  
  //     // Update score and show result
  //     setScore({ correct: correctCount, incorrect: incorrectCount });
  //     setShowResult(true);
  //   } catch (error) {
  //     console.error("Error checking answers:", error);
  //     alert("Failed to submit answers. Please try again.");
  //   }
  // };
  

  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  if (showResult) {
    // Result UI
    const totalQuestions = score.correct + score.incorrect;
    const percentage = Math.round((score.correct / totalQuestions) * 100);

    return (
      <div className="flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Your Score</h1>
        <div className="w-64 h-64 flex items-center justify-center relative">
          {/* Circular Progress Indicator */}
          <svg className="absolute" width="100" height="100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#007bff"
              strokeWidth="10"
              strokeDasharray={`${(percentage / 100) * 283}, 283`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <span className="text-3xl font-semibold">{percentage}%</span>
        </div>
        <div className="flex justify-around mt-4">
          <div className="text-center text-blue-500">
            <p className="text-2xl">{score.correct}</p>
            <p>Correct</p>
          </div>
          <div className="text-center text-red-500">
            <p className="text-2xl">{score.incorrect}</p>
            <p>Incorrect</p>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="p-6 flex flex-col  items-center">
      <div className="mb-6 border p-4  w-[686px]   rounded-lg">
      <h1 className="  font-bold mb-4 text-[#4461F2] ">
        Question {currentIndex + 1} of {questions.length}
      </h1>
        <p className="font-semibold mb-2 text-2xl">{currentQuestion.question}</p>
        {currentQuestion.answers.map((answer) => (
          <div
            key={answer.key}
            className={`flex items-center gap-2 p-2 bg-[#EDEFF3] w-[638px] h-[72px] rounded-[10px] mb-2 ${
              selectedAnswers[currentQuestion._id] === answer.key
                ? "bg-blue-100"
                : "bg-gray-100"
            }`}
          >
            <input
              type="radio"
              name={`question-${currentIndex}`}
              id={`question-${currentIndex}-answer-${answer.key}`}
              checked={selectedAnswers[currentQuestion._id] === answer.key}
              onChange={() =>
                handleAnswerSelect(currentQuestion._id, answer.key)
              }
            />
            <label
              htmlFor={`question-${currentIndex}-answer-${answer.key}`}
              className="cursor-pointer"
            >
              {answer.answer}
            </label>
          </div>
        ))}
        <div className="flex gap-10 mt-8 ">
        <button
          onClick={handleBack}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded ${
            currentIndex === 0
              ? "border border-blue-600 text-blue-600 font-bold text-xl rounded-full h-[56px]  w-[295px] cursor-not-allowed"
              : " font-bold text-xl rounded-full h-[56px] border border-blue-600 text-blue-600  w-[295px]    "
          }`}
        >
          Back
        </button>
        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="  text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-blue-500 w-[295px] font-bold text-xl h-[56px] rounded-full text-white px-4 py-2  hover:bg-blue-600"
          >
            Next
          </button>
        )}
      </div>
      </div>

    
     
    </div>
  );
}


