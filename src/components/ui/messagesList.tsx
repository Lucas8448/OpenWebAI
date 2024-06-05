import React from 'react';
import UserMessage from './userMessage';
import BotMessage from './botMessage';

interface Message {
    role: "function" | "user" | "assistant" | "system" | "data" | "tool";
    content?: string | undefined;
    toolInvocations?: {
        toolCallId: string;
        toolName: string;
        result?: any;
    }[];
}[]

interface MessageProps {
    messages: Message[];
}

const MessagesList: React.FC<MessageProps> = ({ messages }) => {
    return (
        <div className="flex flex-col gap-4 p-4">
            {messages.map((message, index) => {
                return message.role === 'user' ? (
                    <UserMessage key={index} content={message.content} />
                ) : message.role === 'assistant' ? (
                    <BotMessage key={index} content={message.content} toolInvocations={Array.isArray(message.toolInvocations) && message.toolInvocations.every(invocation => invocation !== undefined) ? message.toolInvocations : []} />
                ) : null;
            })}
        </div>
    );
};

export default MessagesList;