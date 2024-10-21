'use client'

import { useChat } from 'ai/react'
import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from 'lucide-react'
import HeaderLand from '@/components/landing page/header footer landing/HeaderLand'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
 
  // for hydration error
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    setIsTyping(isLoading)
  }, [isLoading])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e)
  }

  if(!isClient) return null

  return (
    <div className="flex flex-col h-screen">
      <HeaderLand />
      <header className="sticky top-0 z-10 border-b px-4">
        <div className="container flex items-center justify-between h-14">
          <h1 className="text-xl font-bold">AI Chatbot</h1>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4">
          <div className="max-w-2xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 text-gray-900 rounded-lg px-4 py-2 max-w-[80%]">
                  <p className="animate-pulse">AI is typing...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </main>

      <footer className="sticky bottom-0 z-10 bg-white border-t">
        <div className="container p-4">
          <form onSubmit={onSubmit} className="flex items-center space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message here..."
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || input.trim() === ''}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </form>
        </div>
      </footer>
    </div>
  )
}