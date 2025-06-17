import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";

const PROMPT = `Depends on Chapter name and Topic Generate content for each topic in HTML and give response in JSON format.
Schema:{
chapterName:<>,

{
topic:<>,
content:<>
}
}
: User Input:
`

export async function POST(request) {
    const {course, courseName, courseId} = await request.json();

    const promises = course?.chapters?.map(async (chapter) => {
        const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: PROMPT + JSON.stringify(chapter),
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });
  console.log("Raw Gemini Response:", JSON.stringify(response, null, 2));
  const RawResp = response?.candidates?.[0]?.content?.parts?.[0]?.text;
  
 
  
  if (!RawResp) {
    console.error("Invalid Gemini response", response);
    return NextResponse.json({ error: "Invalid Gemini response" }, { status: 500 });
  }
  
    const RawJson = RawResp.replace('```json', '').replace('```', '');
    console.log("🟡 RawResp before parsing:\n", RawJson);
    const JsonResp = JSON.parse(RawJson);


    //Get Youtube videos
    

    return JsonResp;
    })

    const courseJson = await Promise.all(promises);

    return NextResponse.json({
        courseName: courseName,
        courseContent: courseJson
    })
}