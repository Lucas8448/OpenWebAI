import React, { useState } from "react";

const ZoomInIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" x2="16.65" y1="21" y2="16.65" />
            <line x1="11" x2="11" y1="8" y2="14" />
            <line x1="8" x2="14" y1="11" y2="11" />
        </svg>
    );
};

interface toolInvocation {
    toolCallId: string;
    toolName: string;
    args: {
        query: string;
    };
    result: {
        id: number;
        width: number;
        height: number;
        avg_color: string;
        photographer: string;
        photographer_id: number;
        photographer_url: string;
        alt: string;
        src: {
            original: string;
            large2x: string;
            large: string;
            medium: string;
            small: string;
            portrait: string;
            landscape: string;
            tiny: string;
        };
        url: string;
        video_files: {
            id: number;
            quality: string;
            file_type: string;
            width: number;
            height: number;
            link: string;
        }[];
        video_pictures: {
            id: number;
            nr: number;
            picture: string;
        }[];
    }[];
}

const RandomVideoPile = ({ toolCallId, toolInvocation }: { toolCallId: string; toolInvocation: toolInvocation }) => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    console.log(toolInvocation);

    const handleThumbnailClick = (index: number) => {
        setCurrentVideoIndex(index);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-lg">
                <video
                    src={
                        toolInvocation.result[currentVideoIndex]?.video_files.find(video => video.quality === "hd")?.link
                        || "/placeholder.svg"
                    }
                    width={800}
                    height={600}
                    className="w-full aspect-video object-cover"
                    controls
                />
            </div>
            <div className="flex gap-2 overflow-x-scroll w-full max-w-2xl py-2">
                {toolInvocation.result.map((video: any, index: any) => (
                    <div key={video.id} className="relative group cursor-pointer flex-shrink-0" onClick={() => handleThumbnailClick(index)}>
                        <img
                            src={video.video_pictures[0].picture || "/placeholder.svg"}
                            width={100}
                            height={75}
                            className="w-20 h-15 object-cover rounded-md border-2 border-transparent group-hover:border-primary transition-colors"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ZoomInIcon className="w-6 h-6 text-white bg-black/50 p-1 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RandomVideoPile;