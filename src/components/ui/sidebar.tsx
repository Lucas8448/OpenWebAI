import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SettingsIcon, SquareTerminalIcon, BotIcon, Settings2Icon } from "@/components/Icons"
import { ModeToggle } from "@/components/ui/toggleTheme"
import { getSession } from "@auth0/nextjs-auth0"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Sidebar() {
    const session = await getSession();
    if (!session) {
        return <div>Loading...</div>
    }

    const initials = session.user.name.split(" ").map((name: string) => name[0]).join("");

    return (
        <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
            <div className="border-b p-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/account">
                                <Avatar>
                                    <AvatarImage src={session.user.picture} />
                                    <AvatarFallback>{initials}</AvatarFallback>
                                </Avatar>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            {session.user.name}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <nav className="grid gap-1 p-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/">
                                <Button aria-label="Playground" className="rounded-lg bg-muted" size="icon" variant="ghost">
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
                                <Button aria-label="Models" className="rounded-lg" size="icon" variant="ghost">
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
                                <Button aria-label="Settings" className="rounded-lg" size="icon" variant="ghost">
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
                                <Button aria-label="Account" className="mt-auto rounded-lg" size="icon" variant="ghost">
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