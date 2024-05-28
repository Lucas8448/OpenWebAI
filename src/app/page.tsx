"use client"

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { TooltipTrigger, TooltipContent, Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { PaperclipIcon, MicIcon, CornerDownLeftIcon } from "@/components/Icons"
import Sidebar from "@/components/ui/sidebar"
import { useChat } from 'ai/react';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [groqModels, setGroqModels] = useState([]);
  const [openAiModels, setOpenAiModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState({
    "id": "gpt-4o",
    "provider": "openai",
    "name": "GPT-4o",
    "capabilities": {
      "image_input": true,
      "object_generation": true,
      "tool_usage": true,
      "tool_streaming": true,
    }
  });

  let { messages, input, handleInputChange, handleSubmit } = useChat({
    api: 'api/chat',
    body: {
      model: selectedModel.id,
      provider: selectedModel.provider,
    }
  });

  useEffect(() => {
    const fetchOpenAiData = async () => {
      try {
        const response = await fetch('/api/models/openai');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = (await response.json()).filter((model: any) => model.id.includes("gpt"));
        setOpenAiModels(data);
      } catch (error) {
        console.error("Failed to fetch OpenAI models:", error);
        setOpenAiModels([]);
      }
    };

    const fetchGroqData = async () => {
      try {
        const response = await fetch('/api/models/groq');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGroqModels(data);
      } catch (error) {
        console.error("Failed to fetch Groq models:", error);
        setGroqModels([]);
      }
    };

    fetchOpenAiData();
    fetchGroqData();
  }, []);

  const handleModelSelection = (model:any) => {
    setSelectedModel(model);
  };

  return (
    <div className="grid h-screen w-full pl-[56px]">
      <Sidebar active="home" />
      <div className="flex flex-col">
        <main className="grid flex-1 gap-4 overflow-auto p-4">
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>{selectedModel ? `Selected Model: ${selectedModel.id}` : "Select text Model"}</MenubarTrigger>
                <MenubarContent>
                  {openAiModels && openAiModels.length > 0 && (
                    <MenubarSub>
                      <MenubarSubTrigger>OpenAI</MenubarSubTrigger>
                      <MenubarSubContent>
                        {openAiModels.map((model) => (
                          <MenubarItem key={model.id} onClick={() => handleModelSelection(model)}>
                            {model.name}
                          </MenubarItem>
                        ))}
                      </MenubarSubContent>
                    </MenubarSub>
                  )}
                  <MenubarSeparator />
                  {groqModels && groqModels.length > 0 && (
                    <MenubarSub>
                      <MenubarSubTrigger>Groq</MenubarSubTrigger>
                      <MenubarSubContent>
                        {groqModels.map((model) => (
                          <MenubarItem key={model.id} onClick={() => handleModelSelection(model)}>
                            {model.name}
                          </MenubarItem>
                        ))}
                      </MenubarSubContent>
                    </MenubarSub>
                  )}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <div className="flex-1">
              <div className="flex flex-col gap-4 p-4">
                {messages.map((message, index) => {
                  return message.role === 'user' ? (
                    <div key={index} className="flex justify-end items-start gap-3">
                      <div className="max-w-[75%] space-y-2">
                        <div className="rounded-2xl bg-blue-100 p-3 text-sm text-gray-900 dark:bg-blue-800 dark:text-gray-50">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={index} className="flex items-start gap-3">
                      <div className="max-w-[75%] space-y-2">
                        <div className="rounded-2xl bg-gray-100 p-3 text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-50">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <form
              className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
              x-chunk="dashboard-03-chunk-1"
              onSubmit={handleSubmit}
            >
              <Label className="sr-only" htmlFor="message">
                Message
              </Label>
              <Textarea
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                id="message"
                placeholder="Type your message here..."
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <div className="flex items-center p-3 pt-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <PaperclipIcon className="size-4" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Add files</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MicIcon className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Speak</TooltipContent>
                  </Tooltip>
                  <Button className="ml-auto gap-1.5" size="sm" type="submit">
                    Send Message
                    <CornerDownLeftIcon className="size-3.5" />
                  </Button>
                </TooltipProvider>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}