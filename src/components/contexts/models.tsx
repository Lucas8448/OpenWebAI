"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Model = {
    id: string;
    name: string;
    description: string;
    capabilities: {
        vision: boolean;
        files: boolean;
        function_calling: boolean;
        streaming: boolean;
    };
    provider: string;
    icon: string;
};

type ModelContextType = {
    models: Model[];
    addModel: (model: Model) => void;
    updateModel: (id: string, updatedModel: Partial<Model>) => void;
    removeModel: (id: string) => void;
};

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export const useModelContext = () => useContext(ModelContext);

type ModelProviderProps = {
    children: ReactNode;
};

export const ModelProvider: React.FC<ModelProviderProps> = ({ children }) => {
    const [models, setModels] = useState<Model[]>([]);

    useEffect(() => {
        const storedModels = localStorage.getItem('models');
        if (storedModels) {
            setModels(JSON.parse(storedModels));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('models', JSON.stringify(models));
    }, [models]);

    const addModel = (model: Model) => {
        setModels((prevModels) => [...prevModels, model]);
    };

    const updateModel = (id: string, updatedModel: Partial<Model>) => {
        setModels((prevModels) =>
            prevModels.map((model) => (model.id === id ? { ...model, ...updatedModel } : model))
        );
    };

    const removeModel = (id: string) => {
        setModels((prevModels) => prevModels.filter((model) => model.id !== id));
    };

    return (
        <ModelContext.Provider value={{ models, addModel, updateModel, removeModel }}>
            {children}
        </ModelContext.Provider>
    );
};
