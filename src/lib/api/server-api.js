import { cookies } from 'next/headers';

const BASE_URL = process.env.API_BASE_URL || "http://192.168.70.194:3002/api";

export async function serverFetch(
  endpoint,
  { method = 'GET', body, headers = {}, cache = 'no-store' } = {}
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const url = `${BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    method,
    cache,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`API_ERROR: ${res.status} - ${errorBody || 'Unknown error'}`);
  }

  return res.json();
}
