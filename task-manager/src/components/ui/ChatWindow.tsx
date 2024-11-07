'use client'

import { useState } from 'react'

interface Message {
  id: number
  text: string
  isUser: boolean
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')

  // Use the client.chat.completions.create method to send a prompt and extract the data into the Zod object
  async function extractTasksFromMessage(message: string): Promise<AssistantResponse> {
    try {
      const response = await fetch('/api/extract-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data: AssistantResponse = await response.json();
      console.log('recieved', data)

      // validate the response against our schema using zod
      const validatedData = AssistantResponseSchema.parse(data);
      return validatedData;
    } catch (error) {
      console.error('Error extracting tasks:', error);
      return { tasks: [], agentResponse: 'Error extracting tasks' };
    }
  }

  const handleSend = async () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: inputText,
        isUser: true
      }
      setMessages([...messages, newMessage])
      setInputText('')

      setIsLoading(true)

      try {
        // Logic to handle the AI response
        if (userMessage) {
          const extractTasks = await extractTasksFromMessage(userMessage.text)
          console.log('we got this response:', extractTasks)
          const agentMessage: Message = {
            msgId: Date.now(),
            text: extractTasks.agentResponse,
            isUser: false
          }
          setMessages(prev => [...prev, agentMessage]);
        }
      } finally {
        setIsLoading(false)  // This ensures loading is set to false even if an error occurs
      }

    }
  }

  return (
    <div className="flex flex-col h-full bg-neutral-50">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="font-semibold">AI Chat Assistant</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${message.isUser
                  ? 'bg-rose-50 text-gray'
                  : 'bg-green-100 text-gray'
                }`}
            >
              {message.text}
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
          {/* <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button> */}
        </div>
      </div>
    </div>
  )
}