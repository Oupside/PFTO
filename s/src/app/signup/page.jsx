'use client';

import React, { useRef } from 'react';
import useSignup from '@/hooks/useSignup';

export default function SignupPage() {
  const fileInputRef = useRef(null);
  const {
    profileImage,
    setProfileImage,
    email,
    setEmail,
    isEmailChecked,
    checkEmailDuplicate,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    handleSignup,
  } = useSignup();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-700 via-neutral-900 to-neutral-800">
      <div className="w-full max-w-sm p-8 bg-gradient-to-br rounded text-gray-700 border rounded">
        <h2 className="mb-6 text-2xl font-bold text-center">회원가입</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <div
              className="w-24 h-24  rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
            >
              {profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="프로필 미리보기"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-700">이미지 선택</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex space-x-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-gray-700"
              placeholder="이메일을 입력하세요"
            />
            <button
              type="button"
              onClick={checkEmailDuplicate}
              className={`px-3 py-2 text-sm font-semibold border rounded ${
                isEmailChecked
                  ? 'border-gray-700 text-gray-700'
                  : 'border-gray-700 text-gray-700'
              }`}
            >
              {isEmailChecked ? '확인됨' : '중복확인'}
            </button>
          </div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-gray-700"
            placeholder="비밀번호를 입력하세요"
          />
          <input
            type="password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-gray-700"
            placeholder="비밀번호를 한 번 더 입력하세요"
          />
          <button
            type="submit"
            className="w-full py-2 mt-2 font-semibold text-gray-700 border rounded"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
