"use client";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { CpuIcon, MessageCircleIcon, ClipboardIcon, SettingsIcon } from "../Icons"

type Model = {
    name: string;
    description: string;
    capabilities: string[];
};

export default function Sidebar({ models, modelClicked }: { models: Model[], modelClicked: (model: Model) => void }) {
    return (
        <div className="flex flex-col border-r border-gray-800 bg-gray-900 py-4">

            <div className="flex items-center justify-between px-4">
                <ClipboardIcon className="h-6 w-6" />
                <SettingsIcon className="h-6 w-6" />
            </div>
            <nav className="mt-6 flex flex-col gap-2 px-4">
                {models.map((model) => (
                    <HoverCard>
                        <HoverCardTrigger>
                            <Button key={model.name}
                                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-800 w-full text-left"
                                onClick={() => modelClicked(model)}
                            >
                                <HoverCardTrigger>{model.name}</HoverCardTrigger>
                            </Button>
                        </HoverCardTrigger>
                        <HoverCardContent align="start">
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">{model.name}</h4>
                                <p className="text-sm">
                                    {model.description}
                                </p>
                                <div className="flex items-center pt-2">
                                    <span className="text-xs text-muted-foreground">
                                        Capabilities: {model.capabilities.join(", ")}
                                    </span>
                                </div>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                ))}
            </nav>
            <div className="mt-auto flex flex-col items-start gap-2 px-4">
                <div className="flex items-center gap-2 rounded-md bg-gray-800 px-3 py-2 text-sm font-medium">
                    <MessageCircleIcon className="h-5 w-5" />
                    <span>Previous Chats</span>
                </div>
            </div>
        </div>
    )
}