import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import WelcomeContainer from './dashboard/_components/WelcomeContainer'
import AppSidebar from './_components/AppSidebar'

function DashboardProvider({children}) {
  return (
    <SidebarProvider>
        <AppSidebar/>
            <div className='w-full p-10 mt-3'>
                {/* <SidebarTrigger /> */}
                <WelcomeContainer/>
                {children}
            </div>
    </SidebarProvider>
    
  )
}

export default DashboardProvider