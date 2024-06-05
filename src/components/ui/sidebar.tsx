"use client"

import { SettingsIcon, SquareTerminalIcon, BotIcon, Settings2Icon } from "@/components/Icons"
import { ModeToggle } from "@/components/ui/toggleTheme"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Sidebar({ active }: { active: string }) {
    return (
        <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
            <nav className="grid gap-1 p-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/">
                                <Button aria-label="Playground" className={`rounded-lg ${active === 'home' ? 'bg-muted' : ''}`} size="icon" variant="ghost">
                                    <SquareTerminalIcon className="size-5" />
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Chat
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/models">
                                <Button aria-label="Models" className={`rounded-lg ${active === 'models' ? 'bg-muted' : ''}`} size="icon" variant="ghost">
                                    <BotIcon className="size-5" />
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Models
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/config">
                                <Button aria-label="config" className={`rounded-lg ${active === 'config' ? 'bg-muted' : ''}`} size="icon" variant="ghost">
                                    <Settings2Icon className="size-5" />
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Configure
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
            <nav className="mt-auto grid gap-1 p-2">
                <TooltipProvider>
                    <ModeToggle />
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/settings">
                                <Button aria-label="Account" className={`mt-auto rounded-lg ${active === 'settings' ? 'bg-muted' : ''}`} size="icon" variant="ghost">
                                    <SettingsIcon className="size-5" />
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Settings
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    )
}