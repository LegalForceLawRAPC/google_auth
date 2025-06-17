import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) return new NextResponse('Missing code', { status: 400 });

  const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    grant_type: 'authorization_code',
  });

  const { access_token, refresh_token, expires_in } = tokenRes.data;

  // 🔐 Store these securely with your user's Clerk ID
  console.log('✅ Gmail Access Token:', access_token);
  console.log('🔁 Gmail Refresh Token:', refresh_token);

  const origin = req.nextUrl.origin;
  return NextResponse.redirect(`${origin}/dashboard`);
}
