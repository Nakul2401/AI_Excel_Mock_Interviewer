import { Button } from '@/components/ui/button'
import moment from 'moment'
import React from 'react'
import CandidateFeedbackDialog from './CandidateFeedbackDialog'

function CandidateList({candidateList}) {
  return (
    <div className=''>
        <h2 className='font-bold my-5 text-2xl'>Candidates ({candidateList?.length})</h2>
        {candidateList?.map((candidate,index)=>(
            <div key={index} className='p-5 flex gap-3 items-center justify-between bg-white rounded-lg mb-4 '>
                <div className='flex items-center gap-5'>
                    <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium">
                        {candidate?.userName?.[0] ?? "?"}
                    </div>
                    <div>
                        <h2 className='font-bold'>{candidate.userName}</h2>
                        <h2 className='text-sm text-gray-500'>Completed On: {moment(candidate?.created_at).format('MMMM Do YYYY, h:mm a')}</h2>
                    </div>
                </div>
                <div className='flex gap-5 items-center'>
                    <h2 className='text-primary font-medium text-lg'>{candidate?.feedback?.feedback?.score?.roleFit}/10</h2>
                    <CandidateFeedbackDialog candidate={candidate}/>
                </div>
            </div>
        ))}
        
    </div>
  )
}

export default CandidateList