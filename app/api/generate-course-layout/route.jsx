import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  GoogleGenAI,
} from '@google/genai';
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
"chapters": "number",
"bannerImagePrompt": "string",
"chapter": [
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

export async function POST(req) {
    const formData = await req.json();
    const user = currentUser();

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
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

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  
  console.log("Response:", response.candidates[0].content.parts[0].text);
  const RawResp = response?.candidates[0]?.content?.parts[0]?.text;
  const RawJson = RawResp.replace('```json', '').replace('```', '');
  const JsonResp = JSON.parse(RawJson);


  //save all info to database
  ///const result = await db.insert(coursesTable).values({
   /// ...formData,
  ///  courseJson: response.text(),
  ///  userEmail: user?.primaryEmailAddress?.emailAddress,
 /// });
  return NextResponse.json(JsonResp);

}