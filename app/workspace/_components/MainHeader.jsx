import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function MainHeader() {
  return (
    <div className='flex items-center justify-between p-4 bg-white shadow-sm'>
        <SidebarTrigger />
        <UserButton />
    </div>
  )
}

export default MainHeader