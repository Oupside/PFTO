// src/app/profile/page.jsx
'use client';

import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      setError('로그인 정보가 없습니다. 다시 로그인해 주세요.');
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/user?email=${encodeURIComponent(email)}`);
        
        if (!res.ok) {
          throw new Error(`API 오류 (${res.status}): ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log('사용자 데이터:', data);
        setUser(data);
      } catch (err) {
        console.error('프로필 정보 불러오기 실패:', err);
        setError('프로필 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">프로필 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">오류 발생</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-700 via-neutral-900 to-neutral-800">
      <div className="bg-gray p-8 flex flex-col items-center w-full max-w-md text-gray-700 border rounded">
        <h1 className="text-2xl font-bold mb-6">내 프로필</h1>
        
        {/* 프로필 이미지 영역 */}
        <div className="mb-6">
          {user.profileImage ? (
            <div className="relative">
              <img
                src={user.profileImage}
                alt="프로필 이미지"
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-700"
                onError={(e) => {
                  console.error('이미지 로드 실패:', user.profileImage);
                  e.target.onerror = null;
                  e.target.classList.add('hidden');
                  document.getElementById('fallback-image').classList.remove('hidden');
                }}
              />
              <div id="fallback-image" className="hidden w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">이미지 불러오기 실패</span>
              </div>
            </div>
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">이미지 없음</span>
            </div>
          )}
        </div>
        
        {/* 사용자 정보 */}
        <div className="w-full bg-gray rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <p className="text-lg font-medium p-3 rounded border-gray-700">{user.email}</p>
          </div>
        </div>
        
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-6 py-2 bg-gray text-gray-700 rounded-lg transition"
        >
          뒤로 가기
        </button>
      </div>
    </div>
  );
}
