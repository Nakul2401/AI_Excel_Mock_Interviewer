"use client"
import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import { Video } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard';

function AllInterviews() {
    const [interviewList, setInterviewList] = useState([]);
    const {user} = useUser();

    useEffect(()=>{
        GetInterviewList();
    },[user])

    const GetInterviewList = async() => {
        let { data: Interviews, error } = await supabase
        .from('Interviews')
        .select('*')
        .eq('userEmail', user?.email)
        .order('id',{ascending:false})

        console.log(Interviews);
        setInterviewList(Interviews);
    }

    return (
        <div className='my-5 '>

            <div className='mt-10 flex gap-2'>
            <h2 className='font-bold text-2xl'> All Created Interviews for</h2>
            <h2 className='font-bold text-2xl text-primary'> Data Analyst (Microsoft Excel) </h2>
            </div>

            {interviewList?.length==0 &&
                <div className='p-7 flex flex-col gap-3 items-center mt-4 bg-white rounded-xl'>
                    <Video className='h-10 w-10 text-primary'/>
                    <h2> No interviews created at this moment!</h2>
                    <Link href={'/dashboard/create-interview'}>
                    <Button className='cursor-pointer'>+ Create New Interview</Button>
                    </Link>
                </div>}

            {interviewList && 
                <div className='grid grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
                    {interviewList.map((interview,index)=>(
                        <InterviewCard interview={interview} key={index}/>
                    ))}
                </div>
            }

        </div>
    )
}

export default AllInterviews