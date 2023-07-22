import React, { useEffect, useState } from "react";
import s from "../MyProfile.module.scss";
import Image from "next/image";
import { useGetProfileQuery } from "../../../../api/profile.api";
import { Loader } from "../../../../components/Loader/Loader";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { Post } from "./Post/Post";
import { ProfileWrapper } from "./ProfileWrapper/ProfileWrapper";
import { Modal } from "../../../../components/Modals/Modal/Modal";
import { useGetPostsPaginationQuery } from "../../../../api/posts.api";

type Props = {
  setShowSubscriptionsModal: (value: boolean) => void;
  setShowSubscribersModal: (value: boolean) => void;
  paidAccount: boolean;
};
export const Profile: React.FC<Props> = ({ setShowSubscriptionsModal, setShowSubscribersModal, paidAccount }) => {
  const t = useTranslations("MyProfilePage");
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError } = useGetProfileQuery();
  const [selectedPost, setSelectedPost] = useState<number>();
  const [modalHeader, setModalHeader] = useState("");

  let userId;
  if (data?.id) {
    sessionStorage.setItem("userId", data?.id.toString());
    userId = sessionStorage.getItem("userId") || "user";
  }

  const getPostsRequest = useGetPostsPaginationQuery(userId || "user name");
  const openPostHandler = (postId: number) => {
    setOpen(true);
    setSelectedPost(postId);
  };
  useEffect(() => {
    if (isError) toast.error("Auth error");
  }, [isError]);

  useEffect(() => {
    getPostsRequest.refetch();
  });
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
            src={`${data?.avatars[0] ? data.avatars[0].url : "/img/profile/avatar.png"}`}
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
            refetchPosts={getPostsRequest.refetch}
            setModalHeader={setModalHeader}
            postId={selectedPost}
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
