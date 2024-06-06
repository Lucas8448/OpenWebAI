# OpenWebAI: A Comprehensive AI and Tools Integration Platform

OpenWebAI is a platform designed to integrate various AI models and tools, providing a experience for users to interact with AI models from OpenAI and Groq (and others), alongside a suite of utilities for fetching images, videos, and news articles. This platform is built with a modern tech stack, including React for the frontend, leveraging Next.js for server-side rendering and API routes, and a Vercel AI SDK for backend processing. It offers a user-friendly interface to explore AI capabilities, manage themes, and authenticate users, among other features.

## Features

- **AI Model Exploration**: Users can explore and interact with different AI models from OpenAI and Groq, including GPT-3.5 Turbo, GPT-4, and Llama models, each with detailed capabilities listed.
- **Tool Integration**: Integrated tools for fetching precipitation maps, images, videos, and news articles, enhancing the AI interaction with real-world data.
- **Theme Customization**: Supports light and dark themes, allowing users to customize their experience.
- **Authentication**: Secure user authentication with Auth0 for a personalized experience.
- **Responsive UI**: Built with accessibility and responsiveness in mind, ensuring a great experience across devices.
- **Customization**: Full support for bringing different or custom providers, and simply integrating them

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- API keys for Pexels, WorldNewsAPI, GroqCloud, and OpenAI
- Auth0 Project keys

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Lucas8448/OpenWebAI.git
   cd openwebai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables for API keys and other configurations in a `.env.local` file at the root of the project.

4. Run the development server:
   ```bash
   npm run dev
   ```

### Usage

- Navigate to `http://localhost:3000` in your browser to access the application.
- Use the sidebar to switch between different sections of the app.
- Explore AI models and their capabilities in the Models section.
- Use the integrated tools to fetch data like images, videos, and news articles.

### Deployment

For deployment, you can use Vercel or any platform that supports Next.js applications. Ensure all environment variables are correctly set up in the deployment settings.

Enjoy exploring OpenWebAI
