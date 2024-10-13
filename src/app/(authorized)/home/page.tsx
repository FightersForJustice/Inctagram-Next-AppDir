import { HomePagePost } from './HomePagePost';

import s from './Home.module.scss';

import { headers } from 'next/headers';


const Home = () => {
  const headersList = headers();
  const id = headersList.get('id');


  return (
      <div className={s.container}>
          <div className={s.home}>
            <HomePagePost id={id}/>
          </div>
      </div>
  );
};

export default Home;