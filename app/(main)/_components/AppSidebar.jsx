"use client"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"

import Image from "next/image"
import { Plus } from "lucide-react"
import Link from "next/link"
import { SideBarOptions } from "@/services/Constants"
import { usePathname } from "next/navigation"
  
  export function AppSidebar() {

    const path = usePathname();
    console.log(path);

    return (
      <Sidebar>
        <SidebarHeader className="flex items-center mt-4">
            <Image src={'/cninja.svg'} alt="logo"
            width={200}
            height={100}
            className='w-[210px] '/>
            <Link href={'/dashboard/create-interview'} className='w-50 mt-5 mb-3'>
            <Button className="w-full h-[40px] cursor-pointer"> <Plus/> Create New Interview </Button>
            </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarContent>
                <SidebarMenu>
                    {SideBarOptions.map((option,index)=>(
                        <SidebarMenuItem key={index} className='p-1'>
                            <SidebarMenuButton asChild className={`p-5 ${path==option.path&&'bg-[#f2d9c4]'}`}>
                                <Link href={option.path}>
                                    <option.icon className={`${path==option.path&&'text-primary'}`}/>
                                    <span className={`text-[16px] font-medium ${path==option.path&&'text-primary'}`}>{option.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }

export default AppSidebar