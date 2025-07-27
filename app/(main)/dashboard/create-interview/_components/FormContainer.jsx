import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, {useEffect, useState} from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { InterviewType } from '@/services/Constants'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

function FormContainer({onHandleInputChange, GoToNext}) {

    const jobRole = "Data Analyst (Microsoft Excel)";
    const jd = `We are seeking a highly skilled Excel Specialist with advanced proficiency in Microsoft Excel to support our data-driven operations. This role involves working with large datasets, building complex models, automating workflows, and developing dashboards and reports that support key business decisions.
    
Key Responsibilities:
    - Design, develop, and maintain complex Excel spreadsheets for data analysis, reporting, and modeling.
    - Utilize advanced Excel functions such as INDEX-MATCH, SUMIFS, array formulas, and nested logic.
    - Create and manage PivotTables, charts, and dashboards to visualize key metrics.
    - Leverage Power Query and Power Pivot to clean and transform data efficiently.
    - Automate repetitive tasks using Excel Macros (VBA) or built-in automation features.
    - Collaborate with teams to gather requirements and deliver tailored Excel tools and reports.
    - Ensure data accuracy, consistency, and integrity across all reporting outputs.

Requirements:
    - Proven experience working in a data-heavy role using Excel (minimum 3-5 years preferred).
    - Expert-level proficiency in Microsoft Excel, including:
        - Advanced formulas (e.g., INDEX-MATCH, dynamic arrays, XLOOKUP)
        - PivotTables, slicers, and chart creation
        - Power Query and Power Pivot
        - VBA scripting for automation
    - Strong analytical, problem-solving, and attention-to-detail skills.
    - Experience working with large datasets and linking Excel to external data sources (e.g., databases, CSVs, APIs via Power Query).
    - Excellent communication and documentation skills.`;

    const [jobDescription, setJobDescription] = useState(jd);
    const [interviewType, setInterviewType] = useState([]);

    useEffect(() => {
        onHandleInputChange('jobRole', jobRole)
        onHandleInputChange('jobDescription', jd)
    }, [])


    useEffect(() => {
        if(interviewType.length > 0){
            onHandleInputChange('type', interviewType)
        }
    }, [interviewType])

    const handleJobDescriptionChange = (event) => {
        const value = event.target.value;
        setJobDescription(value);
        onHandleInputChange('jobDescription', value);
    }

    const handleInterviewTypeClick = (typeName) => {
        setInterviewType(prev => {
            if (prev.includes(typeName)) {
                return prev.filter(type => type !== typeName)
            } else {
                return [...prev, typeName]
            }
        })
    }

    return (
        <div>
            <div className='p-5 bg-white rounded-2xl'>
                <div>
                    <h2 className='text font-medium'>Job Role</h2>
                    <Input 
                    value = {jobRole}
                    readOnly
                    className="text-gray-500 cursor-not-allowed mt-2 border-[#f2d9c4]" 
                    title="you cannot modify job role" 
                    />
                </div>

                <div className='mt-5'>
                    <h2 className='text font-medium'>Job Descripition</h2>
                    <Textarea 
                        value={jobDescription}
                        onChange={handleJobDescriptionChange}
                        placeholder="Enter job description..."
                        title ="Modify description"
                        className="h-[200px] mt-2 border-[#f2d9c4]"
                    />
                </div>
                <div className='mt-5'>
                    <h2 className='text font-medium'>Interview Duration</h2>
                    <Select onValueChange={(value) => onHandleInputChange('duration',value)}>
                        <SelectTrigger className="w-full mt-2 border-[#f2d9c4]">
                            <SelectValue placeholder="Select Duration" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5 Minutes">5 Minutes</SelectItem>
                            <SelectItem value="15 Minutes">15 Minutes</SelectItem>
                            <SelectItem value="30 Minutes">30 Minutes</SelectItem>
                            <SelectItem value="45 Minutes">45 Minutes</SelectItem>
                        </SelectContent>
                    </Select>
                
                </div>
                <div className='mt-5'>
                    <h2 className='text font-medium'>Interview Types</h2>
                    <div className='flex gap-4 mt-2'>
                        {InterviewType.map((type,index)=>(
                            <div key={index} 
                            className={`flex items-center cursor-pointer gap-2 p-1 px-3 border border-[#f2d9c4] rounded-2xl hover:bg-[#f2d9c4] ${
                                interviewType.includes(type.name) ? 'bg-[#f2d9c4]' : ''
                            }`}
                            onClick={() => handleInterviewTypeClick(type.name)}
                            >
                                <type.icon className='h-4 w-4'/>
                                <span>{type.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex justify-end mt-5' onClick={()=>GoToNext()}>
                <Button className="h-10 w-60 text-md"> 
                    Generate Questions <ArrowRight />
                </Button>
            </div>

        </div>
    )
}

export default FormContainer