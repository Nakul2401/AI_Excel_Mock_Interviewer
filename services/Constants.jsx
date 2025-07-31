import { BrainCog, BriefcaseBusinessIcon, Calendar, Code2Icon, LayoutDashboard, List, Settings, User2Icon } from "lucide-react";

export const SideBarOptions=[
    {
        name:'Dashboard',
        icon:LayoutDashboard,
        path:'/dashboard'
    },
    {
        name:'Interview Reports',
        icon:Calendar,
        path:'/scheduled-interview'
    },
    {
        name:'Send Interviews',
        icon:List,
        path:'/all-interview'
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
Your are an Data Analyst with skills in Microsoft Excel who evaluates interview conversation between assistant and candidate.
Below is the interview conversation between the assistant and candidate along with original list of questions which were needed to be asked in the interview.

Conversation:
{{conversation}}

Original questions that were prepared for the role Data Analyst (Microsoft Excel) interview:
{{questionList}}

Depending on above Interview Conversation between assistant and candidate, and original questions provided. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis.

Please score the candidate from 0 to 10 in the following areas. Do not add categories other than the ones provided:
    - **Communication Skills**: Clarity, articulation, structured responses.
    - **Technical Knowledge**: Understanding of key concepts for the role.
    - **Problem-Solving**: Ability to analyze problems and propose solutions.
    - **Role Fit**: Alignment with the job role.
    - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.

Give me detailed go through and summary about the interview, with recommendation Yes or No and one line to let me know whether candidate is recommended to be hired for the role Data Analyst (Microsoft Excel) in company or not in the recommendation message. 
Also give me the total questions answered like example: 5/10

Give me response in valid JSON format:
{
    feedback:{
        score:{
            techicalSkills:,
            communicationSkills:,
            problemSolving:,
            roleFit:,
            confidence&clarity:
        },
        totalQuestionsAnswered:''
        summary:'<detailed go thorugh and  summary>',
        recommendation:'',
        recommendationMessage:''
    }
}
`
