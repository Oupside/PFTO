import { MongoClient } from 'mongodb';

const uri = '여기에 .env.local의 MONGODB_URI 값을 직접 붙여넣으세요';

async function test() {
  try {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
    await client.db().admin().ping();
    console.log('✅ MongoDB 연결 성공');
    await client.close();
  } catch (e) {
    console.error('❌ 연결 실패:', e.message);
  }
}

test();
