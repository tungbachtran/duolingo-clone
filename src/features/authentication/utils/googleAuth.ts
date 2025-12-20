
export const buildGoogleLoginUrl = () => {
    const redirectUri = `${import.meta.env.VITE_API_URL}/api/auth/login-google`; 
    const state = 'https://duolingo-clone-psi.vercel.app/course'; 
  
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: [
        'openid',
        'email',
        'profile',
      ].join(' '),
      access_type: 'offline',
      include_granted_scopes: 'true',
      state,              
      prompt: 'consent',  
    });
  
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };
  