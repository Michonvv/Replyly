"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from 'next/image';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-center p-4 md:p-8">
      <nav className="w-full max-w-6xl flex justify-between items-center mb-12">
        <div className="flex items-center space-x-2">
        <Image
            src="/logo.png"
            alt="Home"
            className="w-auto h-6"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
        <div className="space-x-4">
          <Button variant="ghost" className="text-black hover:text-gray-700">Features</Button>
          <Button variant="ghost" className="text-black hover:text-gray-700" onClick={() => window.location.href = '/api/auth/signin'}>Login</Button>
        </div>
      </nav>
      
      <main className="w-full max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-mono">
          The AI-powered comment
          <span className="block text-gray-800">reply assistant</span>
        </h1>
        <p className="text-xl mb-8 text-gray-600">
          Engage your audience faster with personalized AI-generated responses for content creators and companies.
        </p>
        <div className="flex justify-center space-x-4 mb-12">
          <Button className="text-lg px-6 py-6 bg-black text-white hover:bg-gray-800" onClick={() => window.location.href = '/api/auth/signin'}>
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" className="text-lg px-6 py-6 text-black border-black hover:bg-gray-100">
            View docs
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-6 flex space-x-4">
          <div className="flex-1 bg-gray-100 rounded-md p-4 text-left">
            <h3 className="font-semibold mb-2">Smart Replies</h3>
            <p className="text-sm text-gray-600">AI generates contextual responses based on the content of the comment.</p>
          </div>
          <div className="flex-1 bg-gray-100 rounded-md p-4 text-left">
            <h3 className="font-semibold mb-2">Time Saved</h3>
            <p className="text-sm text-gray-600">Respond to comments 10x faster, increasing engagement and saving valuable time.</p>
          </div>
          <div className="flex-1 bg-gray-100 rounded-md p-4 text-left">
            <h3 className="font-semibold mb-2">Personalization</h3>
            <p className="text-sm text-gray-600">Always be able change the response of the AI to fit your style.</p>
          </div>
        </div>
      </main>
    </div>
  )
}