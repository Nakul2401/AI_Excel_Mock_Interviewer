"use client"
import { InterviewDataContext } from '@/context/InterviewDataContext'
import React, { useState } from 'react'
import InterviewHeader from './_components/InterviewHeader'

function layout({ children }) {

  const [interviewInfo, setInterviewInfo] = useState();

  return (
    <InterviewDataContext.Provider value={{interviewInfo, setInterviewInfo}}> 
      <div>
          <InterviewHeader />
          {children}
      </div>
    </InterviewDataContext.Provider>
  )
}

export default layout