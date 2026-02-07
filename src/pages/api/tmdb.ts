/**
 * TMDB API Proxy Endpoint
 * 
 * This endpoint securely proxies requests to the TMDB API,
 * keeping the API token on the server side.
 * 
 * Environment variable required:
 * - TMDB_API_READ_TOKEN: Your TMDB API Read Access Token
 */

import type { APIRoute } from 'astro';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const endpoint = url.searchParams.get('endpoint');

    console.log('TMDB API proxy called with endpoint:', endpoint);

    if (!endpoint) {
        return new Response(
            JSON.stringify({ error: 'Missing endpoint parameter' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    // Get API token from environment
    const apiToken = import.meta.env.TMDB_API_READ_TOKEN;

    if (!apiToken) {
        // Enhanced error logging for debugging
        console.error('TMDB_API_READ_TOKEN is not configured');
        console.error('Available env vars:', Object.keys(import.meta.env));
        return new Response(
            JSON.stringify({
                error: 'API not configured',
                message: 'TMDB_API_READ_TOKEN environment variable is missing',
                availableEnvVars: Object.keys(import.meta.env)
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        // Build the full TMDB URL
        const tmdbUrl = `${TMDB_BASE_URL}${endpoint}`;

        const response = await fetch(tmdbUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('TMDB API error:', response.status, response.statusText);
            return new Response(
                JSON.stringify({ error: 'TMDB API error', status: response.status }),
                { status: response.status, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const data = await response.json();

        // Return with CORS headers and caching
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
            },
        });
    } catch (error) {
        console.error('TMDB proxy error:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
