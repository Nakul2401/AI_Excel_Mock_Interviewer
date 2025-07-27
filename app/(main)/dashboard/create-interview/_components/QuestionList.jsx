import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react'
import { toast } from 'sonner';

function QuestionList({formData}) {

    const [loading, setLoading] = useState(false);
    const [questionList, setQuestionList] = useState();
    const hasGeneratedRef = useRef(false);

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

    return (
        <div>
            {loading && <div className='p-5 bg-[#f2d9c4] rounded-xl border border-primary flex gap-5 items-center w-full'>
                <Loader2Icon className='animate-spin'/>
                <div>
                    <h2 className='font-medium'> Generating Interview Questions </h2>
                    <p className='text-primary'> Our AI is crafting personalized questions based on your job description </p>
                </div>
            </div>
            }

            {questionList?.length>0&&
                <div className='p-5 border border-orange-300 rounded-xl bg-white'>
                    {questionList.map((item,index)=>(
                        <div key={index} className='p-3 border border-orange-300 rounded-xl mb-3'>
                            <h2 className='font-medium'>{item.question}</h2>
                            <h2 className='text-sm mt-1 text-gray-500'>{item?.type}</h2>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default QuestionList