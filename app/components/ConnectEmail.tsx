'use client'
const ConnectEmail = () => {
    const handleConnect = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
    const scope = encodeURIComponent('https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.readonly');

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
    console.log('🔗 Redirecting to:', url);
    window.location.href = url;
    
  };
    return <button onClick={handleConnect}>Connect Gmail</button>
}

export default ConnectEmail;