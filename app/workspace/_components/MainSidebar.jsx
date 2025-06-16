"use client";
import React from 'react'
import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"
import { Button } from '@/components/ui/button';
import { Book, Compass, LayoutDashboard, PencilRulerIcon, UserCircle2Icon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AddCourseDialog from './AddCourseDialog';

const SideOptions = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path:'/workspace'
  },
  {
    title: "Learning",
    icon: Book,
    path:'/workspace/learning'
  },
  {
    title: "Explore Courses",
    icon: Compass,
    path:'/workspace/explore'
  },
  {
    title: "AI Tools",
    icon: PencilRulerIcon,
    path:'/workspace/ai-tools'
  },
  {
    title: "Profile",
    icon: UserCircle2Icon,
    path:'/workspace/profile'
  }
]

function MainSidebar() {

  const path = usePathname()
  return (
    <Sidebar>
      <SidebarHeader className={"p-4"}>
        <Image src="/logo.svg" alt="Logo" width={80} height={80} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup >
          <AddCourseDialog><Button>Create New Course</Button></AddCourseDialog>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideOptions.map((option, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className={'p-5'}>
                    <Link href={option.path} className={`text-[17px]
                      ${path.includes(option.path) && 'text-gray-400 bg-secondary rounded-md'}`}>
                      <option.icon className="mr-2 h-7 w-7" />
                      <span>{option.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default MainSidebar