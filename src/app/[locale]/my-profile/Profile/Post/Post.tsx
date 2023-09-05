"use client";
import React, { useEffect, useState } from "react";
import style from "./Post.module.scss";
import { SwiperSlide } from "swiper/react";

import { Loader } from "@/components/Loader";
import { PostBody } from "./PostBody";
import { PostBodyEdit } from "./PostBody/PostBodyEdit";
import { useGetPostQuery } from "@/api";
import { Carousel } from "@/components/Carousel/Carousel";
import { ImageType } from "@/app/[locale]/my-profile/CreatePost/CreatePost";
import Image from "next/image";

type PropsType = {
  setOpen: (value: boolean) => void;
  postId?: number;
  avatar?: string;
  userName?: string;
  setModalHeader: any;
};

export const Post = ({ postId, avatar, userName, setOpen, setModalHeader }: PropsType) => {
  const { data, isSuccess, refetch } = useGetPostQuery(postId ?? 0);
  const [editMode, setEditMode] = useState(false);

  if (editMode) setModalHeader("Edit");

  useEffect(() => {
    return () => {
      setModalHeader("");
    };
  }, []);

  return (
    <div className={style.post_container}>
      <div className={style.post_container_body}>
        <div className={style.post_container_body_image}>
          {isSuccess ? (
            <Carousel>
              {data.images.map((i) => {
                console.log(i.url);
                return (
                  <SwiperSlide key={i.uploadId} className={"w-full"}>
                    <Image src={i.url} alt={"err"} width={100} />
                  </SwiperSlide>
                );
              })}
            </Carousel>
          ) : (
            <Loader />
          )}
        </div>
        {editMode ? (
          data?.description && (
            <PostBodyEdit
              refetch={refetch}
              setOpen={setOpen}
              avatar={avatar}
              userName={userName}
              description={data?.description}
              uploadId={postId}
            />
          )
        ) : (
          <PostBody
            setOpen={setOpen}
            uploadId={postId ?? 0}
            setEditMode={setEditMode}
            avatar={avatar}
            userName={userName}
            isSuccess={isSuccess}
            data={data}
            createdAt={data?.createdAt}
            updatedAt={data?.updatedAt}
          />
        )}
      </div>
    </div>
  );
};
