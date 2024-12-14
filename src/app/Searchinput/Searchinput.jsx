'use client'
import { useRouter } from 'next/navigation'
import React from 'react'


export default function Searchinput() {
  const routes= useRouter()
  const goToExamsPage = () => {
    routes.push("/Quiz"); // Navigate to the Exams page
    console.log(routes)
  };

  return (
    <>

    <div className='flex gap-[26px]'>
        <input placeholder='Search Quiz' className='w-[762px] h-[61px] border p-3 rounded-[20px] drop-shadow-lg  '></input>
        <button className=' w-[191px] h-[61px] bg-[#4461F2] rounded-[20px] text-white font-bold' onClick={goToExamsPage} >Start Quiz</button>
    </div>
    
    
    
    
    
    </>
  )
}
