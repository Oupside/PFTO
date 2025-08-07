import clientPromise from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { email, password } = await req.json();

  const client = await clientPromise;
  const db = client.db('myDB'); // 실제 DB 이름
  const user = await db.collection('users').findOne({ email });

  if (!user) {
    return new Response(JSON.stringify({ success: false, message: '이메일이 존재하지 않습니다.' }), { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ success: false, message: '비밀번호가 일치하지 않습니다.' }), { status: 401 });
  }

  // 로그인 성공
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
