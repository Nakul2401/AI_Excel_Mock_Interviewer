import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";

const { AzureOpenAI } = require("openai");

export async function POST(req){

    const endpoint = process.env.AZURE_OPENAI_ENDPOINT || "Your endpoint";
    const apiKey = process.env.AZURE_OPENAI_API_KEY || "Your API key";
    const apiVersion = process.env.OPENAI_API_VERSION || "2024-05-01-preview";
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "gpt-4o"; //This must match your deployment name 
    
    const {jobRole,jobDescription,duration,type} = await req.json();
    const FINAL_PROMPT = QUESTIONS_PROMPT
        .replace(/{{jobRole}}/g,jobRole)
        .replace(/{{jobDescription}}/g,jobDescription)
        .replace(/{{duration}}/g,duration)
        .replace(/{{type}}/g,type)

    console.log(FINAL_PROMPT);


    try{
        const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

        const result = await client.chat.completions.create({
            messages: [
            { role: "system", content: "You are an expert senior analyst." },
            { role: "user", content: FINAL_PROMPT },
            ],
            model: "gpt-4o",
            temperature: 0.2
        });

        return NextResponse.json(result.choices[0].message)
    }
    catch(e){
        console.log(e)
        return NextResponse.json(e)
    }
}