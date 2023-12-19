'use client';
import { setAccessToken } from '@/accessToken';
import { Loader } from '@/components/Loader';
import { redirect } from 'next/navigation';
import { useParams } from 'react-router-dom';

const GitHub = () => {
  const { accessToken } = useParams();
  if (typeof sessionStorage !== 'undefined') {
    setAccessToken(accessToken as string);
  }
  redirect('/my-profile');
  return <Loader />;
};

export default GitHub;
