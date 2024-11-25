import { HomePagePost } from './HomePagePost';

import s from './Home.module.scss';

const Home = () => {
  return (
    <div className={s.container}>
      <div className={s.home}>
        <HomePagePost />
      </div>
    </div>
  );
};

export default Home;
