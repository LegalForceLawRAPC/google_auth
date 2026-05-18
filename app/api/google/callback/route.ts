import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) return new NextResponse('Missing code', { status: 400 });

  try {
    const tokenRes = await axios.post(
      'https://oauth2.googleapis.com/token',
      new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
        grant_type: 'authorization_code',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    const { access_token, refresh_token } = tokenRes.data;

    // TODO: Store these securely against the authenticated user
    console.log('✅ Gmail Access Token:', access_token);
    console.log('🔁 Gmail Refresh Token:', refresh_token);

    const origin = req.nextUrl.origin;
    return NextResponse.redirect(`${origin}/dashboard`);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('Google token exchange failed:', {
        status: err.response?.status,
        data: err.response?.data,
        sentRedirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
        clientIdSuffix: process.env.GOOGLE_CLIENT_ID?.slice(-12),
      });
      return new NextResponse(
        `Token exchange failed: ${JSON.stringify(err.response?.data)}`,
        { status: 500 },
      );
    }
    throw err;
  }
}
