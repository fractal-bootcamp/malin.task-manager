import { createLLMClient } from "llm-polyglot"
import Instructor from "@instructor-ai/instructor";
import AnthropicClient from "@anthropic-ai/sdk";
import { z } from "zod"

// zod schemas
const TaskStatusEnum = z.enum(["TODO", "IN_PROGRESS", "DONE"]);
const PriorityEnum = z.enum(["HIGH", "MEDIUM", "LOW"]);

const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: TaskStatusEnum,
  //priority: PriorityEnum,
});

const ExtractedTaskSchema = z.object({
  title: z.string().describe("Make this a zany title"),
  description: z.string().describe("Make this a really really boring description"),
  priority: PriorityEnum,
});

const InstructorResponseSchema = z.object({
  tasks: z
    .array(ExtractedTaskSchema)
    .describe(
      "An array of tasks, if there's no task specified then return FIVE absurd tasks that nobody would ever do!!!"
    ).min(1),
});

// Types
type Task = z.infer<typeof TaskSchema>;
type ExtractedTask = z.infer<typeof ExtractedTaskSchema>;
type InstructorResponse = z.infer<typeof InstructorResponseSchema>;

// creates the anthropic client
const anthropicClient = createLLMClient({
  provider: "anthropic",
  apiKey: process.env.ANTHROPIC_API_KEY
})

const UserSchema = z.object({
  age: z.number(),
  name: z.string()
})

const instructor = Instructor<typeof anthropicClient>({
  client: anthropicClient,
  mode: "TOOLS"
})




// Use the client.chat.completions.create method to send a prompt and extract the data into the Zod object

const completion = await anthropicClient.chat.completions.create({
  model: "claude-3-opus-20240229",
  max_tokens: 300,
  messages: [
    {
      role: "user",
      content: `Analyze this message: ${message}. If it requests or describes tasks that need to be created, format them as a JSON array with title, description and priority (HIGH/MEDIUM/LOW) fields. If no clear tasks are mentioned, return an empty array.`,
    },
  ],
});






export { instructor };


