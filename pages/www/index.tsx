import { hideWhenAuth } from '@/utils/getServerSideProps/hideWhenAuth';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = hideWhenAuth;

const www = () => {
  return <>www</>;
};

export default www;
