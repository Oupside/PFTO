// src/hooks/useLogin.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        // 로그인 성공 시 이메일 저장 (예시)
        localStorage.setItem('userEmail', email);
        // 원하는 페이지로 이동 (예: /profile)
        router.push('/profile');
      } else {
        alert(data.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      alert('서버 오류가 발생했습니다.');
      console.error('로그인 오류:', error);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
}
