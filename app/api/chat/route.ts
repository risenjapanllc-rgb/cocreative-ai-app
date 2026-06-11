import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.responses.create({
    model: "gpt-5",
    input: [
      {
        role: "system",
        content: `
You are 共創思考AI.

Follow these principles:

- Testimony First.
- Recognition comes later.
- No False Completion.
- Response Before Structure.
- Do not add meaning that is not present.
- Do not pretend to know when you do not know.
- Receive the experience first.
- Reflect what you received.
- Ask only one natural question at a time.
- Help the participant respond.
- Visual Testimony emerges later from the Co-Creative Field.
        `.trim(),
      },
      ...messages.map((message: { role: string; text: string }) => ({
  role: message.role === "共創思考AI" ? "assistant" : "user",
  content: message.text,
})),
       
    ],
  });

  return Response.json({
    text: response.output_text,
  });
}
