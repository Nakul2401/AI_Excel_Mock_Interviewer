import { BrainCog, BriefcaseBusinessIcon, Calendar, Code2Icon, LayoutDashboard, List, Settings, User2Icon } from "lucide-react";

export const SideBarOptions=[
    {
        name:'Dashboard',
        icon:LayoutDashboard,
        path:'/dashboard'
    },
    {
        name:'Scheduled Interviews',
        icon:Calendar,
        path:'/scheduled-interview'
    },
    {
        name:'All Interviews',
        icon:List,
        path:'/all-interview'
    },
    {
        name:'Settings',
        icon:Settings,
        path:'/settings'
    },
]

export const InterviewType=[
    {
        name:'Technical',
        icon:BrainCog,
    },
    {
        name:'Behavioral',
        icon:User2Icon,
    },
    {
        name:'Scenario-Based',
        icon:BriefcaseBusinessIcon,
    }
]


export const QUESTIONS_PROMPT = `You are an expert senior analyst interviewer who interviews to hire candidates for Microsoft Excel roles.

Your task is to generate a structured, high-quality set of interview questions based on the following inputs:

- Job Title: {{jobRole}}

- Job Description:{{jobDescription}}

- Interview Duration(in minutes): {{duration}}

- Interview Type: {{type}}

Objectives:
- Analyze the job description to identify key responsibilities, required skills, and expected experience.
    - If interview duration is 5 minutes, then number of questions should be 3-5 (Inlcuding all types).
    - If interview duration is 15 minutes, then number of questions should be between 5 to 8 (Inlcuding all types).
    - If interview duration is 30 minutes, then number of questions should be between 8 to 12 (Inlcuding all types).
    - If interview duration is 45 minutes, then number of questions should be between 12 to 18 (Inlcuding all types).
- Ensure the questions match the tone and structure of a real-life {{type}} interview.
- All Questions should strictly match the type {{type}}. 

Format your response in JSON format with array list of questions.
format: 
{
    interviewQuestions: [
        {
        question:'',
        type:'Technical , Behavioral, Scenario-Based'
        },
        {
        ...
        }
    ]
}

The goal is to create a structured, relevant, and time-efficient set of questions for a {{jobRole}} role.`



export const FEEDBACK_PROMPT = `
{{conversation}}

Your are an Data Analyst with skills in Microsoft Excel who assess interview conversation between assistant and candidate. Depending on above Interview Conversation between assitant and candidate, 
Give me feedback for candidate interview. Give me rating out of 10 for technical Skills, Communication, Problem Solving, Experience.
Also give me brief summary about the interview and one line to let me know whether candidate is recommended to be hired for the role Data Analyst (Microsoft Excel) in company or not with message. 

Give me response in valid JSON format:
{
    feedback:{
        rating:{
            techicalSkills:,
            communication:,
            problemSolving:,
            experience:
        },
        summary:'<brief summary>',
        recommendation:'',
        recommendationMessage:''
    }
}
`
