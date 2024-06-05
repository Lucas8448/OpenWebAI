import React from 'react';

interface UserMessageProps {
    content: string | undefined;
}

const UserMessage: React.FC<UserMessageProps> = ({ content }) => {
    return (
        <div className="flex justify-end items-start gap-3">
            <div className="max-w-[75%] space-y-2">
                <div className="rounded-2xl bg-blue-100 p-3 text-sm text-gray-900 dark:bg-blue-800 dark:text-gray-50">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default UserMessage;