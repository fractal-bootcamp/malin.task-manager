import { createLLMClient } from "llm-polyglot";
import Instructor from "@instructor-ai/instructor";
import { AssistantResponseSchema } from '@/types/schemas';
import { NextResponse } from 'next/server';

const API_KEY = process.env.ANTHROPIC_API_KEY

const anthropicClient = createLLMClient({
  provider: "anthropic",
  apiKey: API_KEY,
});

const instructor = Instructor<typeof anthropicClient>({
  client: anthropicClient,
  mode: "TOOLS"
});

export async function POST(request: Request) {
  try {
    const { tasks, message } = await request.json();
    const response = await instructor.chat.completions.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: `Given this user message ${JSON.stringify(message)} as context, and these tasks that we've generated: ${JSON.stringify(tasks)}, 
          Create a well-formatted response for the user that includes:
          • An opening sentence introducing the plan\\n\\n
          • A bulleted list of key steps using "•" for bullets, with \\n
          • A brief closing encouragement
          
          If the task is empty/undefined or the user message is unrelated to achieving a goal, respond with a message 
          asking them to specify a goal they would like help with.
          
          Feel free to be creative in your response :)`,
        },
      ],
      response_model: {
        name: "TaskResponse",
        schema: AssistantResponseSchema, // You'll need to update this schema
      },
      max_retries: 2,
    });

    return NextResponse.json({ agentResponse: response.agentResponse });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}