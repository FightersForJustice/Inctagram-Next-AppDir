import { GetCurrentPostsQuery } from '@/queries/posts/posts.generated';
import Image from 'next/image';
import { ReadMoreButton } from '@/components/ReadMoreButton/ReadMoreButton';
import { getTimeAgoText } from '@/utils';
import { useGetLanguage } from '@/redux/hooks/useGetLanguage';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import s from './../postsList.module.scss';
import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { Carousel } from '@/components/Carousel/Carousel';

type Props = {
  data: GetCurrentPostsQuery;
};

export const PostClient = (data: Props) => {

  const language = useGetLanguage();
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Time.${key}`);
  const translateReadMoreButton = (key: string): string => t(`ReadMore.${key}`);

    return data.data.getPosts.items.map((el) => {

      const time = getTimeAgoText(el.createdAt, language, translate);

      return (
          <div key={el.id} className={s.postContainer}>
            <div>
              <Carousel className={s.carousel}>
              {el.images?.map((i, index) => {
                  return (
                    <SwiperSlide key={i.id}>
                    <Image
                      width={237}
                      height={237}
                      alt={'post'}
                      src={
                        el.images?.length
                          ? el.images[index].url as string
                          : '/img/profile/posts/post1.png'
                      }
                    />
                    </SwiperSlide>
                  );
              })}
              </Carousel>
            </div>

            <div className={s.userContainer}>
              <Link href={'/admin/profile/photos' + `${'/' + el.ownerId}`}>
              <div className={s.user}>
                <Image
                  src={
                    el.postOwner.avatars?.length
                      ? el.postOwner.avatars[0].url as string
                      : '/img/create-post/no-image.png'
                  }
                  alt={'ava'}
                  width={36}
                  height={36}
                  className={s.avatar}
                />
                <h3 className={s.userName}>{el.postOwner.userName} </h3>
              </div>
              </Link>
              <button>
              <Image
                className={s.blockButton}
                alt="block"
                src="/img/block.svg"
                width={24}
                height={24}
              />
              </button>
            </div>
            <p className={s.time}>{time}</p>
            <div className={s.description}>
              <ReadMoreButton
                text={el.description}
                maxLength={80}
                moreText={translateReadMoreButton('showMore')}
                lessText={translateReadMoreButton('hide')}
              />
            </div>
          </div>
      );
    });
};
