import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const body = await request.json();
        return NextResponse.json({
            status: 'success',
            message: 'Registration authorized',
            expert: body.name
        });
    } catch (e) {
        return NextResponse.json({ status: 'error', message: 'Invalid payload' }, { status: 400 });
    }
}

export async function GET() {
    return NextResponse.json({ message: "Register active" });
}
