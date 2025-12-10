// src/utils/googleAuth.ts
export const buildGoogleLoginUrl = () => {
    const redirectUri = `${import.meta.env.VITE_API_URL}/api/auth/login-google`; // khớp với redirect URI config ở Google
    const state = 'https://duolingo-clone-psi.vercel.app/course'; // hoặc '/dashboard', hoặc lưu route hiện tại
  
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
      state,              // BE sẽ redirect về đây sau khi login xong
      prompt: 'consent',  // hoặc 'select_account'
    });
  
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };
  