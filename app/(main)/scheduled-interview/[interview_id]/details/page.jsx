"use client"
import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CandidateList from './_components/CandidateList';
import InterviewDetailContainer from './_components/InterviewDetailContainer';

function InterviewDetail() {

    const{interview_id} = useParams();
    const {user} = useUser();
    const [interviewDetail, setInterviewDetail] = useState();


    useEffect(()=>{
        user&&GetInterviewDetail();
    },[user])

    const GetInterviewDetail = async() => {
        const result = await supabase.from('Interviews')
        .select('created_at, jobRole,jobDescription, type,questionList,duration,interview_id,interview-feedback(created_at,candidateEmail,userName,feedback,conversation,interviewDuration)')
        .eq('userEmail', user?.email)
        .eq('interview_id',interview_id);

        setInterviewDetail(result?.data[0]);

        console.log(result?.data[0])

    }

  return (
    <div className='mt-5'>
        <h2 className='font-bold text-2xl'>Interview Details (Microsoft Excel)</h2>
        <InterviewDetailContainer interviewDetail={interviewDetail}/>
        <CandidateList candidateList={interviewDetail?.['interview-feedback']}/>
    </div>
  )
}

export default InterviewDetail