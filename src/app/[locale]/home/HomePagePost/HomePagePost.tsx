import React from "react";
import s from "./HomePagePost.module.scss";
import Image from "next/image";

import { ImageType, PostsItem } from "@/api/posts.api";
import { GetTimeAgoText } from "@/utils/formatTimeFromDateString";
import { HomePostPopup } from "./HomePostPopup";
import { useGetProfileQuery } from "@/api";
import { HomeCarousel } from "../HomeCarousel";
import { HomePostIcons } from "./HomePostIcons";
import { HomePostDescription } from "./HomePostDescription";
import { HomePostLikes } from "./HomePostLikes";

type Props = {
  post: PostsItem;
  images: ImageType[];
};

export const HomePagePost: React.FC<Props> = ({ post, images }) => {
  const lang = localStorage.getItem("language");
  // const userName = useSelector<RootState, UserName>((state) => state.app.userName);
  const { data, isLoading, refetch } = useGetProfileQuery();

  return (
    <div className={s.post}>
      <div className={s.post__top}>
        <div className={s.post__wrapper}>
          <Image
            // src={data?.avatars.length !== 0 ? data.avatars[0].url : "/img/home/post.png"}
            src={data?.avatars && data.avatars.length !== 0 ? data.avatars[0].url : "/img/create-post/no-image.png"}
            alt={"ava"}
            width={36}
            height={36}
          />

          <p className={s.post__title}>{data?.userName}</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
            <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
          </svg>
          <p className={s.post__time}>{GetTimeAgoText(post.createdAt, lang!)}</p>
        </div>
        <HomePostPopup />
      </div>
      <HomeCarousel images={images} />
      <HomePostIcons />
      <HomePostDescription userName={data?.userName} description={"description"} avatars={data?.avatars} />
      <HomePostLikes />
    </div>
  );
};
