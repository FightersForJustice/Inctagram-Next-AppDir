import s from '../../../../app/(authorized)/profile/[id]/MyProfile.module.scss';
export const ProfileInfo = () => {
  return (
    <>
      <div className={s.profile}>
        <div className={s.profile__avatar__container}>
          <div
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: '#191717',
            }}
          ></div>
        </div>
        {/*
        <ProfileWrapper
          data={userData}
          postsData={postsData}
          myProfile={myProfile}
        />
  */}
      </div>
      <div className={s.profile__posts}>
        {/*
        <Posts
          postsData={postsData}
          userData={userData}
          myProfile={myProfile}
        />
        <LoadMore id={userData.id} minId={minId} userData={userData} />
          */}
      </div>
    </>
  );
};
