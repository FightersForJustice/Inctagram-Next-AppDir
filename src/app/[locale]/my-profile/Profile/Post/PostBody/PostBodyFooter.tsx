import React, { useState } from "react";
import style from "../Post.module.scss";
import { TransparentBtn } from "src/components/Buttons/TransparentBtn";
import { formatServerDateWithoutTime } from "@/utils";

export const PostBodyFooter = () => {
  const [focus, setFocus] = useState<boolean>(false);
  const imagesArr = ["/img/profile/posts/post5.png", "/img/profile/posts/post6.png", "/img/profile/posts/post7.png"];
  const date = new Date().toString();
  return (
    <div className={style.container_info_footer}>
      <div className={style.container_info_footer_header}>
        <div className={style.container_info_footer_header_header}>
          <div className={style.container_info_footer_header_header_firstEl}>
            <img src="/img/profile/posts/posts-likes/heart-outline.svg" alt="like" />
            <img src="/img/profile/posts/paper-plane-outline.svg" alt="paper-plane" />
          </div>
          <div className={style.container_info_footer_header_header_secEl}>
            <img src="/img/profile/posts/bookmark-outline.svg" alt="bookmark-outline" />
          </div>
        </div>

        <div className={style.container_info_footer_header_likes}>
          <div className={style.container_info_footer_header_likes_images}>
            <div>
              {imagesArr.map((i) => (
                <img key={i} src={i} alt="img" />
              ))}
            </div>
            <div>{formatServerDateWithoutTime(date)}</div>
          </div>

          <div className={style.container_info_footer_header_likes_likesCount}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            2243 <b>"Like"</b>
          </div>
        </div>
      </div>
      <form>
        <input type="text" placeholder={!focus ? "Add a Comment..." : ""} onFocus={() => setFocus(true)} />
        <TransparentBtn style={{ border: "none" }}>Publish</TransparentBtn>
      </form>
    </div>
  );
};
