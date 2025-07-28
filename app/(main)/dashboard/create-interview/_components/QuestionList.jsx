import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import axios from 'axios';
import { Loader2, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react'
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';
import { v4 as uuidv4 } from 'uuid';

function QuestionList({formData, onCreateLink}) {

    const [loading, setLoading] = useState(false);
    const [questionList, setQuestionList] = useState();
    const hasGeneratedRef = useRef(false);
    const {user} = useUser();

    const [saveLoading, setSaveLoading] = useState(false);
    useEffect(() => {
        if (formData && !hasGeneratedRef.current) {
            hasGeneratedRef.current = true; 
            GenerateQuestionList();
            // console.log("Hello")
        }
      }, [formData]);

    const GenerateQuestionList = async() => {
        setLoading(true);
        try{
            const result = await axios.post('/api/ai-model',{
                ...formData
            })
            console.log(result.data.content);
            const Content = result.data.content;
            const FINAL_CONTENT = Content.replace('```json','').replace('```','')
            setQuestionList(JSON.parse(FINAL_CONTENT)?.interviewQuestions);
            setLoading(false);
        }
        catch(e){
            console.log(e);
            toast('Server Error, Try Again!')
            setLoading(false);
            hasGeneratedRef.current = false;
        }
    }

    const onFinish = async() => {
        setSaveLoading(true);
        const interview_id = uuidv4();
        const { data, error } = await supabase
            .from('Interviews')
            .insert([
                {
                    ...formData,
                    questionList: questionList,
                    userEmail: user?.email,
                    interview_id: interview_id,
                },
            ])
            .select()
        setSaveLoading(false);

        onCreateLink(interview_id)

        // console.log(data);
    }

    return (
        <div>
            {loading && <div className='p-5 bg-[#f2d9c4] rounded-xl border border-primary flex gap-5 items-center w-full'>
                <Loader2Icon className='animate-spin'/>
                <div>
                    <h2 className='font-medium'> Generating Interview Questions </h2>
                    <p className='text-primary'> Our AI based senior analyst is crafting personalized questions based on your job description </p>
                </div>
            </div>
            }

            {questionList?.length>0&&
            <div>
                <QuestionListContainer questionList={questionList}/>
            </div>
            }

            <div className='flex justify-end mt-5'>
                <Button className="h-10 w-60" onClick={()=>onFinish()} disabled={saveLoading || loading} >
                    {saveLoading&&<Loader2 className='animate-spin'/>} Create Interview Link & Finish </Button>
            </div>
        </div>
    )
}

export default QuestionList