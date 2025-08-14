export async function GET(){
    return Response.json({ success: true, data: 'THANK YOU!'}, {status: 200});
}

export async function POST(request: Request){
    const ollamaURL = process.env.NEXT_PUBLIC_OLLAMA_URL;
    const { type, category, techstack, amount, userid} = await request.json();

    try {
        const response = await fetch(`${ollamaURL}/api/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gemma:2b",  // or whichever Gemma model you pulled
                prompt: `Prepare questions for a DECA case study. +
                    The category of the case study should be: ${category}.
                    the tech stack used in the scenario is: ${techstack}.
                    The focus between technical and behavioural questions should lead towards: ${type}.
                    The amount of questions required is: ${amount}.
                    Please return only the questions, without any additional text.
                    The questions are going to be read by a voice assistant so do not use "/" or "*" or any special characters that might break the voice assistant.
                    Return the qustions formatted like this:
                    ["Question 1", "Question 2", "Question 3"]
        
                    Thank you! <3 
        `,
                stream: false
            }),
        });

        const interview = {
            type, category,
            techstack: JSON.parse(questions),
            userId: userid,
            finalized: true,
            createdAt: new Date().toISOString()
        };
        await db.collection("interviews").add(interview);

        const data = await response.json();
        return Response.json(data, { status: 200 });
    } catch(error){
        console.error(error);

        return Response.json({ success: false, error}, {status: 500});
    }
}