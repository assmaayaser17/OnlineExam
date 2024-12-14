
'use client'
import axios from 'axios';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import Sidenav from '../Sidenav/Sidenav';
import Searchinput from '../Searchinput/Searchinput';



export default function Quiz() {
    const [quizes, setQuiz] = useState([]);
    const [visible, setVisible] = useState(false); 
    const [question, setQuestion] = useState(false); 

    const toggleDiv = () => {
      setVisible(true); 
    };
  
    const gotoQuestion = () => {
      setVisible(false); 
      setQuestion(true); 
    };

    useEffect(() => {
      async function displayQuiz() {
        const session = await getSession();
  
        let { data } = await axios.get("https://exam.elevateegy.com/api/v1/exams", {
          headers: { token: session?.token },
        });
        console.log(data);
        setQuiz(data.exams);
      }
      displayQuiz();
    }, []);
  
    return (
      <>
        <div className="flex gap-24 p-5">
      <Sidenav/>
  
      <div className="flex flex-col gap-16 w-[1063px] h-[988px]">
      <Searchinput/>
      <div className="flex flex-col gap-5">
        {!question ? (
          quizes.map((quiz, index) => (
            <div key={index}>
              <div className="w-[1063px] h-[103px] p-5 flex justify-between rounded shadow">
                <div className="flex flex-col">
                  <p>{quiz.title}</p>
                  <p className="text-[#535353]">{quiz.numberOfQuestions} Questions</p>
                </div>
                <div>
                  <p>{quiz.duration} minutes</p>
                  <button
                    onClick={toggleDiv}
                    className="w-[77px] h-[23px] bg-[#4461F2] rounded-[10px] flex justify-center items-center text-white"
                  >
                    Start
                  </button>
                
                  {visible && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      
                      <div className="p-6 bg-white w-[648px] h-[309px] rounded-[20px] shadow-lg">
                        <h2 className="text-lg mb-4">Instructions</h2>
                        <ul className="list-disc ml-6">
                          <li>Lorem ipsum dolor sit amet consectetur.</li>
                          <li>Lorem ipsum dolor sit amet consectetur.</li>
                          <li>Lorem ipsum dolor sit amet consectetur.</li>
                          <li>Lorem ipsum dolor sit amet consectetur.</li>
                        </ul>
                        <button
                          onClick={gotoQuestion}
                          className="mt-16 px-4 py-2 w-[600px] h-[48px] bg-[#4461F2] text-white rounded-full focus:outline-none"
                        >
                          Start
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
         
          <div className="p-6 fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className='p-6 bg-white w-[648px] h-[309px] rounded-[20px] shadow-lg'>
            
            <p className="text-gray-600">
            Exercitationem pariatur quae facere vel id est illo velit aut.
            </p>
            </div>
           
          </div>
        )}
      </div>
     
     
      </div>
   
    </div>
      
      

     
      
      
      </>

    
    );
  }
