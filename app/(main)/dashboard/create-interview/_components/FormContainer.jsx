import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, {useState} from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

function FormContainer() {

    const jd = "Skills in Microsoft Excel"

    const [jobDescription, setJobDescription] = useState(jd)

    return (
        <div className='p-5 bg-white'>
            <div>
                <h2 className='text-primary font-bold'>Job Role</h2>
                <Input 
                value = "Data Analyst (Microsoft Excel)" 
                readOnly
                className="text-gray-400 cursor-not-allowed mt-2 border-[#f2d9c4]" 
                title="you cannot modify job role" 
                />
            </div>

            <div className='mt-5'>
                <h2 className='text-primary font-bold'>Job Descripition</h2>
                <Textarea 
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Enter job description..."
                    title ="Modify description"
                    className="h-[200px] mt-2 border-[#f2d9c4]"
                />
            </div>
            <div className='mt-5'>
                <h2 className='text-primary font-bold'>Interview Duration</h2>
                <Select>
                    <SelectTrigger className="w-full mt-2 border-[#f2d9c4]">
                        <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5">5 Minutes</SelectItem>
                        <SelectItem value="15">15 Minutes</SelectItem>
                        <SelectItem value="30">30 Minutes</SelectItem>
                        <SelectItem value="45">45 Minutes</SelectItem>
                        <SelectItem value="60">60 Minutes</SelectItem>
                    </SelectContent>
                </Select>
            
            </div>
        </div>
    )
}

export default FormContainer