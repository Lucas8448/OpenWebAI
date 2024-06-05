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
        data.photos = data.photos.filter((photo: any) => photo.width > photo.height);
        return data.photos
    }
    catch (error) {
        console.error('Failed to fetch images:', error);
        return [];
    }
}

export async function getVideos(query: string): Promise<string[]> {
    try {
        const response = await fetch(`https://api.pexels.com/videos/search?query=${query}`, {
            method: 'GET',
            headers: {
                'Authorization': `${env.PEXELS_API_KEY}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        data.videos = data.videos.filter((video: any) => video.width > video.height);
        console.log(data.videos)
        return data.videos
    }
    catch (error) {
        console.error('Failed to fetch videos:', error);
        return [];
    }
}

export async function getNews({ query, source_country, language, from, to, news_sources, authors, entities, number }: any): Promise<string[]> {
    try {
        // create query with the given parameters
        let url = `https://api.worldnewsapi.com/search-news?text=${query}`;
        if (source_country) {
            url += `&source_country=${source_country}`;
        }
        if (language) {
            url += `&language=${language}`;
        }
        if (from) {
            url += `&earliest-publish-date=${from}`;
        }
        if (to) {
            url += `&latest-publish-date=${to}`;
        }
        if (news_sources) {
            url += `&news-sources=${news_sources}`;
        }
        if (authors) {
            url += `&authors=${authors}`;
        }
        if (entities) {
            url += `&entities=${entities}`;
        }
        if (number) {
            url += `&number=${number}`;
        }

        console.log(url)

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': `${env.NEWS_API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        return data
    }
    catch (error) {
        console.error('Failed to fetch news:', error);
        return [];
    }
}

