"use client";

import { useState, useEffect } from 'react';
import Sidebar from "@/components/ui/sidebar"

interface Model {
    id: string;
    name: string;
    description: string;
    capabilities: {
        [key: string]: boolean;
    };
}

export default function Models() {
    const [groqModels, setGroqModels] = useState([]);
    const [openAiModels, setOpenAiModels] = useState([]);

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

    return (
        <div className="grid h-screen w-full pl-[56px]">
            <Sidebar active="models" />
            <div className="h-full w-full bg-gray-100">
                <div className="flex flex-col h-full w-full items-center justify-center gap-8 px-8">
                    <div className="flex flex-col gap-6 w-full max-w-4xl p-6 bg-white rounded-xl shadow-2xl">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Models</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">OpenAI</h2>
                                <ul className="list-disc pl-5">
                                    <MapModels models={openAiModels} />
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Groq</h2>
                                <ul className="list-disc pl-5">
                                    <MapModels models={groqModels} />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const MapModels = ({ models }: { models: Model[] }) => {
    return (
        models.map((model: any) => (
            <li key={model.id} className="flex gap-2 items-center hover:bg-gray-100 p-2 rounded-md">
                <span className="font-medium">{model.name}</span>
                <ul className="">
                    {Object.entries(model.capabilities).map(([key, value]) => (
                        <li key={key} className="text-sm text-gray-500">{key}: {value ? "✅" : "❌"}</li>
                    ))}
                </ul>
            </li>
        ))
    );
}