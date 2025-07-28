import React from 'react'
import Image from 'next/image'

function InterviewHeader() {
  return (
    <div className='fixed top-0 left-0 right-0 p-4 shadow-sm w-full bg-white'>
        <Image src={'/cninja.svg'} alt='logo' width={200} height={100} className='w-[170px] h-auto ml-4'/>
    </div>
  )
}

export default InterviewHeader