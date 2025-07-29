"use client"
import React, { useContext, useEffect, useState } from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import { Clock, Headset, Info, Loader2Icon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { InterviewDataContext } from '@/context/InterviewDataContext'

function Interview() {

    const {interview_id} = useParams();
    const [interviewData, setInterviewData] = useState();
    const [userName, setUserName] = useState();
    const [candidateEmail, setCandidateEmail] = useState();
    const [loading, setLoading] = useState(false);
    const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);

    const router = useRouter();

    useEffect(() => {

        interview_id&&GetInterviewDetail();

    },[interview_id])

    const GetInterviewDetail = async() => {
        // setLoading(true);
        try{
            let { data: Interviews, error } = await supabase
                .from('Interviews')
                .select('jobRole, jobDescription, duration, type')
                .eq('interview_id',interview_id)

            
            setInterviewData(Interviews[0]);
            // setLoading(false);
            if(Interviews?.length==0){
                toast('Incorrect Interview Link!');
            }
        }
        catch(e){
            // setLoading(false);
            toast('Incorrect Interview Link!');
        }
    }

    const onJoinInterview = async() => {
        setLoading(true);

        let { data: Interviews, error } = await supabase
            .from('Interviews')
            .select('*')
            .eq('interview_id', interview_id)

        // console.log(Interviews[0]);
        setInterviewInfo({
            userName: userName,
            candidateEmail: candidateEmail,
            interviewData: Interviews[0]
        });
        
        router.push('/interview/'+interview_id+'/start')
        setLoading(false);
        
    }

  return (
    <div className='min-h-screen bg-secondary'>
        <div className='pt-30 px-10 md:px-28 lg:px-48 xl:px-64 pb-20'>
            <div className='flex flex-col items-center justify-center border border-primary rounded-lg bg-white p-7 lg:px-33 xl:px-52'>
                <Image src={'/cninja.svg'} alt='logo' width={200} height={100} className='w-[200px] h-auto'/>
                <h2 className='mt-2'>AI-Powered Interview</h2>
                <Image src={'/interview.avif'} alt='interview'
                width={500}
                height={500}
                className='w-[290px] my-6'/>

                <h2 className='font-bold text-xl'>{interviewData?.jobRole}</h2>
                <h2 className='flex gap-2 items-center text-gray-500 mt-2'><Clock className='h-4 w-4'/> {interviewData?.duration}</h2>

                <div className='w-full mt-3 mb-2'>
                    <h2 className='mb-1'>Enter Your Full Name:</h2>
                    <Input placeholder='Full Name' onChange={(event)=>setUserName(event.target.value)}/>
                </div>
                <div className='w-full mt-3'>
                    <h2 className='mb-1'>Enter Your Email:</h2>
                    <Input placeholder='email' onChange={(event)=>setCandidateEmail(event.target.value)}/>
                </div>
                
                <div className='p-4 bg-[#f2d9c4] flex gap-4 rounded-lg mt-10'>
                    <Info className='text-primary'/>
                    <div>
                        <h2 className='font-bold'>Before you begin</h2>
                        <ul className=''>
                            <li className='text-sm text-primary'>- Test your microphone</li>
                            <li className='text-sm text-primary'>- Ensure you have stable internet connection</li>
                            <li className='text-sm text-primary'>- Make sure your surroundings are quiet</li>
                        </ul>
                    </div>
                </div>
                <Button className='mt-5 w-full h-10 font-bold bg-gray-100 text-black border border-primary hover:bg-primary hover:border-0 hover:text-white'
                disabled={!userName}
                onClick={()=>onJoinInterview()}
                >{loading&&<Loader2Icon className='animate-spin'/>}<Headset/> Join Interview</Button>
            </div>
        </div>
    </div>
  )
}

export default Interview