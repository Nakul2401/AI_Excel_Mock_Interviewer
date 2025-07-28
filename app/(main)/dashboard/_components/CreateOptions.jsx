import { Phone, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOptions() {
  return (
    <div className='grid grid-cols-2 gap-5'>
        <Link href={'/dashboard/create-interview'} className='bg-white border border-gray-200 rounded-lg p-7 flex justify-between items-center cursor-pointer hover:bg-gray-50'>
            <Video className='p-3 text-primary bg-[#f2d9c4] rounded-lg h-12 w-12'/>
            <div>
                <h2 className='font-bold'>Create New Interview</h2>
                <p className='text-gray-500'>Create AI Interviews and schedule then with candidates</p>
            </div>
        </Link>

        <div className='bg-white border border-gray-200 rounded-lg p-10 flex justify-between items-center hover:bg-gray-50'>
            <Phone className='p-3 text-primary bg-[#f2d9c4] rounded-lg h-12 w-12'/>
            <div>
                <h2 className='font-bold'>Create Phone Screening Call</h2>
                <p className='text-gray-500'>Schedule phone screening call with candidates</p>
            </div>    
        </div>
    </div>
  )
}

export default CreateOptions