import React from 'react'
import CreateOptions from './_components/CreateOptions'
import LatestInterviewList from './_components/LatestInterviewList'
import WelcomeContainer from './_components/WelcomeContainer'

function Dashboard() {
  return (
    <div>
      {/* <WelcomeContainer /> */}
      <h2 className='my-5 font-bold text-2xl '> Dashboard </h2>
      <CreateOptions />
      <LatestInterviewList/>
    </div>
  )
}

export default Dashboard