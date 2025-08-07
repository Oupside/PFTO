import clientPromise from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('myDB'); // 실제 DB 이름으로 변경

    const { email, password, profileImage } = await req.json();

    // 1. 이메일 중복 확인
    const exist = await db.collection('users').findOne({ email });
    if (exist) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: '이미 사용 중인 이메일입니다.' 
        }), 
        { status: 409 }
      );
    }

    // 2. 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. 회원 정보 저장
    await db.collection('users').insertOne({
      email,
      password: hashedPassword,
      profileImage: profileImage || '', // 프로필 이미지 URL 저장
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 201 }
    );
    
  } catch (error) {
    console.error('DB 저장 오류:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: '서버 오류 발생',
        error: error.message 
      }), 
      { status: 500 }
    );
  }
}
