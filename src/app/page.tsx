import { Button } from "@/components/ui/button"
import { TooltipTrigger, TooltipContent, Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PaperclipIcon, MicIcon, CornerDownLeftIcon } from "@/components/Icons"
import Sidebar from "@/components/ui/sidebar"

export default async function Home() {
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <Sidebar />
      <div className="flex flex-col">
        <main className="grid flex-1 gap-4 overflow-auto p-4">
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4">
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