'use server';

import { cookies } from 'next/headers';

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    const cookieStore = await cookies();
    await cookieStore.set('session_userid', userId, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
    });

    await cookieStore.set('session_access_token', accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60, // 60 minutes
        path: '/'
    });

    await cookieStore.set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
    });
}

export async function resetAuthCookies() {
    const cookieStore = await cookies();
    await cookieStore.set('session_userid', '');
    await cookieStore.set('session_access_token', '');
    await cookieStore.set('session_refresh_token', '');
}

//
// Get data

export async function getUserId() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('session_userid');
    return userId?.value || null;
}

export async function getAccessToken() {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get('session_access_token')?.value;
    let refreshToken = cookieStore.get('session_refresh_token')?.value;

    if (!accessToken || !refreshToken) {
        return null;
    }

    // Try to refresh the token
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/auth/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh: refreshToken
            })
        });

        if (response.ok) {
            const data = await response.json();
            const newAccessToken = data.access;

            // Update the access token cookie
            await cookieStore.set('session_access_token', newAccessToken, {
                httpOnly: true,
                secure: false,
                maxAge: 60 * 60, // 60 minutes
                path: '/'
            });

            return newAccessToken;
        }
    } catch (error) {
        console.error('Token refresh failed:', error);
    }

    return accessToken;
}