import type { APIRoute } from 'astro';

// SHA-256 hash function for server-side use
async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const POST: APIRoute = async ({ request, locals }) => {
    try {
        const body = await request.json();
        const { password } = body;

        if (!password || typeof password !== 'string') {
            return new Response(
                JSON.stringify({ success: false, error: 'Password is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Get password hashes from environment variables
        // On Cloudflare Pages, runtime secrets are in locals.runtime.env
        // In local dev, they're in import.meta.env from .env file
        const runtime = (locals as any)?.runtime;
        const env = runtime?.env || {};

        const guestHash = env.GUEST_PASSWORD_HASH || import.meta.env.GUEST_PASSWORD_HASH;
        const publicHash = env.PUBLIC_PASSWORD_HASH || import.meta.env.PUBLIC_PASSWORD_HASH;

        // Validate that hashes are configured
        if (!guestHash && !publicHash) {
            console.error('Password hashes not configured in environment variables');
            return new Response(
                JSON.stringify({ success: false, error: 'Server configuration error' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Hash the input password
        const inputHash = await sha256(password);

        // Check against stored hashes
        let accessLevel: 'guest' | 'public' | null = null;

        if (guestHash && inputHash === guestHash) {
            accessLevel = 'guest';
        } else if (publicHash && inputHash === publicHash) {
            accessLevel = 'public';
        }

        if (accessLevel) {
            return new Response(
                JSON.stringify({ success: true, accessLevel }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ success: false, error: 'Invalid password' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Login error:', error);
        return new Response(
            JSON.stringify({ success: false, error: 'An error occurred' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
