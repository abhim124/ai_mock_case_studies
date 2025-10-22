import { getRandomInterviewCover } from "@/lib/utils";
import { openai } from "@ai-sdk/openai"
import {db} from "@/firebase/admin";
import {generateText} from "ai";

export async function GET(){
    return Response.json({ success: true, data: 'THANK YOU!'}, {status: 200});
}

export async function POST(request: Request){
    const { ia, category, amount, userid} = await request.json();

    try {
        const {text: questions } = await generateText({
                    model: openai('openai/gpt-oss-20b'),
                    prompt: `Prepare questions for a DECA case study.
                The category of the case study should be: ${category}.
                The instructional area should be : ${ia}.
                The amount of questions required is: ${amount}.
                Please return only the questions, without any additional text.
                The questions are going to be read by a voice assistant so do not use "/" or "*" or any special characters that might break the voice assistant.
                Return the questions formatted like this:
                ["Question 1", "Question 2", "Question 3"]

        Thank you! <3
        `,

            });

            const interview = {
                category, ia,
                questions: JSON.parse(questions),
                userId: userid,
                finalized: true,
                coverImage: getRandomInterviewCover(),
                createdAt: new Date().toISOString()
            }

            await db.collection("interviews").add(interview);
            return Response.json({ success: true}, {status: 200})
    } catch(error){
        console.error(error);

        return Response.json({ success: false, error}, {status: 500});
    }
}