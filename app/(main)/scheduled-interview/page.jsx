"use client"
import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient'
import { Video } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard';

function ScheduledInterview() {

    const {user} = useUser();
    const [interviewList,setInterviewList] = useState();

    useEffect(()=>{
        user && GetInterviewList();
    },[user])

    const GetInterviewList = async() =>{
        const result = await supabase.from('Interviews')
        .select('created_at,jobRole,duration,interview_id,interview-feedback(candidateEmail)')
        .eq('userEmail', user?.email)
        .order('id',{ascending:false});

        console.log(result.data);
        setInterviewList(result.data);
    }
  return (
    <div className='mt-6'>
        <h2 className='font-bold text-xl'>Interview List with Candidates Report</h2>
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
                    <InterviewCard interview={interview} key={index}
                    viewDetail={true}
                    />
                ))}
            </div>
        }
    </div>
  )
}

export default ScheduledInterview