'use client';
import { Loader } from '@/components/Loader';
import { redirect } from 'next/navigation';
import { useParams } from 'react-router-dom';
const GitHub = () => {
  const { accessToken } = useParams();
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('accessToken', accessToken as string);
  }
  redirect('/my-profile');
  return <Loader />;
};

export default GitHub;
