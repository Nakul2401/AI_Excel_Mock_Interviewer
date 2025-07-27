"use client"
import { useUser } from '@/app/provider'
import React from 'react'
import Image from 'next/image';

function WelcomeContainer() {

    const {user} = useUser();

    return (
        <div className='bg-white rounded-xl p-6 flex justify-between items-center'>
            <div>
                <h2 className='text-lg font-bold'> Welcome Back, {user?.name}</h2>
                <h2 className='text-gray-500'>AI-Powered Excel Interviewer, Hassel-Free Hiring</h2>
            </div>
            {user&& <Image src={user?.picture} alt='userAvatar' width={50} height={50} className='rounded-full mr-2'/>}
        </div>
    )
}

export default WelcomeContainer