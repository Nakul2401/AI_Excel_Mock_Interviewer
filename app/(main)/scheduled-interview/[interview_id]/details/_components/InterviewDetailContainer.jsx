import { Calendar, Clock } from 'lucide-react'
import moment from 'moment'
import React from 'react'

function InterviewDetailContainer({interviewDetail}) {
    return (
        <div className='p-5 bg-white rounded-lg mt-5'>
            <h2 className='font-bold text-lg text-primary'>{interviewDetail?.jobRole}</h2>
            <div className='mt-4 flex items-center justify-between lg:pr-50'>
                <div>
                    <h2 className='text-sm text-gray-500'>Duration</h2>
                    <h2 className='flex text-md font-bold items-center gap-2'><Clock className='h-4 w-4'/> {interviewDetail?.duration}</h2>
                </div>
                <div>
                    <h2 className='text-sm text-gray-500'>Created On</h2>
                    <h2 className='flex text-md font-bold items-center gap-2'><Calendar className='h-4 w-4'/> {moment(interviewDetail?.created_at).format('MMMM Do YYYY, h:mm a')}</h2>
                </div>
                <div>
                    <h2 className='text-sm text-gray-500'>Type</h2>
                    <h2 className='flex text-md font-bold items-center gap-2'><Clock className='h-4 w-4'/> {JSON.parse(interviewDetail?.type || "[]").join(" | ")}</h2>
                </div> 
            </div>
            <div className='mt-5'>
                <h2 className='font-bold text-lg text-primary'>Job Description</h2>
                <div className='p-3 -mt-1'>
                <p style={{ whiteSpace: "pre-wrap" }} className='text-sm p-5 border rounded-lg border-primary'>{interviewDetail?.jobDescription}</p>
                </div>
            </div>

            <div className='mt-5'>
                <h2 className='font-bold text-lg text-primary'>Interview Questions</h2>
                <div className='p-3 -mt-1'>
                <div className='grid grid-cols-2 gap-5 p-5 border rounded-lg border-primary'>
                    {interviewDetail?.questionList.map((item,index) =>(
                        <h2 key={index} className='text-sm leading-5'>{index+1}. {item?.question}</h2>
                    ))}
                </div>
                </div>
            </div>

        </div>
    )
}

export default InterviewDetailContainer