"use server"

import { env } from "process";

export async function getPrecipationMap(): Promise<string | null> {
    try {
        const response = await fetch('https://api.met.no/weatherapi/radar/2.0/.gif?area=southeastern_norway&type=5level_reflectivityx   ', {
            method: 'GET',
            headers: {
                'Accept': 'image/gif'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const arrayBuffer = await response.arrayBuffer();
        const base64 = bufferToBase64(Buffer.from(arrayBuffer));
        return base64;
    } catch (error) {
        console.error('Failed to fetch radar image:', error);
        return null;
    }
}

function bufferToBase64(buffer: Buffer): string {
    return `data:image/gif;base64,${buffer.toString('base64')}`;
}

export async function getImages(query: string): Promise<string[]> {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
            method: 'GET',
            headers: {
                'Authorization': `${env.PEXELS_API_KEY}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // filter non landscape images
        data.photos = data.photos.filter((photo: any) => photo.width > photo.height);
        return data.photos
    }
    catch (error) {
        console.error('Failed to fetch images:', error);
        return [];
    }
}