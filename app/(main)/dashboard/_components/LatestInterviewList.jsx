"use client"
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

function LatestInterviewList() {

    const [interviewList, setInterviewList] = useState([]);

    return (
        <div className='my-5 '>
            <h2 className='font-bold text-2xl'> Previosuly Created Interviews </h2>

            {interviewList?.length==0 &&
                <div className='p-7 flex flex-col gap-3 items-center mt-4 bg-white rounded-xl'>
                    <Video className='h-10 w-10 text-primary'/>
                    <h2> No interviews created at this moment!</h2>
                    <Link href={'/dashboard/create-interview'}>
                    <Button className='cursor-pointer'>+ Create New Interview</Button>
                    </Link>
                </div>
            }

        </div>
    )
}

export default LatestInterviewList