// components/ui/ModelSelector.tsx
import React from 'react';
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
} from "@/components/ui/menubar";

interface Model {
    id: string;
    name: string;
}

interface ModelSelectorProps {
    openAiModels: Model[];
    groqModels: Model[];
    selectedModel: Model | null;
    handleModelSelection: (model: Model) => void;
}

const Menu: React.FC<ModelSelectorProps> = ({ openAiModels, groqModels, selectedModel, handleModelSelection }) => {
    return (
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
            {process.env.NODE_ENV === "development" && (
                <MenubarMenu>
                    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-2 rounded-full flex items-center justify-center">
                        Development
                    </div>
                </MenubarMenu>
            )}
        </Menubar>
    );
};

export default Menu;