import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import moment from 'moment'
import { Progress } from '@/components/ui/progress'

function CandidateFeedbackDialog({candidate}) {
    const feedback = candidate?.feedback?.feedback


    const formatTranscript = (conversation) => {
        if (!conversation) return "No transcript available";
        
        try {
            const transcriptData = typeof conversation === 'string' 
                ? JSON.parse(conversation) 
                : conversation;

            if (Array.isArray(transcriptData)) {
                return transcriptData.map((message, index) => (
                    <div key={index} className={`mb-4 flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                        <div className={`max-w-[70%] p-3 rounded-lg ${
                            message.role === 'assistant' 
                                ? 'bg-blue-50 border-l-4 border-blue-400' 
                                : 'bg-green-50 border-r-4 border-green-400'
                        }`}>
                            <div className={`font-semibold text-sm mb-1 ${
                                message.role === 'assistant' ? 'text-blue-700' : 'text-green-700'
                            }`}>
                                {message.role === 'assistant' ? 'Interviewer Agent' : 'Candidate'}
                            </div>
                            <div className="text-gray-800">{message.content}</div>
                        </div>
                    </div>
                ));
            }
        } catch (error) {

            return conversation;
        }
        
        return conversation;
    };

    return (
        <Dialog> 
            <DialogTrigger asChild>
                <Button className='bg-white text-black border border-primary hover:text-white hover:bg-primary hover:font-bold hover:h-11 '>
                    View Report 
                </Button>
            </DialogTrigger>
            <DialogContent className="p-6 max-h-[85vh] overflow-y-auto"  
            style={{ width: '100%',maxWidth: '900px'}}>
                <DialogHeader>
                    <DialogTitle className='text-3xl'>Candidate Report</DialogTitle>
                    <DialogDescription asChild>
                        <div className='mt-3'>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-5'>
                                    <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium">
                                        {candidate?.userName?.[0] ?? "?"}
                                    </div>
                                    <div>
                                        <h2 className='font-bold text-2xl text-black'>{candidate.userName}</h2>
                                        <h2 className='text-sm text-gray-500'>Email ID: {candidate?.candidateEmail}</h2>
                                        <h2 className='text-sm font-bold text-gray-500'>Completed On: {moment(candidate?.created_at).format('MMMM Do YYYY, h:mm a')}</h2>
                                        <h2 className='text-sm font-bold text-gray-500'>Interview Duration: {candidate?.interviewDuration}</h2>
                                    </div>
                                </div>
                                <div className='items-right text-right'>
                                    <h2 className='text-blue-500 font-bold text-2xl mb-2'>Role Fit: {candidate?.feedback?.feedback?.score?.roleFit}/10</h2>
                                </div>
                            </div>
                            
                            <div className='mt-5'>
                                <h2 className='font-bold text-lg'>Skills Assessment</h2>
                                <div className='mt-3 grid grid-cols-2 gap-10'>
                                    <div>
                                        <h2 className='flex justify-between'>Technical skills<span>{feedback?.score?.technicalSkills}/10</span></h2>
                                        <Progress value={feedback?.score?.technicalSkills * 10} className='mt-1'/>
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Communication skills<span>{feedback?.score?.communicationSkills}/10</span></h2>
                                        <Progress value={feedback?.score?.communicationSkills * 10} className='mt-1'/>
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Problem Solving skills<span>{feedback?.score?.problemSolving}/10</span></h2>
                                        <Progress value={feedback?.score?.problemSolving * 10} className='mt-1'/>
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Confidence & Clarity<span>{feedback?.score?.['confidence&clarity']}/10</span></h2>
                                        <Progress value={feedback?.score?.['confidence&clarity'] * 10} className='mt-1'/>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='mt-5'>
                                <h2 className='font-bold text-lg'>Performance Summary</h2>
                                <div className='p-4 bg-secondary mt-1 rounded-md'>
                                    <p className='font-bold mb-1 text-md'>Total Answered Questions: {feedback?.totalQuestionsAnswered}</p>
                                    <p className='text-justify text-md'>{feedback?.summary}</p>
                                </div>
                            </div>

                            <div className={`p-4 rounded-md mt-5 ${feedback?.recommendation == 'No' ? 'bg-red-100':'bg-green-100'}`}>
                                <h2 className={`font-bold mb-1 ${feedback?.recommendation == 'No' ? 'text-red-700':'text-green-700'}`}>Recommendation:</h2>
                                <p className={`${feedback?.recommendation == 'No' ? 'text-red-500':'text-green-500'}`}>{feedback?.recommendationMessage}</p>
                            </div>

                            <div className='mt-5'>
                                <h2 className='font-bold text-2xl text-primary mb-3'>Interview Transcript</h2>
                                <div className='bg-white border rounded-lg p-4 max-h-96 overflow-y-auto'>
                                    {formatTranscript(candidate?.conversation)}
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CandidateFeedbackDialog