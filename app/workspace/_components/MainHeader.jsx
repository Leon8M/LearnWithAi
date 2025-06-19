'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import React from 'react';

function MainHeader({ hideSide = false, courseId }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b">
      <div className="flex items-center gap-4">
        {!hideSide && <SidebarTrigger />}
        <Link href="/workspace" className="text-xl font-bold text-primary hover:opacity-80 transition">
          AI LearnHub
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {courseId && (
          <Link href={`/workspace/view-course/${courseId}`}>
            <Button variant="outline">Back to Course</Button>
          </Link>
        )}
        <UserButton />
      </div>
    </div>
  );
}

export default MainHeader;
