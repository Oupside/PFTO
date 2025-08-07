import clientPromise from '@/lib/db';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  if (!email) {
    return new Response(JSON.stringify({ error: '이메일이 필요합니다.' }), { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db('myDB');
  const user = await db.collection('users').findOne({ email });

  if (!user) {
    return new Response(JSON.stringify({ error: '사용자를 찾을 수 없습니다.' }), { status: 404 });
  }

  // 비밀번호 등 민감정보는 제외
  const { password, ...safeUser } = user;
  return new Response(JSON.stringify(safeUser), { status: 200 });
}
