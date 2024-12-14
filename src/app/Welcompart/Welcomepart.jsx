import React from 'react'
import Image from 'next/image'
import bro from '../../../public/bro.png'

export default function welcomepart() {
  return (
    <>
    
   <div className='container mx-auto flex justify-center flex-col items-center gap-8 h-[1024px] w-5/12 rounded-[15px]  border-[1px] border-solid  border-gray-400]  bg-[#F0F4FC] rounded-tr-[100px] rounded-br-[100px]  '>

    
    <div className='headline flex flex-col gap-4 p-5'>
        <p className='text-4xl font-bold'>Welcome to</p>
        <p className='text-[#122D9C] text-4xl font-bold'>Elevate</p>
        <p> Quidem autem voluptatibus qui quaerat aspernatur
            <br/>
             architecto natus</p>
    </div>
    <div>
        <Image src={bro} alt='' width={300} />
    </div>
   </div>
    
    </>
  )
}
