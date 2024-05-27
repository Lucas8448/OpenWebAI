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

export default function Home() {
  const [groqModels, setGroqModels] = useState({ data: [] });
  const [openAiModels, setOpenAiModels] = useState({ data: [] });
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    const fetchOpenAiData = async () => {
      try {
        const response = await fetch('/api/models/openai');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        data.data = data.data.filter((model) => model.id.includes("gpt"));
        setOpenAiModels(data);
      } catch (error) {
        console.error("Failed to fetch OpenAI models:", error);
        setOpenAiModels({ data: [] });
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
        setGroqModels({ data: [] });
      }
    };

    fetchOpenAiData();
    fetchGroqData();
  }, []);

  console.log(groqModels, openAiModels);

  return (
    <div className="grid h-screen w-full pl-[56px]">
      <Sidebar active="home" />
      <div className="flex flex-col">
        <main className="grid flex-1 gap-4 overflow-auto p-4">
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>{selectedModel ? selectedModel : "Select Model"}</MenubarTrigger>
                <MenubarContent>
                  {openAiModels.data && openAiModels.data.length > 0 && (
                    <MenubarSub>
                      <MenubarSubTrigger>OpenAI</MenubarSubTrigger>
                      <MenubarSubContent>
                        {openAiModels.data.map((model) => (
                          <MenubarItem key={model.id} onClick={() => setSelectedModel(model.id)}>
                            {model.id}
                          </MenubarItem>
                        ))}
                      </MenubarSubContent>
                    </MenubarSub>
                  )}
                  <MenubarSeparator />
                  {groqModels.data && groqModels.data.length > 0 && (
                    <MenubarSub>
                      <MenubarSubTrigger>Groq</MenubarSubTrigger>
                      <MenubarSubContent>
                        {groqModels.data.map((model) => (
                          <MenubarItem key={model.id} onClick={() => setSelectedModel(model.id)}>
                            {model.id}
                          </MenubarItem>
                        ))}
                      </MenubarSubContent>
                    </MenubarSub>
                  )}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <div className="flex-1" />
            <form
              className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
              x-chunk="dashboard-03-chunk-1"
            >
              <Label className="sr-only" htmlFor="message">
                Message
              </Label>
              <Textarea
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                id="message"
                placeholder="Type your message here..."
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