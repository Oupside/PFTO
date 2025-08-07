'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import useLogin from '../hooks/useLogin';

export default function LoginPage() {
  const router = useRouter();
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  } = useLogin();

  // 회원가입 버튼 클릭 시 라우팅
  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-700 via-neutral-900 to-neutral-800">
      <div className="w-full max-w-sm p-8 bg-gradient-to-br rounded text-gray-700 border rounded">
        <h2 className="mb-6 text-2xl font-bold text-center">로그인</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              아이디(이메일)
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-gray-700"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-gray-700"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-2 font-semibold text-gray-700 rounded"
          >
            로그인
          </button>
        </form>
        <button
          onClick={handleSignup}
          className="w-full py-2 mt-4 text-gray-700 rounded"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
