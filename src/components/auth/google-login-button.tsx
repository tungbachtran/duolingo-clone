// src/components/GoogleLoginButton.tsx
import React from 'react';
import { buildGoogleLoginUrl } from '@/features/authentication/utils/googleAuth'; 

export const GoogleLoginButton: React.FC = () => {
  const handleLogin = () => {
    const url = buildGoogleLoginUrl();
    window.location.href = url;  // redirect thẳng user lên Google
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      style={{
        padding: '8px 16px',
        borderRadius: 4,
        border: '1px solid #ddd',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
        background: '#fff',
      }}
    >
      <img
        src="https://developers-dot-devsite-v2-prod.appspot.com/identity/sign-in/g-normal.png"
        alt="Google"
        width={18}
        height={18}
      />
      <span>Đăng nhập với Google</span>
    </button>
  );
};
