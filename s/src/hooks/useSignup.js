import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function useSignup() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState('');
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const checkEmailDuplicate = async () => {
    const res = await fetch('/api/check-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setIsEmailChecked(!data.exists);
  };

  // Cloudinary 업로드 함수
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (!data.url) throw new Error('이미지 업로드 실패');
    return data.url;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isEmailChecked) {
      alert('이메일 중복 확인을 해주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    let profileImageUrl = '';
    if (profileImage) {
      profileImageUrl = await uploadImage(profileImage);
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        profileImage: profileImageUrl,
      }),
    });
    const data = await res.json();
    if (data.success) {
      router.push('/');
      alert('회원가입이 완료되었습니다!');
    } else {
      alert(data.message || '회원가입에 실패했습니다.');
    }
  };

  return {
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
  };
}
