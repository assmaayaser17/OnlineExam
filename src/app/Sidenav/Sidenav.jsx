import React from 'react'
import Image from 'next/image'
import finallogo from '../../../public/FinalLogo.png'
import quiz from '../../../public/quiz.png'
import logout from '../../../public/logout.png'

export default function Sidenav() {
  return (
   <>


    
    <div className='  w-[193px] h-[311px] flex flex-col gap-10'>

        <div className='logo'>
            <Image src={finallogo} alt='' className='w-[151px] h-[29px]' />
        </div>

        <div className='flex flex-col gap-5 items-center '>
        <div className='w-[193px] h-[49px] bg-[#4461F2] rounded-[10px] flex justify-center items-center'>
            <p className='text-white font-bold'>Dashboard</p>

        </div>
        <div className='flex flex-col gap-10'>
        <div className='flex gap-10 justify-center'>
        <Image src={quiz} alt=''/>
            <p>Quiz History</p>
           
        </div>
        <div className='flex gap-10'>
            <Image src={logout} alt=''/>
            <p>Log Out</p>
        </div>

        </div>
       

        </div>
        


     </div>

   

  

   
   
   
   </>
  )
}
