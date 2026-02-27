import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        console.log("Registration request received:", body);

        // In a real app, we'd save to a database. 
        // For this port, we return success as the frontend handles the session in localStorage.
        return NextResponse.json({
            status: 'success',
            message: 'Registration authorized by Bhavan\'s Institutional Portal'
        });
    } catch (error) {
        return NextResponse.json({ status: 'error', message: 'Invalid request' }, { status: 400 });
    }
}
