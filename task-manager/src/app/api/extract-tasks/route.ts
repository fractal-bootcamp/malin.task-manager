import { createLLMClient } from "llm-polyglot";
import Instructor from "@instructor-ai/instructor";
import { InstructorResponseSchema, AssistantResponseSchema } from '@/types/schemas';
import { NextResponse } from 'next/server';

const anthropicClient = createLLMClient({
  provider: "anthropic",
  apiKey: process.env.ANTHROPIC_API_KEY, // Use environment variable
});

const instructor = Instructor<typeof anthropicClient>({
  client: anthropicClient,
  mode: "TOOLS"
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    const response = await instructor.chat.completions.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: `Analyze this message: ${message}. 
          If the user specifies an objective or goal (e.g. "I want to..."), help them breakdown that goal into manageable tasks that will help them plan out and achieve their specified objective.
          You will respond with two outputs:
          1. An array of tasks, where each task is formatted as a JSON array with a title and description.
          2. A succinct and helpful response to the user summarising the tasks they need to achieve their goal.`,
        },
      ],
      response_model: {
        name: "ExtractedTasks",
        schema: AssistantResponseSchema,
      },
      max_retries: 3,
    });

    return NextResponse.json({ agentResponse: response });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
} 