import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import { max } from "drizzle-orm";
import axios from "axios";
import { coursesTable } from "@/config/schema";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";

const PROMPT = `(
Respond strictly in minified JSON format only, without markdown code blocks or comments.
Avoid HTML tags inside string values. Escape all special characters properly) 
Depends on Chapter name and Topic Generate content for each topic in HTML and give response in JSON format.
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
  //console.log("Raw Gemini Response:", JSON.stringify(response, null, 2));
  const RawResp = response?.candidates?.[0]?.content?.parts?.[0]?.text;
  
 
  
  if (!RawResp) {
    //console.error("Invalid Gemini response", response);
    return NextResponse.json({ error: "Invalid Gemini response" }, { status: 500 });
  }
  
    let RawJson = RawResp.replace(/```json|```/g, '').trim();

    // Trying to fix common bad escapes before parsing
    RawJson = RawJson.replace(/\\([^"ntr\\\/bfu])/g, '\\\\$1')
    console.log("🟡 RawResp before parsing:\n", RawJson);
    const JsonResp = JSON.parse(RawJson);


    //Get Youtube videos

    const youtubeVideos = await getYoutubeVideos(chapter?.chapterName);
    
    console.log({
      youtubeVideos: youtubeVideos,
      courseData: JsonResp
    });

    return {
      youtubeVideos: youtubeVideos,
      courseData: JsonResp
    };
    })

    const courseJson = await Promise.all(promises);

    //Save to db
    const dbResp = await db.update(coursesTable).set({
        courseContent: JSON.stringify(courseJson),
    }).where(eq(coursesTable.cid, courseId));

    return NextResponse.json({
        courseName: courseName,
        courseContent: courseJson
    })
}

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const getYoutubeVideos = async (topic) => {
    const params = {
      part: 'snippet',
      q:topic,
      maxResults: 3,
      type: 'video',
      key: process.env.YOUTUBE_API_KEY,
    }

    const response = await axios.get(YOUTUBE_BASE_URL, { params });
    const youtubeVideoListResponse = response.data.items;
    const youtubeVideoList = [];
    youtubeVideoListResponse.forEach((item) => {
        const video = {
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.default.url,
            videoId: item.id?.videoId
        }
        youtubeVideoList.push(video);
    });
    console.log("Youtube Videos:", youtubeVideoList);
    return youtubeVideoList;

}