"use client"
import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';

const InterviewComplete = () => {
  return (
    <div className="bg-[#f2d9c4] h-screen flex flex-col overflow-hidden">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center space-y-4 py-8 px-6">
        
        {/* Success Icon */}
        <div className="rounded-full bg-white p-4 shadow-lg">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Interview Complete!
        </h1>

        {/* Subheading */}
        <p className="text-lg text-gray-600 text-center max-w-xl -mt-3">
          Thank you for participating in the AI-driven interview with Coding Ninjas
        </p>

        {/* Logo Container */}
        {/* <div className="bg-transparent rounded-xl p-4 shadow-lg border border-gray-200"> */}
          <img
            src="/cninja.svg"
            alt="Coding Ninjas Logo"
            className="w-58 h-auto object-contain mx-auto mt-3 mb-7"
          />
        {/* </div> */}

        {/* What's Next Card */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 w-full max-w-lg">
          <div className="flex items-center justify-center rounded-full bg-blue-100 w-12 h-12 mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>

          <h2 className="text-xl font-bold text-gray-800 text-center mb-3">
            What's Next?
          </h2>
          
          <p className="text-sm text-gray-600 text-center mb-4">
            Our team will review your responses and contact you soon.
          </p>

          {/* Timeline Info */}
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 flex items-center justify-center">
            <Clock className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-blue-800 font-medium text-sm">Response within 4-5 business days</span>
          </div>
        </div>

        {/* Action Message */}
        <div className="bg-transparent">
          <p className="text-black font-medium text-center text-sm">
            ✓ You may now safely close this window
          </p>
        </div>

      </main>
    </div>
  );
};

export default InterviewComplete;