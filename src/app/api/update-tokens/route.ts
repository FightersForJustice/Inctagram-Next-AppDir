import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  //const res = request.json();
  console.log(request.headers.get('cookie'));
  try {
    const result = 'qq';
    return NextResponse.json({ result: request }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
