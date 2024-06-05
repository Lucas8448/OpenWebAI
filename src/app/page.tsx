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
import { ToolInvocation } from 'ai';
import RandomImagePile from '@/components/toolDisplays/images';
import RandomVideoPile from '@/components/toolDisplays/videos';

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

  let { messages, input, handleInputChange, handleSubmit, experimental_addToolResult } = useChat({
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

  const handleModelSelection = (model: any) => {
    setSelectedModel(model);
  };

  return (
    <div className="grid h-screen w-full pl-[56px]">
      <Sidebar active="home" />
      <div className="flex flex-col">
        <main className="grid flex-1 gap-4 overflow-auto p-4">
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl p-4">
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
                        <div className="rounded-2xl p-3 text-sm text-gray-900 dark:text-gray-50">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                          {message.toolInvocations?.map((toolInvocation: ToolInvocation) => {
                            const toolCallId = toolInvocation.toolCallId;

                            if (toolInvocation.toolName === 'precipationMap') {
                              return 'result' in toolInvocation ? (
                                <div key={toolCallId}>
                                  <strong>{`${toolInvocation.toolName}:`}</strong>
                                  {toolInvocation.result ? (
                                    <img src={toolInvocation.result} alt="Precipation" />
                                  ) : (
                                    <p>Loading...</p>
                                  )}
                                </div>
                              ) : (
                                <div key={toolCallId}>Calling {toolInvocation.toolName}...</div>
                              );
                            } else if (toolInvocation.toolName === 'images') {
                              return 'result' in toolInvocation ? (
                                <RandomImagePile toolCallId={toolCallId} toolInvocation={toolInvocation} />
                              ) : (
                                <div key={toolCallId}>Calling {toolInvocation.toolName}...</div>
                              );
                            } else if (toolInvocation.toolName === 'videos') {
                              return 'result' in toolInvocation ? (
                                <RandomVideoPile toolCallId={toolCallId} toolInvocation={toolInvocation} />
                              ) : (
                                <div key={toolCallId}>Calling {toolInvocation.toolName}...</div>
                              );
                            } else if (toolInvocation.toolName === 'searchNews') {
                              // send a message as system to the ai with the data
                              return 'result' in toolInvocation ? (
                                // confirm with the user to use the sources
                                <div key={toolCallId}>
                                  <strong>Proceed with these sources?</strong>
                                  {toolInvocation.result.news.map((news: any) => (
                                    <div key={news.id} className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto my-4 cursor-pointer flex items-center" onClick={() => window.open(news.url, '_blank')}>
                                      <div className="bg-gray-200 rounded-lg w-24 h-24 flex-shrink-0 mr-4 flex items-center justify-center">
                                        <img src={"https://logo.clearbit.com/" + news.url.split('/')[2]} alt={news.url.split('/')[2]} className="w-full h-auto rounded-lg shadow-sm" />
                                      </div>
                                      <div>
                                        <h3 className="text-xs font-medium mb-2">{news.title}</h3>
                                        <a href={news.url} target="_blank" rel="noopener noreferrer" className="block mt-2 text-blue-500 hover:text-blue-700">
                                          Read More
                                        </a>
                                      </div>
                                    </div>
                                  ))}
                                  <Button
                                    onClick={() => {
                                      experimental_addToolResult({ toolCallId, result: toolInvocation.result.news });
                                    }}
                                  >Continue with results</Button>
                                </div>
                              ) : (
                                <div key={toolCallId}>Calling {toolInvocation.toolName}...</div>
                              );
                            }
                            return 'result' in toolInvocation ? (
                              <div key={toolCallId}>
                                <strong>{`${toolInvocation.toolName}:`}</strong>
                                {toolInvocation.result}
                              </div>
                            ) : (
                              <div key={toolCallId}>Calling {toolInvocation.toolName}...</div>
                            );
                          })}
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
                  {selectedModel.capabilities.image_input && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <PaperclipIcon className="size-4" />
                          <span className="sr-only">Attach file</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">Add files</TooltipContent>
                    </Tooltip>
                  )}
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