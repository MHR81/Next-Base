import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_URL = "http://192.168.70.194:3002/api";

async function handler(request, { params }) {
    const path = params.path.join('/');
    const searchParams = request.nextUrl.searchParams.toString();
    const url = `${API_URL}/${path}${searchParams ? `?${searchParams}` : ''}`;

    try {
        const cookieStore = await cookies();

        const fetchOptions = {
            method: request.method,
            headers: {
                Cookie: request.headers.get('cookie') || '',
                // Authorization: request.headers.get('authorization') || '',
            },
        };

        const contentType = request.headers.get('content-type') || '';

        if (contentType.includes('multipart/form-data')) {
            fetchOptions.body = await request.formData();
        } else if (contentType.includes('application/json')) {
            fetchOptions.headers['Content-Type'] = 'application/json';
            const body = await request.json().catch(() => null);
            if (body) fetchOptions.body = JSON.stringify(body);
        }

        const response = await fetch(url, fetchOptions);

        const data = await response.json().catch(() => null);

        return NextResponse.json(data, { status: response.status });

    } catch (error) {
        return NextResponse.json(
            { message: 'خطای ارتباط با سرور' },
            { status: 500 }
        );
    }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;