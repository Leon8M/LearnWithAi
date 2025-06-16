"use client";
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Sparkle } from 'lucide-react'


function AddCourseDialog({children}) {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        chapters: 0,
        includeVideo: false,
        difficulty: "",
        category: "",
    });

const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
        ...prevData,
        [field]: value,
    }));
    console.log("Form Data:", formData);
}

const onGenerateCourse = () => {
    console.log("Generating course with data:", formData);
}

  return (
    <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Generate New Course</DialogTitle>
            <DialogDescription asChild>
                <div className='flex flex-col gap-4 mt-4'>
                    <div>
                        <label>Course Name</label>
                        <Input placeholder="Enter course name" onChange={(e) => handleInputChange("name", e?.target.value)} />
                    </div>
                    <div>
                        <label>Course Description (optional)</label>
                        <Textarea placeholder="Enter course description" onChange={(e) => handleInputChange("description", e?.target.value)} />
                    </div>
                    <div>
                        <label>Number of Chapters</label>
                        <Input placeholder="Enter number of chapters" type="number" onChange={(e) => handleInputChange("chapters", e?.target.value)} />
                    </div>
                    <div className='flex items-center gap-2'> 
                        <label>Include video?</label>
                        <Switch  onCheckedChange={() => handleInputChange("includeVideo", !formData?.includeVideo)} />
                    </div>
                    <div className='flex items-center gap-2'> 
                        <label className='mb-2'>What Level of Difficulty?</label>
                            <Select className="mt-1" onValueChange={(value) => handleInputChange("difficulty", value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Difficulty" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="beginner">Beginner</SelectItem>
                                    <SelectItem value="intermediate">Intermediate</SelectItem>
                                    <SelectItem value="advanced">Advanced</SelectItem>
                                </SelectContent>
                            </Select>
                    </div>
                    <div>
                        <label>Category</label>
                        <Input placeholder="Enter category(Separate with a comma)"  onChange={(e) => handleInputChange("category", e?.target.value)} />
                    </div>
                    <div className='flex justify-end mt-4'>
                        <Button onClick={onGenerateCourse}><Sparkle /> Generate Course</Button>
                    </div>
                </div>
            </DialogDescription>
         </DialogHeader>
        </DialogContent>
        </Dialog>
  )
}

export default AddCourseDialog