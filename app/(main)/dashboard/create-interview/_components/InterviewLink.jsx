import { ArrowLeft, CircleCheckBig, Clock, Copy, List, Mail, MessageCircle, MessageCircleMore, Plus, Slack } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { toast } from 'sonner'
import { supabase } from '@/services/supabaseClient'

function InterviewLink({ interview_id, formData}) {

    const [questionCount, setQuestionCount] = useState(0);

    const url = process.env.NEXT_PUBLIC_HOST_URL+'/'+interview_id
    const GetInterviewUrl = () => {
        const url = process.env.NEXT_PUBLIC_HOST_URL+'/'+interview_id
        return url;
    }

    const onCopyLink = async() => {
        await navigator.clipboard.writeText(url);
        toast('Link Copied', {
            style: {
                background: 'white',
                color: 'black',
                border: '2px solid #00FF00',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px'
            }
        });
    }

    const onShareLink = () => {
        toast('Feature not configured!, You can copy link')
    }

    const numbersOfQuestions = async() => {
        let { data: Interviews, error } = await supabase
        .from('Interviews')
        .select('questionList')
        .eq('interview_id', interview_id)

        if (Interviews && Interviews.length > 0) {
            const questionList = Interviews[0].questionList;
            const questions = typeof questionList === 'string' 
                ? JSON.parse(questionList) 
                : questionList;
            
            const count = questions?.interviewQuestions?.length || questions?.length || 0;
            setQuestionCount(count);
        }
    }

    useEffect(() => {
        if (interview_id) {
            numbersOfQuestions();
        }
    }, [interview_id]);
 
  return (
    <div className='flex flex-col justify-center items-center mt-12'>
        <CircleCheckBig className='w-[50px] h-[50px]'/>
        <h2 className='font-bold text-lg mt-4'>Your AI Interview is Ready</h2>
        <p className='mt-2'> Share this link with your candidates to start the interview process </p>

        <div className='w-full p-7 mt-6 rounded-lg bg-white'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-medium '>Interview Link</h2>
                <h2 className='p-1 px-2 text-primary text-sm bg-[#f2d9c4] rounded-4xl'>Valid for 30 Days</h2>
            </div>

            <div className='mt-3 flex gap-3 items-center'>
                <Input defaultValue={GetInterviewUrl()} disabled={true} />
                <Button className='w-[140px] cursor-pointer' onClick={()=>onCopyLink()}><Copy /> Copy Link</Button>
            </div>

            <hr className='mt-7 mb-4'/>

            <div className='flex gap-5'>
                <h2 className='text-sm text-gray-500 flex gap-1 items-center'><Clock className='h-4 w-4'/>{formData?.duration}</h2>
                <h2 className='text-sm text-gray-500 flex gap-1 items-center'><List className='h-4 w-4'/>{questionCount} Questions</h2>
            </div>
        </div>

        <div className='mt-5 bg-white p-7 rounded-lg w-full'>
            <h2 className='font-bold'>Share Via </h2>
            <div className='flex mt-3 justify-between items-center'>
                <Button className='w-60 border border-primary text-black bg-white hover:bg-primary hover:text-white hover:border-0' onClick={()=>onShareLink()}><Mail/> Email</Button>
                <Button className='w-60 border border-primary text-black bg-white hover:bg-primary hover:text-white hover:border-0' onClick={()=>onShareLink()}><MessageCircleMore/> Whatsapp</Button>
                <Button className='w-60 border border-primary text-black bg-white hover:bg-primary hover:text-white hover:border-0' onClick={()=>onShareLink()}><Slack/> Slack</Button>
            </div>
        </div>

        <div className='mt-5 flex w-full justify-between'>
            <Link href={'/dashboard'}>
                <Button className='w-70 h-11 border text-black bg-white hover:bg-primary hover:text-white hover:border-0'> <ArrowLeft/> Back to Dashboard</Button>
            </Link>
            {/* <Link href={'/dashboard/create-interview'}>
                <Button className='w-70 h-11'> <Plus/> Create Another Interview</Button>
            </Link> */}
        </div>
    </div>

  )
}

export default InterviewLink