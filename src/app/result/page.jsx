'use client'
import React, { useContext, useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import { questionsContext } from "@/Context/questioncontext";
import style from './result.module.css'


export default function Result() {
  const [result, setResult] = useState(null); // Store API response
  const { selectedAnswers } = useContext(questionsContext);

  useEffect(() => {
    async function displayResult() {
      try {
        const session = await getSession();
        const { data } = await axios.post(
          "https://exam.elevateegy.com/api/v1/questions/check",
          {
            answers: selectedAnswers,
            time: 10,
          },
          {
            headers: { token: session?.token },
          }
        );
        console.log(data)

        setResult(data); 
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    }

    displayResult();
  }, [selectedAnswers]);


  if (!result) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading results...</p>
      </div>
    );
  }

  const { correct, wrong, total, correctQuestions, WrongQuestions } = result;

  return (
    <div className="flex flex-col items-center">
      
      <div className="w-[686px] p-5 shadow rounded-[20px] mt-10 flex flex-col ">
      <h1 className="text-2xl font-bold mb-4 ">Your score</h1>
      
      <div className="flex flex-col gap-8">
      <div className="p-4 rounded-lg flex gap-10 justify-center items-center text-white w-full">
         
         <div className="relative">
   
   <div className="w-40 h-40 rounded-full "></div>
 
   <div
     className={`absolute top-0 left-0 w-40 h-40 rounded-full ${style.element}`}
     
   ></div>
  
   <div
     className="absolute top-0 left-0 w-40 h-40 flex items-center justify-center"
   >
     <p className="text-3xl font-bold text-gray-800"> {parseFloat(total).toFixed(0)}%</p>
   </div>
           </div>
        <div className="flex flex-col gap-5">
         <p className="text-2xl text-[#02369C] flex justify-between font-bold"> Correct
         <span className=" text-xl border border-[#02369C] flex justify-center items-center rounded-full w-[32px] h-[32px]  ">
           {correct}

           </span>
           
           
           </p>
           <p className="text-2xl text-[#CC1010] flex gap-8 font-bold"> InCorrect
         <span className=" text-xl border border-[#CC1010] text-[#CC1010] flex justify-center items-center rounded-full w-[32px] h-[32px]  ">
           {wrong}

           </span>
           
           
           </p>
          
         

         </div>
        
         
         
       </div>
       <div className="flex gap-4">
        <button className="w-[311px] h-[56px]  text-blue-600 border border-blue-600 rounded-full">Back</button>
        <button className="w-[311px] h-[56px] border bg-blue-600 text-white rounded-full">Show results</button>
       </div>

      </div>
        
       

     
      </div>

     
      
    </div>
  );
}
