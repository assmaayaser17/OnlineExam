
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
import { useRouter } from 'next/navigation';




export default function page() {

  let [apierr,setApierr]=useState(null)
    const router = useRouter();

  function Register(formValue) { 

    setApierr(null)

     axios.post('https://exam.elevateegy.com/api/v1/auth/signup',formValue)
    .then((res) => {
        let {data} =res;
        console.log(data)

        if(data.message == 'success') {
            router.push ('/login')
        }
    })
    .catch((err) =>  {

        setApierr(err.response.data.message)


    })
        
        // console.log(response)




    }

    let myForm = useFormik({
        initialValues:{
            username:'',
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            rePassword:'',
            phone:'',


        },
        onSubmit:Register
        




    })

    
  return (
    <>

    <div className='flex gap-8 '>
        <Welcomepart/>
    <div className='container p-5  flex flex-col  w-7/12'>
     <Navbar/>

     
         <div className='pl-52 text-xl font-bold pb-5'>
            <p>Sign Up</p>
         </div>
    {apierr && <span  className='text-red-600 text-center bg-red-300 mb-5' >
            {apierr}
         </span>}
         

        <form  onSubmit={myForm.handleSubmit}  className='flex flex-col items-center  gap-5'>

    
            <div className='flex flex-col gap-5  items-center '>
            <div>
                <input value={myForm.values.username} onChange={myForm.handleChange} className='p-3 h-[55px] bg-[#F9F9F9]  w-[410px] rounded-[7.93px] focus:border-red-600 border border-[#E0E0E9]  ' name='username' placeholder='user Name' id='username' type='name'/>
            </div>

            <div>
                <input value={myForm.values.firstName} onChange={myForm.handleChange} className='p-3 h-[55px] bg-[#F9F9F9]  w-[410px] rounded-[7.93px] focus:border-red-600 border border-[#E0E0E9]  ' name='firstName' placeholder='First Name' id='firstname' type='name'/>
            </div>
            <div>
                <input value={myForm.values.lastName} onChange={myForm.handleChange} className='p-3 h-[55px] bg-[#F9F9F9] w-[410px] rounded-[7.93px]  border border-[#E0E0E9] ' name='lastName' placeholder='Last Name' id='lastname' type='name'/>
            </div>
            <div>
                <input value={myForm.values.email} onChange={myForm.handleChange} className='p-3 h-[55px] bg-[#F9F9F9] w-[410px] rounded-[7.93px]  border border-[#E0E0E9] ' name='email' placeholder='Email' id='email' type='email'/>
            </div>
            <div>
                <input value={myForm.values.password} onChange={myForm.handleChange} className='p-3 h-[55px] bg-[#F9F9F9] w-[410px] rounded-[7.93px]  border border-[#E0E0E9] ' name='password' placeholder='Password' id='password' type='password'/>
            </div>
            <div>
                <input value={myForm.values.rePassword} onChange={myForm.handleChange} className='p-3 h-[55px] bg-[#F9F9F9] w-[410px] rounded-[7.93px]  border border-[#E0E0E9] ' name='rePassword' placeholder='Confirm Password' id='repassword' type='password'/>
            </div>
            <div>
                <input value={myForm.values.phone} onChange={myForm.handleChange} className='p-3 h-[55px] bg-[#F9F9F9]  w-[410px] rounded-[7.93px] focus:border-red-600 border border-[#E0E0E9]  ' name='phone' placeholder='Phone' id='phone' type='tel'/>
            </div>


            </div>
            <div className='flex '>
                <p>Already have an account?</p>
                <span className='text-[#4461F2]'>login</span>
            </div>
            <button  type='submit' className='p-5 text-white w-[410px] h-[56px] rounded-[20px] bg-[#4461F2]'> Create Account </button>
            

           




        </form>

        <div className='flex flex-col items-center'>

           

            <div className='mt-5 text-gray-400 font-bold'>
                <p>Or Continue With</p>
            </div>

        <div className='icons flex  justify-center gap-5 mt-5'>

<div className=' rounded-[15.38px] bg-[#FFFFFF] w-[65px] h-[64px] flex justify-center items-center border border-[#E0E0E9] shadow-inner '>
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
