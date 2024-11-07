'use client'

import { useState } from 'react'
import { createLLMClient } from "llm-polyglot"
import Instructor from "@instructor-ai/instructor";
import AnthropicClient from "@anthropic-ai/sdk";
import { z } from "zod"
import { useTaskStore } from "@/app/store/TaskStore"
import {
  AssistantResponse,
  Task,
  TaskNoID,
  ExtractedTask,
  InstructorResponse,
  TaskStatusEnum,
  PriorityEnum,
  TaskSchema,
  ExtractedTaskSchema,
  InstructorResponseSchema,
  AssistantResponseSchema,
} from "@/types/schemas"

interface Message {
  msgId: number
  text: string
  isUser: boolean
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [bufferTasks, setBufferTasks] = useState<TaskNoID[]>()
  const [isTasksAdded, setIsTasksAdded] = useState<boolean>(false)
  // import createTask function from store
  const createTask = useTaskStore(state => state.createTask);

  // Use the client.chat.completions.create method to send a prompt and extract the data into the Zod object
  async function extractTasksFromMessage(message: string): Promise<InstructorResponse> {
    try {
      const response = await fetch('/api/extract-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data: InstructorResponse = await response.json();
      console.log('recieved', data)
      return { tasks: data.tasks }
    } catch (error) {
      console.error('Error extracting tasks:', error);
      return { tasks: [] };
    }
  }

  async function generateResponse(tasks: TaskNoID[], message: string): Promise<string> {
    try {
      const response = await fetch('/api/generate-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tasks, message }),
      });
      const data: AssistantResponse = await response.json();
      return data.agentResponse;
    } catch (error) {
      console.error('Error generating response:', error);
      return 'Error generating response';
    }
  }

  const handleSend = async () => {
    if (inputText.trim()) {
      setIsTasksAdded(false) // Reset the state for new message
      setIsLoading(true)  // Show loading state
      const userMessage: Message = {
        msgId: Date.now(),
        text: inputText,
        isUser: true
      }
      setMessages(prev => [...prev, userMessage])
      setInputText('')

      try {
        // Logic to handle the AI response
        if (userMessage) {
          // First, extract tasks
          const extractedTasks = await extractTasksFromMessage(userMessage.text);
          setBufferTasks(extractedTasks.tasks);
          console.log(extractedTasks)

          // Then, generate response based on those tasks
          const agentResponse = await generateResponse(extractedTasks.tasks, userMessage.text);
          console.log(agentResponse)
          const agentMessage: Message = {
            msgId: Date.now(),
            text: agentResponse,
            isUser: false
          };

          setMessages(prev => [...prev, agentMessage]);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const handleAddTasks = () => {
    if (bufferTasks) {
      bufferTasks.map(task => createTask(task))
    }
  }

  return (
    <div className="flex flex-col h-full bg-neutral-50 rounded-3xl">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="font-semibold">Task Manager Assistant</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.msgId}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex flex-col">
              <div
                className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${message.isUser
                  ? 'bg-rose-50 text-gray'
                  : 'bg-green-100 text-gray'
                  }`}
              >
                {message.text.replace(/\\n/g, '\n')}
              </div>
              {!message.isUser && bufferTasks && bufferTasks.length > 0 && (
                <button
                  className={`mt-2 px-4 py-2 bg-blue-400 text-white rounded-md w-fit
                    hover:bg-rose-400 active:bg-rose-700 active:transform active:scale-95 
                    transition-opacity duration-300 ease-in-out
                    ${isTasksAdded ? 'opacity-0' : 'opacity-100'}`}
                  onClick={() => {
                    setIsTasksAdded(true);
                    const timeoutId = setTimeout(handleAddTasks, 300);
                    return () => clearTimeout(timeoutId);
                  }}
                >
                  Add To Tasks
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
            placeholder="Type a message..."
          />
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  )
}