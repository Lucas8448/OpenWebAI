import React from 'react';
import ReactMarkdown from 'react-markdown';
import RandomImagePile from '@/components/toolDisplays/images';
import RandomVideoPile from '@/components/toolDisplays/videos';

interface ToolInvocation {
    toolCallId: string;
    toolName: string;
    result?: any;
    args?: {
        query: string;
    };
}

interface BotMessageProps {
    content: string | undefined;
    toolInvocations?: ToolInvocation[] | undefined;
}

const BotMessage: React.FC<BotMessageProps> = ({ content, toolInvocations }) => {
    return (
        <div className="flex items-start gap-3">
            <div className="max-w-[75%] space-y-2">
                <div className="rounded-2xl p-3 text-sm text-gray-900 dark:text-gray-50">
                    <ReactMarkdown>{content}</ReactMarkdown>
                    {toolInvocations?.map((toolInvocation: ToolInvocation) => {
                        const toolCallId = toolInvocation.toolCallId;

                        switch (toolInvocation.toolName) {
                            case 'precipationMap':
                                return toolInvocation.result ? (
                                    <div key={toolCallId}>
                                        <strong>Precipation Map:</strong>
                                        <img src={toolInvocation.result} alt="Precipation" />
                                    </div>
                                ) : (
                                    <div key={toolCallId}>Loading Precipation Map...</div>
                                );
                            case 'images':
                                return toolInvocation.result ? (
                                    <RandomImagePile key={toolCallId} toolCallId={toolCallId} toolInvocation={toolInvocation} />
                                ) : (
                                    <div key={toolCallId}>Loading Images...</div>
                                );
                            case 'videos':
                                return toolInvocation.result ? (
                                    <RandomVideoPile key={toolCallId} toolCallId={toolCallId} toolInvocation={toolInvocation} />
                                ) : (
                                    <div key={toolCallId}>Loading Videos...</div>
                                );
                            case 'searchNews':
                                return toolInvocation.result ? (
                                    <div key={toolCallId}>
                                        News Display Placeholder
                                    </div>
                                ) : (
                                    <div key={toolCallId}>Loading News...</div>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default BotMessage;