"use client"
import { InterviewDataContext } from '@/context/InterviewDataContext';
import React, { useContext } from 'react'

function StartInterview() {

    const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);
    
    // console.log(interviewInfo);
    return (
        <div>StartInterview</div>
    )
}

export default StartInterview