'use client'
import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Welcomepart from '../Welcompart/Welcomepart'
import Image from 'next/image'
import google from '../../../public/google.png'
import twitter from '../../../public/twitter.png'
import facebook from '../../../public/facebook.png'
import apple from '../../../public/apple.png'
import { useFormik } from 'formik'
import axios from 'axios'
import {signIn} from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'







export default function page() {

    let [apierr,setApierr]=useState(null)
 const router = useRouter()
   


    const handelSubmit = async (values) => {

    const login= await signIn('credentials', {
            email:values.email,
            password:values.password,
            callbackUrl:'/',
            redirect:false





        })

        if(login?.ok) {

            router.push('/')



            
        }

        console.log(login)




    }






 let myForm= useFormik({
 
     initialValues:{
 
         email:'',
         password:''
 
 
 
     },
 
     onSubmit:handelSubmit
 
 
 
 
 })
 
   return (
     <>
 
 <div className='flex gap-8 '>
         <Welcomepart/>
     <div className='container p-5  flex flex-col  w-7/12'>
      <Navbar/>
 
      
          <div className='pl-52 text-xl font-bold pb-5'>
             <p>Sign in</p>
          </div>

          {apierr && <span  className='text-red-600 text-center bg-red-300 mb-5' >
            {apierr}
         </span>}
         <form  onSubmit={myForm.handleSubmit}  className='flex flex-col items-center  gap-5'>
             <div className='flex flex-col gap-5  items-center '>
 
            
             <div>
                 <input  onChange={myForm.handleChange} value={myForm.values.email} className='p-3 h-[55px] bg-[#F9F9F9] w-[410px] rounded-[7.93px]  border border-[#E0E0E9] ' name='email' placeholder='Email' id='email' type='email'/>
             </div>
             <div>
                 <input  onChange={myForm.handleChange}  value={myForm.values.password} className='p-3 h-[55px] bg-[#F9F9F9] w-[410px] rounded-[7.93px]  border border-[#E0E0E9] ' name='password' placeholder='Password' id='password' type='password'/>
             </div>
             
 
 
             </div>
 
             <div>
             <div className='flex flex-col items-end text-[#4461F2] '>
                 <Link href='/forgotpassword'>
                 <p>Recover Password?</p>
                 </Link>
 
                 
                 
             </div>
             <button type='submit' className='p-5 mt-7 text-white w-[410px] h-[56px]  rounded-[20px] bg-[#4461F2]'> Sign In </button>
 
             </div>
             
            
         </form>
 
         <div className='flex flex-col items-center'>
 
            
 
             <div className='mt-5 text-gray-400 font-bold'>
                 <p>Or Continue With</p>
             </div>
 
         <div className='icons flex  justify-center gap-5 mt-5'>
 
 <div  onClick={async() => signIn("google", { callbackUrl: "/" })} className=' rounded-[15.38px] bg-[#FFFFFF] w-[65px] h-[64px] flex justify-center items-center border border-[#E0E0E9] shadow-inner '>
     <Image src={google}  
     alt=''
     
     
     />
 
 </div>
 
 <div className=' rounded-[15.38px] bg-[#FFFFFF] w-[65px] h-[64px] flex justify-center items-center border border-[#E0E0E9] shadow-inner '>
     <Image src={twitter} 
     alt=''
     
     
     />
 
 </div>
 
 <div className=' rounded-[15.38px] bg-[#FFFFFF] w-[65px] h-[64px] flex justify-center items-center border border-[#E0E0E9] shadow-inner '>
     <Image src={facebook} 
     alt=''
     
     
     />
 
 </div>
 
 <div className=' rounded-[15.38px] bg-[#FFFFFF] w-[65px] h-[64px] flex justify-center items-center border border-[#E0E0E9] shadow-inner '>
     <Image src={apple} 
     alt=''
     
     
     />
 
 </div>
 
         </div>
 
 
         </div>
         
      </div>
 
      
 
 
     </div>
     
     
     
     
     
     
     
     
     
     
     
     
     
     </>
   )

    
 }



