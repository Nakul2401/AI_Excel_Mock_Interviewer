"use client"
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner';
import FormContainer from './_components/FormContainer';
import InterviewLink from './_components/InterviewLink';
import QuestionList from './_components/QuestionList';

function CreateInterview() {

    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState();
    const [interviewId,setInterviewId] = useState();

    const onHandleInputChange = (field,value) => {

        setFormData(prev=>({
            ...prev,
            [field]:value
        }))

        console.log('FormData',formData)
    }

    const onGoToNext = () => {
        if(!formData?.jobRole || !formData?.jobDescription || !formData?.duration || !formData?.type){
            toast('Please enter all details!')
            return;
        }
        else{
            setStep(step+1);
        }
        
    }

    const onCreateLink = (interview_id) => {
        setInterviewId(interview_id);
        setStep(step+1); 
    }

    return (
        <div className='mt-8 px-10 md:px-10 lg:px-25 xl:px-35 '>
            <div className='flex gap-5 items-center'>
                <ArrowLeft onClick={()=>router.back()} className='cursor-pointer'/>
                <h2 className='font-bold text-2xl '>Create New Interview</h2>  
            </div>
            <Progress value={step * 33.33} className='my-5'/>
            {step == 1 ?<FormContainer 
                onHandleInputChange={onHandleInputChange}
                GoToNext={()=>onGoToNext()}/>
                : step == 2 ? <QuestionList formData={formData} onCreateLink={(interview_id)=>onCreateLink(interview_id)}/> : 
                step==3 ? <InterviewLink interview_id={interviewId} formData={formData} /> : null}
        </div>
    )
}

export default CreateInterview