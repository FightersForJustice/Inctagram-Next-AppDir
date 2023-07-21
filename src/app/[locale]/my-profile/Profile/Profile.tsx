import React, { useState } from "react";
import s from "../MyProfile.module.scss";
import Image from "next/image";
import { useGetProfileQuery } from "../../../../api/profile.api";
import { Loader } from "../../../../components/Loader/Loader";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useGetPostsQuery } from "../../../../api/posts.api";
import { Post } from "./Post/Post";
import { Modal } from "../../../../components/Modal/Modal";
import { ProfileWrapper } from "./ProfileWrapper/ProfileWrapper";

type Props = {
  setShowSubscriptionsModal: (value: boolean) => void;
  setShowSubscribersModal: (value: boolean) => void;
  paidAccount: boolean;
};

export const Profile: React.FC<Props> = ({ setShowSubscriptionsModal, setShowSubscribersModal, paidAccount }) => {
  const t = useTranslations("MyProfilePage");
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError, error } = useGetProfileQuery();
  const [selectedPost, setSelectedPost] = useState<number>();
  const [modalHeader, setModalHeader] = useState("");
  const getPostsRequest = useGetPostsQuery();
  if (isError) {
    toast.error("Auth error");
  }
  if (data?.id) sessionStorage.setItem("userId", data?.id.toString());

  const openPostHandler = (postId: number) => {
    setOpen(true);
    setSelectedPost(postId);
  };
  const postsImages = () => {
    return getPostsRequest.isSuccess ? (
      getPostsRequest.data?.items.map((i) => {
        if (i.images[0])
          return (
            <Image
              src={i.images ? i.images[0].url : "/img/profile/posts/post1.png"}
              alt={"post"}
              width={234}
              height={228}
              key={i.id}
              onClick={() => openPostHandler(i.id)}
            />
          );
      })
    ) : (
      <Loader />
    );
  };

  return (
    <>
      <div className={s.profile}>
        <div>
          <Image
            src={`${data?.avatars[0].url ? data.avatars[0].url : "/img/profile/avatar.png"}`}
            alt={"avatar"}
            width={204}
            height={204}
            className={s.profile__avatar}
          />
        </div>
        <ProfileWrapper
          data={data}
          t={t}
          setShowSubscriptionsModal={setShowSubscriptionsModal}
          setShowSubscribersModal={setShowSubscribersModal}
          paidAccount={paidAccount}
        />
      </div>
      <div className={s.profile__posts}>{postsImages()}</div>

      {open && (
        <Modal
          title={modalHeader}
          width={"800px"}
          onClose={() => {
            setOpen(false);
          }}
          isOkBtn={false}
        >
          <Post
            setModalHeader={setModalHeader}
            uploadId={selectedPost}
            avatar={data?.avatars[0].url}
            userName={data?.userName}
            setOpen={setOpen}
          />
        </Modal>
      )}
      {isLoading && <Loader />}
    </>
  );
};
