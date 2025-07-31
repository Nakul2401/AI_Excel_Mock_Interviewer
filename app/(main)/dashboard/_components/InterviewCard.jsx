
import { Button } from '@/components/ui/button'
import { ArrowRight, Clock, Copy, Mail, Send } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

function InterviewCard({ interview, viewDetail=false }) {

    const url = process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_id
    const copyLink = () => {
        
        navigator.clipboard.writeText(url);
        toast.success('Link Copied',{
            style: {
                background: 'white',
                color: 'black',
                border: '2px solid #198754',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px'
            }
        });
    }

    const onSend = () => {
        window.location.href = `mailto:?subject=${encodeURIComponent("AI Based Microsoft Excel Interview")}&body=${encodeURIComponent("Interview Link: \n\n " + url)}`;
    }

  return (
    <div className='p-5 bg-white rounded-lg border border-primary'>
        <div className='flex items-center justify-between'>
            <h2 className='text'>{moment(interview?.created_at).format('MMMM Do YYYY, h:mm a')}</h2> 
            <h2 className='flex gap-1'><Clock/>{interview?.duration}</h2>
        </div>
        
        {!viewDetail?<div className='grid grid-cols-2 mt-4 justify-center gap-3 items-center'>
            <Button className='text-black border bg-gray-50 hover:border-0 hover:text-white' onClick={copyLink}><Copy/> Copy Link</Button>
            <Button className='text-black bg-primary text-white hover:text-white cursor-pointer' onClick={onSend}><Mail/> Mail</Button>
        </div>:
        <div>
        <h2 className='text-green-600 font-bold mt-2'>{interview['interview-feedback']?.length} Candidates</h2>
        <Link href={'/scheduled-interview/'+interview?.interview_id+'/details'}>
        <Button className='mt-2 w-full text-white text-md bg-primary hover:text-white cursor-pointer'>View Details<ArrowRight/></Button>
        </Link>
        </div>
        }
        
    </div>
  )
}

export default InterviewCard