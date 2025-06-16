"use client";
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
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
import { Loader2, Sparkle } from 'lucide-react'
import axios from 'axios';
import { useRouter } from 'next/navigation';


function AddCourseDialog({children}) {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        chapters: 0,
        includeVideo: false,
        difficulty: "",
        category: "",
    });

    const router = useRouter();

        const handleInputChange = (field, value) => {
            setFormData((prevData) => ({
             ...prevData,
                [field]: value,
            }));
            console.log("Form Data:", formData);
        }

        const onGenerateCourse = async() => {
            console.log("Generating course with data:", formData);
            const courseId = uuidv4();
            try {
                setLoading(true);

                const result = await axios.post('/api/generate-course-layout', {
                 ...formData,
                courseId: courseId
                });
                console.log("Course generation result:", result.data);
                setLoading(false);
                router.push('/workspace/edit-course/' + result.data?.courseId);


            } catch (error) {
                console.error("Error generating course:", error);
                setLoading(false);
         }
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
                        <Button onClick={onGenerateCourse} disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : <Sparkle />}
                            Generate Course
                        </Button>
                    </div>
                </div>
            </DialogDescription>
         </DialogHeader>
        </DialogContent>
        </Dialog>
  )
}

export default AddCourseDialog