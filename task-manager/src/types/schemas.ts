import { z } from "zod"

// zod schemas
export const TaskStatusEnum = z.enum(["Pending", "In-Progress", "Completed", "Archived"]);
export const PriorityEnum = z.enum(["HIGH", "MEDIUM", "LOW"]);

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: TaskStatusEnum,
  //priority: PriorityEnum,
});

export const TaskNoIDSchema = TaskSchema.omit({ id: true })

export const ExtractedTaskSchema = z.object({
  title: z.string().describe("Make this a zany title"),
  description: z.string().describe("Make this a really really boring description"),
  status: TaskStatusEnum.describe("This should ALWAYS be 'Pending'")
  //priority: PriorityEnum,
});

export const InstructorResponseSchema = z.object({
  tasks: z.array(ExtractedTaskSchema)
});

export const AssistantResponseSchema = z.object({
  agentResponse: z.string().describe(`Return a succinct and helpful response to the user summarising the tasks they need to complete to achieve their goal.
    Format your response in this structure:
    1. Start with a brief introduction
    2. Add a blank line
    3. List key points using "•" bullets
    4. Add a blank line
    5. End with a brief encouraging note
    
    Example format (feel free to be creative):
    #
    Here's your plan to achieve [goal].

    • First key point
    • Second key point
    • Third key point

    You're all set to get started! Take it one step at a time.
    #`)
})

// Types
export type Task = z.infer<typeof TaskSchema>;
export type ExtractedTask = z.infer<typeof ExtractedTaskSchema>;
export type InstructorResponse = z.infer<typeof InstructorResponseSchema>;
export type AssistantResponse = z.infer<typeof AssistantResponseSchema>;
export type TaskNoID = z.infer<typeof TaskNoIDSchema>