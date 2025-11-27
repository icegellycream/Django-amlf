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