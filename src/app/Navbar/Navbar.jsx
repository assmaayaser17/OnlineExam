import React from 'react'
import Link from 'next/link'


export default function Navbar() {
  return (
   <>

  <nav dir='rtl'>

    <div className='container mx-auto  p-5  '>

        <div className='flex gap-5 items-center p-5'>

        <div className='  flex justify-center items-center p-3 text-xl  h-[42px]  text-[#4461F2] rounded-[15px]  border-[1px] border-solid  border-gray-400 '>
            <Link href='/signup'>Register</Link>
        </div>

        <div className='text-[#4461F2] flex justify-center items-center  h-[42px] font-bold text-xl p-5 hover:rounded-[15px]  hover:border-[1px] hover:border-solid hover:border-gray-400'>
            <Link href='/login'>Sigin</Link>
        </div>

        <div>
            <p className='text-xl'>English</p>
        </div>


        </div>

        



    </div>





  </nav>
   
   
   
   
   
   </>
  )
}
