import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  const headersList = headers();
  const idHeaders = headersList.get('id') as string;
  const myId = parseInt(idHeaders, 10);
  redirect(`/`);
}
