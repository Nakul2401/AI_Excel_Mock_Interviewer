"use client"
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { Loader2Icon, Mic, Mic2, Mic2Icon, MicIcon, PhoneOff, Timer } from 'lucide-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Vapi from '@vapi-ai/web';
import AlertConfirmation from './_components/AlertConfirmation';
import { toast } from 'sonner';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';

const CallStatus = {
    INACTIVE: 'INACTIVE',
    CONNECTING: 'CONNECTING',
    ACTIVE: 'ACTIVE',
    FINISHED: 'FINISHED'
};

function StartInterview() {

    const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);

    // const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    const [activeUser, setActiveUser] = useState(false);
    const [conversation, setConversation] = useState();
    const [assistantTranscript, setAssistantTranscript] = useState(''); // New state for transcript
    const [userTranscript, setUserTranscript] = useState(''); // New state for user transcript
    const {interview_id} = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isCallActive, setIsCallActive] = useState(CallStatus.INACTIVE);

    const vapiRef = useRef(null);
    
    useEffect(() => {
        return () => {
          if (vapiRef.current) {
            vapiRef.current.destroy?.();
          }
        };
      }, []);

    useEffect(()=>{
        if(interviewInfo && vapiRef.current){ 
            startCall();
        }
    },[interviewInfo])

    
    useEffect(() => {
        if (isCallActive === CallStatus.FINISHED){
            GenerateFeedback();
        }
    }, [isCallActive]);

    // Setup event listeners
    useEffect(() => {

        if (!vapiRef.current) {
            vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
        }
        
        const vapi = vapiRef.current;

        const handleMessage = (message) => {
            console.log('Message', message);
            
            // Handle transcript messages
            if (message?.type === 'transcript') {
                if (message.role === 'assistant') {
                    setAssistantTranscript(message.transcript);
                } else if (message.role === 'user') {
                    setUserTranscript(message.transcript);
                }
            }
            
            if (message?.conversation){
                const convoString = JSON.stringify(message.conversation);
                console.log('Conversation string:', convoString);
                setConversation(convoString);
            }
        };

        const handleCallStart = () => {
            console.log('Call has started.');
            setIsCallActive(CallStatus.ACTIVE);
            toast('Call Connected...');
        };

        const handleCallEnd = () => {
            console.log('Call has ended.');
            setIsCallActive(CallStatus.FINISHED);
            setAssistantTranscript(''); // Clear transcript when call ends
            setUserTranscript('');
        };

        const handleSpeechStart = () => {
            console.log('Assistant Speech has started.');
            setActiveUser(false);
        };

        const handleSpeechEnd = () => {
            console.log('Assistant Speech has ended.');
            setActiveUser(true);
            // Clear assistant transcript when speech ends
            setAssistantTranscript('');
        };

        const handleError = (error) => {
            console.log('Error', error);
            
            const errorMessage = error?.error?.message || 
                                error?.message || 
                                error?.error?.error?.message || 
                                JSON.stringify(error);
            
            if (errorMessage?.includes('Wallet Balance') || 
                errorMessage?.includes('credits') || 
                errorMessage?.includes('insufficient funds') ||
                errorMessage?.includes('quota') ||
                error?.error?.status === 400 ||
                error?.response?.status === 402) { // Payment required status
                toast.error('Error starting call, Insufficient VAPI credits. ');
            }
        };

        vapi.on('call-start', handleCallStart);
        vapi.on('call-end', handleCallEnd);
        vapi.on("message", handleMessage);
        vapi.on('speech-start', handleSpeechStart);
        vapi.on('speech-end', handleSpeechEnd);
        vapi.on('error', handleError)
        

        return () => {
            vapi.off("call-start", handleCallStart);
            vapi.off("call-end", handleCallEnd);
            vapi.off("message", handleMessage);
            vapi.off("speech-start", handleSpeechStart);
            vapi.off("speech-end", handleSpeechEnd);
        };
    }, []);

    const startCall = async() => {

        const vapi = vapiRef.current;
        if (!vapi) {
            console.warn("Vapi not initialized yet");
            return;
        }

        setIsCallActive(CallStatus.CONNECTING);

        let questionList = "";
        interviewInfo?.interviewData?.questionList.forEach((item, index) => {
            questionList += item?.question + (index < interviewInfo.interviewData.questionList.length - 1 ? ", " : "");
        });

        const assistantOptions = {
            name: "AI Recruiter",
            firstMessage: "Hi "+interviewInfo?.userName+", how are you? Ready for your interview on "+interviewInfo?.interviewData?.jobRole+" ?",
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            voice: {
                provider: "playht",
                voiceId: "jennifer",
            },
            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `
        You are an AI voice assistant conducting interviews for the company Coding ninjas.
        Your job is to ask candidates provided interview questions, assess their responses.
        Make sure to start the conversation with a friendly introduction, setting a relaxed yet professional tone like example:
        "Thank you for applying for the position `+interviewInfo?.interviewData?.jobRole+` in Coding ninjas, Welcome to the interview. Let's get started with a few questions!"
        Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below are the questions ask one by one:
        Questions: `+questionList+`
        If the candidate struggles, offer hints or rephrase the question without giving away the answer.
        Provide brief, encouraging feedback after each answer. Example:
        "Nice! That's a solid answer."
        "Hmm, not quite! Want to try again?"
        Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
        After all the questions, wrap up the interview smoothly by summarizing their performance. Example:
        "That was great! You handled some tough questions well. Keep sharpening your skills!"
        End on a positive note like example:
        "Thanks for interviewing with us. Hope to see you crushing projects soon!"
        Key Guidelines:
        ✅ Be friendly, engaging, and witty 🎤
        ✅ Keep responses short and natural, like a real conversation
        ✅ Adapt based on the candidate's confidence level
        ✅ Ensure the interview remains focused on provided questions and specified position `+interviewInfo?.interviewData?.jobRole+`
        `.trim(),
                    },
                ],
            },
        };
       
        await vapi.start(assistantOptions);
        
    }

    const stopInterview = async () => {

        if (isCallActive !== CallStatus.ACTIVE) return;

        const vapi = vapiRef.current;
        setIsCallActive(CallStatus.FINISHED)
        vapi.stop();
        toast('Interview ended... please wait...');

    }

    const GenerateFeedback = async() => {

        if (loading) return; // Prevent multiple calls
        setLoading(true);
        
        try {
            if(!conversation){
                router.replace('/interview/'+interview_id+"/completed");
                return;
            }

            const conversationArray = JSON.parse(conversation);
            const filteredArray = conversationArray.slice(1);
            
            const result = await axios.post('/api/ai-feedback', {
                conversation: JSON.stringify(filteredArray)
            });

            console.log(result?.data);
            const Content = result.data.content;
            const FINAL_CONTENT = Content.replace('```json','').replace('```','');
            console.log(FINAL_CONTENT);

            // Save to Database
            const { data, error } = await supabase
                .from('interview-feedback')
                .insert([
                    {
                    userName: interviewInfo.userName, 
                    candidateEmail: interviewInfo.candidateEmail,
                    interview_id: interview_id,
                    feedback: JSON.parse(FINAL_CONTENT),
                    recommendation: false,
                    conversation: JSON.stringify(filteredArray)
                    },
                ])
                .select();
            
            if (error) {
                console.error('Database error:', error);
            } else {
                console.log('Feedback saved:', data);
            }
        
            router.replace('/interview/'+interview_id+"/completed");
        } catch (error) {
            console.error('Error generating feedback:', error);
            toast.error('Error generating feedback');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='bg-[#f2d9c4] min-h-screen'>
            <div className='pt-30 p-20 lg:px-40 xl:px-44'>
                <h2 className='font-bold text-xl flex justify-between'>AI Interview Session
                    <span className='flex gap-2 items-center'>
                        <Timer />
                            00:00:00
                    </span>
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
                    <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center relative'>
                        <div className='relative'>
                            {!activeUser&&<span className='absolute inset-0 rounded-full bg-primary opacity-75 animate-ping'/>}
                            <Image src={'/ai_avatar.jpeg'} alt='aiavatar'
                            width={100}
                            height={100}
                            className='rounded-full w-[80px] h-[80px] object-cover'/>
                        </div>
                        <h2 className='font-medium'>AI Recruiter (Agent)</h2>
                        
                        {/* Assistant Transcript Display */}
                        {assistantTranscript && (
                            <div className='absolute bottom-4 left-4 right-4 bg-gray-100 p-4 rounded-lg border-l-4 border-blue-500'>
                                <p className='text-sm text-black italic leading-relaxed'>"{assistantTranscript}"</p>
                            </div>
                        )}
                    </div>

                    <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center relative'>
                        <div className='relative'>
                        {activeUser&&<span className='absolute inset-0 rounded-full bg-primary opacity-75 animate-ping'/>}
                            <h2 className='text-3xl bg-primary p-5 px-7.5 text-white rounded-full'>{interviewInfo?.userName[0]}</h2>
                        </div>
                        <h2 className='font-medium'>{interviewInfo?.userName}</h2>
                        
                        {/* User Transcript Display */}
                        {userTranscript && (
                            <div className='absolute bottom-4 left-4 right-4 bg-gray-100 p-4 rounded-lg border-l-4 border-primary'>
                                <p className='text-sm text-black italic leading-relaxed'>"{userTranscript}"</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex items-center justify-center flex-col mt-8'>
                    {/* <Mic className='h-14 w-14 p-4 bg-primary rounded-full text-white cursor-pointer'/> */}
                    {loading ? (
                        <Loader2Icon className='h-15 w-15 p-4 animate-spin text-gray-500'/>
                    ) : (
                        <PhoneOff 
                            className={`h-14 w-30 p-4 bg-red-600 rounded-lg text-white cursor-pointer hover:bg-red-700 transition-colors ${
                                isCallActive !== CallStatus.ACTIVE ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            onClick={stopInterview}
                        />
                    )}
                    <h2 className='mt-9 text-gray-500'>Interview in process...</h2>
                </div>
            </div>
        </div>
    )
}

export default StartInterview