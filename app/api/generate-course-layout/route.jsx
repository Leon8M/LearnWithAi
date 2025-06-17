import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  GoogleGenAI,
} from '@google/genai';
import axios from 'axios';
import { NextResponse } from 'next/server';

const PROMPT = `Generate Learning Course depends on following details. In which Make sure to add Course Name, Description,Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format Chapter Name, , Topic under each chapters , Duration for each chapters etc, in JSON format only
Schema:
{
"course":{
"name": "string",
"description": "string",
"category": "string",
"difficulty": "string",
"includeVideo": "boolean",
"NoOfChapters": "number",
"bannerImagePrompt": "string",
"chapters": [
{
"chapterName": "string",
"duration": "string",
"topics": [
"string"
]
}
]
}
}
, User Input:`

export const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

export async function POST(req) {
    const {courseId, ...formData} = await req.json();
    const user = await currentUser();

  const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: PROMPT+JSON.stringify(formData),
        },
      ],
    },
  ];

  const result = await ai.models.generateContent({
  model,
  contents,
  generationConfig: config,
});

console.log("Raw Gemini Response:", JSON.stringify(result, null, 2));
const RawResp = result?.candidates?.[0]?.content?.parts?.[0]?.text;
console.log("Raw Gemini Response:", JSON.stringify(result, null, 2));

if (!RawResp) {
  console.error("Invalid Gemini response", result);
  return NextResponse.json({ error: "Invalid Gemini response" }, { status: 500 });
}

  const RawJson = RawResp.replace('```json', '').replace('```', '');
  const JsonResp = JSON.parse(RawJson);

  const ImagePrompt = JsonResp?.course?.bannerImagePrompt;

  //generate image banner
  const bannerImageUrl = await generateImage(ImagePrompt);

  //save all info to database
  const result1 = await db.insert(coursesTable).values({
    ...formData,
    courseJson: JSON.stringify(JsonResp),
    userEmail: user?.primaryEmailAddress?.emailAddress,
    cid: courseId,
    bannerImageUrl: bannerImageUrl,
  });
  return NextResponse.json({courseId: courseId});

}

const generateImage = async (imagePrompt) => {
  const BASE_URL='https://aigurulab.tech';
  const result = await axios.post(BASE_URL+'/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input: imagePrompt,
            model: 'flux',
            aspectRatio:"16:9"//Applicable to Flux model only
        },
        {
            headers: {
                'x-api-key': process?.env?.AI_GURU_LAB_API, // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })
  console.log(result.data.image)
  return result.data.image;
}