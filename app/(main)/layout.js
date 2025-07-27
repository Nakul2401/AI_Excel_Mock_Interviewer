import { Chicle } from 'next/font/google'
import React, { Children } from 'react'
import DashboardProvider from './provider'

function Dashboard({children}) {
  return (
    <div className='bg-secondary'>
        <DashboardProvider>
            <div>
                {children}
            </div>
        </DashboardProvider>
    </div>
  )
}

export default Dashboard