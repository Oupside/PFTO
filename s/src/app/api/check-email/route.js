// src/app/api/check-email/route.js
import clientPromise from '@/lib/db';

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('myDB'); // 실제 DB 이름으로 변경
    
    const { email } = await req.json();
    const user = await db.collection('users').findOne({ email });
    
    return new Response(
      JSON.stringify({ exists: !!user }),
      { status: 200 }
    );
    
  } catch (error) {
    console.error('이메일 확인 오류:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: '서버 오류 발생' 
      }), 
      { status: 500 }
    );
  }
}
