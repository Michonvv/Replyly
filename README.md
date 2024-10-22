# 🤖 AI-Powered Comment Replyly

Engage your audience faster with personalized AI-generated responses for content creators and companies with Replyly.

![AI Reply Assistant Demo](https://i.ibb.co/rtgGTrP/screencapture-localhost-3000-2024-10-22-16-59-28.png)

## 🌟 Features

- 💬 Smart Replies: AI generates contextual responses based on the comment content
- ⏱️ Time Saved: Respond to comments 10x faster, boosting engagement
- 🎨 Personalization: Easily customize AI responses to match your style
- 🔗 Platform Integration: Works seamlessly with major social media platforms
- 📊 Analytics: Track engagement metrics and response effectiveness

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- An OpenAI API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ai-comment-reply-assistant.git
   cd ai-comment-reply-assistant
   ```

2. Install dependencies:
   ```
   npm install
   ```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory of your project and add the following variables:

AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key


Here's how to obtain each of these keys:

1. **AUTH_SECRET**: Generate a random string to use as your authentication secret. You can use a tool like [generate-secret](https://generate-secret.vercel.app/32) to create a secure random string.

2. **AUTH_GOOGLE_ID** and **AUTH_GOOGLE_SECRET**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project or select an existing one.
   - Navigate to "APIs & Services" > "Credentials".
   - Click "Create Credentials" > "OAuth client ID".
   - Choose "Web application" as the application type.
   - Add `http://localhost:3000` to Authorized JavaScript origins.
   - Add `http://localhost:3000/api/auth/callback/google` to Authorized redirect URIs.
   - Click "Create" and copy the generated Client ID and Client Secret.

3. **OPENAI_API_KEY**:
   - Sign up for an account at [OpenAI](https://openai.com/).
   - Navigate to the [API keys page](https://platform.openai.com/account/api-keys).
   - Click "Create new secret key" and copy the generated key.

4. **NEXT_PUBLIC_SUPABASE_URL** and **SUPABASE_SERVICE_ROLE_KEY**:
   - Sign up for an account at [Supabase](https://supabase.com/).
   - Create a new project.
   - In your project dashboard, go to "Settings" > "API".
   - Your project URL is listed as "Project URL".
   - Under "Project API keys", copy the "service_role" key for SUPABASE_SERVICE_ROLE_KEY.

⚠️ **Important**: Keep these keys confidential and never commit them to your repository. Make sure `.env.local` is included in your `.gitignore` file.

## 📘 Documentation

Haven't written the docs yet.

## 💡 How It Works

1. **Connect Your Accounts**: Link your YouTube accounts to the assistant.
2. **Receive Comments**: The assistant monitors your accounts for new comments.
3. **Generate Replies**: AI analyzes each comment and generates a contextual response.
4. **Review and Customize**: Quickly review AI-generated replies and make any necessary adjustments.
5. **Post Responses**: Send your personalized replies with a single click.

## 🔧 Configuration

Customize the AI's behavior and your personal preferences in the settings panel:

- Adjust the AI's tone (friendly, professional, humorous, etc.)
- Set up auto-reply rules for specific types of comments
- Configure notification preferences
- Manage connected accounts

## 🤝 Contributing

if u want to contribute, please fork the repo and submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [OpenAI](https://openai.com/) for powering our AI capabilities
- [Next.js](https://nextjs.org/) for the robust React framework
- [TailwindCSS](https://tailwindcss.com/) for streamlined styling

---

Made with ❤️ by Michon

[Get Started](https://github.com/Michonvv/Replyly) | [View Docs](https://your-docs-url.com)