import React from 'react';
import Header from '@/components/header';

export default function SettingsPage() {
  return (
    <>
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <h2 className="text-xl font-semibold mb-2">How to Use This Program</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>First, ensure all the required environment variables are set in your .env.local file:</li>
          <ul className="list-disc list-inside ml-6 mb-2">
            <li>AUTH_SECRET: A secret key for authentication</li>
            <li>AUTH_GOOGLE_ID: Your Google OAuth client ID</li>
            <li>AUTH_GOOGLE_SECRET: Your Google OAuth client secret</li>
            <li>YOUTUBE_API_KEY: Your YouTube API key</li>
            <li>OPENAI_API_KEY: Your OpenAI API key</li>
            <li>NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL</li>
            <li>SUPABASE_SERVICE_ROLE_KEY: Your Supabase service role key</li>
          </ul>
          <li>After setting the environment variables, restart the application.</li>
          <li>Set up Google authentication in your Google Cloud Console.</li>
          <li>Configure your Supabase project with the provided URL and service role key.</li>
          <li>Ensure you have necessary API access for YouTube and OpenAI services.</li>
          <li>Navigate to the main dashboard to start using the program.</li>
          <li>Customize additional settings on this page as needed.</li>
        </ol>
        <p className="mt-4 text-red-600 font-semibold">
          Important: Keep your API keys and secrets confidential. Never share them or commit them to public repositories.
        </p>
        {/* Add more settings options or instructions here */}
      </div>
    </>
  );
}
