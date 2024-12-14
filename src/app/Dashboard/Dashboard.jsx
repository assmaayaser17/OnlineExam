'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import pcard from '../../../public/pcard.png'
import flag from '../../../public/flag.png'
import alarm from '../../../public/alarm.png'
import check from '../../../public/check.png'
import axios from 'axios';
import { getSession } from 'next-auth/react';
import Link from 'next/link';

export default function Dashboard() {
   const [subjects,setSubject]=useState([])
   
  useEffect(() => {
    async function getSubjects(){
     
      const session= await getSession();
      console.log("session:", session?.token)
        let{data} =  await axios.get('https://exam.elevateegy.com/api/v1/subjects',{
          headers: {token: session?.token },
          
        })

        console.log(data);
        setSubject(data.subjects)
        
    }
    getSubjects()
  }, [])
  return (
    <>
    <div className=" profilecard bg-white  rounded-lg shadow p-6 flex  gap-8 ">
      <Image
        src={pcard}
        alt="Profile"
        className="w-[216px] h-[216px] object-cover"
      />
      <div className="flex flex-col  gap-8">
        <div className='flex flex-col gap-2'>
        <h2 className="text-3xl font-bold text-[#4461F2]  ">Ahmed Mohamed</h2>
        <p className="text-[#979CA3] text-xl ">Voluptatem aut</p>

        </div>
        
        <div className=" bg-gray-200 rounded-full h-2.5 w-[619px] ">
      <div
        className="bg-blue-500 h-2.5 rounded-full"
        style={{ width: "60%" }} 
      ></div>
    </div>
       <div className='icons flex gap-16'>
        <div className='flex gap-5'>
        <div className='w-[70px] h-[70px] rounded-[10px] shadow flex justify-center items-center'>
            <Image
            src={flag}
            alt='flag'
            />
        </div>

        <div className='flex flex-col gap-4'>
            <p className='font-bold text-2xl text-[#696F79]'>27</p>
            <p className='text-[#696F79]'>Quiz Passed</p>
        </div>

        </div>
        <div className='flex gap-5'>
        <div className='w-[70px] h-[70px] rounded-[10px] shadow flex justify-center items-center'>
            <Image
            src={alarm}
            alt='alarm'
            />
        </div>

        <div className='flex flex-col gap-4'>
            <p className='font-bold text-2xl text-[#696F79]'>13 min</p>
            <p className='text-[#696F79]'>Fastest Time</p>
        </div>

        </div>
        <div className='flex gap-5'>
        <div className='w-[70px] h-[70px] rounded-[10px] shadow flex justify-center items-center'>
            <Image
            src={check}
            alt='check'
            />
        </div>

        <div className='flex flex-col gap-4'>
            <p className='font-bold text-2xl text-[#696F79]'>200</p>
            <p className='text-[#696F79]'>Correct Answers</p>
        </div>

        </div>
        
        



       </div>
      </div>
    </div> 

    <div className='w-[1063px] h-[734.01px] shadow-lg p-5 '>

      <h1 className='text-[#4461F2] text-xl font-bold'>Quizes</h1>

      <div className='grid gap-5 lg:grid-cols-3 md:grid-cols-1 '>

      {subjects.map((subject,index) => {
      
      return(
        <>   

      <div key={index} className=' relative  mt-5 '>
          
          <Link href={`/Subjectonexam/${subject?._id}`}>
          
          <Image src={subject.icon} alt={subject.name} width={330} height={200} className='rounded-lg '/>
         <div className="absolute inset-0 flex items-end  mb-5 justify-center">
         <div className="bg-[#1935CA66] w-3/4 h-12 rounded-lg text-white  drop-shadow-lg font-bold flex items-center justify-center opacity-90 blur-[27.01]">
             {subject.name}
           </div>
           </div> 
           </Link>  
          </div>
        
        
        
        </>

       



      )




    })}
      </div>
      
      
   
    </div>
    </>
  )}
   