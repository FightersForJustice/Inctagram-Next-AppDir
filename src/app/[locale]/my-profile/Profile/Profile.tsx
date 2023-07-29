import React, { useState } from "react";
import s from "../MyProfile.module.scss";
import Image from "next/image";
import { GetResponse } from "../../../../api/profile.api";
import { useTranslations } from "next-intl";
import { Post } from "./Post/Post";
import { ProfileWrapper } from "./ProfileWrapper/ProfileWrapper";
import { EditPostModal } from "../../../../components/Modals/EditPostModal/EditPostModal";
import { InfiniteScrollMyPosts } from "./InfiniteScrollMyPosts/InfiniteScrollMyPosts";

type Props = {
  setShowSubscriptionsModal: (value: boolean) => void;
  setShowSubscribersModal: (value: boolean) => void;
  paidAccount: boolean;
  userData: GetResponse;
};
export const Profile: React.FC<Props> = ({
  setShowSubscriptionsModal,
  setShowSubscribersModal,
  paidAccount,
  userData,
}) => {
  const t = useTranslations("MyProfilePage");
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number>();
  const [modalHeader, setModalHeader] = useState("");

  if (userData) sessionStorage.setItem("userId", userData.id.toString());

  return (
    <>
      <div className={s.profile}>
        <div>
          <Image
            src={`${userData?.avatars[0] ? userData.avatars[0].url : "/img/profile/avatar.png"}`}
            alt={"avatar"}
            width={204}
            height={204}
            className={s.profile__avatar}
          />
        </div>
        <ProfileWrapper
          data={userData}
          t={t}
          setShowSubscriptionsModal={setShowSubscriptionsModal}
          setShowSubscribersModal={setShowSubscribersModal}
          paidAccount={paidAccount}
        />
      </div>
      <div className={s.profile__posts}>
        <InfiniteScrollMyPosts userData={userData} setOpen={setOpen} setSelectedPost={setSelectedPost} />
      </div>

      {open && (
        <EditPostModal
          title={modalHeader}
          width={"1200px"}
          onClose={() => {
            setOpen(false);
          }}
          isOkBtn={false}
        >
          <Post
            setModalHeader={setModalHeader}
            postId={selectedPost}
            avatar={userData?.avatars[0].url}
            userName={userData?.userName}
            setOpen={setOpen}
          />
        </EditPostModal>
      )}
    </>
  );
};
