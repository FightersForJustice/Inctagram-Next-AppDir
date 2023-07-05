"use client";

import React, { useState } from "react";

import s from "./MyProfile.module.scss";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next-intl/client";
import { Modal } from "../../../components/Modal/Modal";

const MyProfile = () => {
  const [paidAccount, setPaidAccount] = useState(true);
  const [showSubscribers, setShowSubscribers] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className={s.container}>
        <div className={s.wrapper}>
          <nav className={s.nav}>
            <ul className={s.nav__list}>
              <li>
                <Link
                  href={"/home"}
                  className={`${pathname === "/home" ? `${s.nav__item__active} ${s.nav__item}` : `${s.nav__item}`}`}
                >
                  <svg
                    className={`${pathname === "/home" ? `${s.nav__icon__active} ${s.nav__icon}` : `${s.nav__icon}`}`}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g clip-path="url(#clip0_12478_5201)">
                      <path d="M20.4201 10.18L12.7101 2.29999C12.6172 2.20627 12.5066 2.13187 12.3847 2.0811C12.2628 2.03033 12.1321 2.0042 12.0001 2.0042C11.8681 2.0042 11.7374 2.03033 11.6155 2.0811C11.4937 2.13187 11.3831 2.20627 11.2901 2.29999L3.58012 10.19C3.39355 10.3781 3.24621 10.6013 3.14664 10.8468C3.04708 11.0923 2.99727 11.3551 3.00012 11.62V20C2.99934 20.5119 3.19489 21.0046 3.54649 21.3767C3.89809 21.7488 4.37898 21.9718 4.89012 22H19.1101C19.6213 21.9718 20.1021 21.7488 20.4537 21.3767C20.8053 21.0046 21.0009 20.5119 21.0001 20V11.62C21.0009 11.0829 20.7929 10.5666 20.4201 10.18ZM10.0001 20V14H14.0001V20H10.0001ZM19.0001 20H16.0001V13C16.0001 12.7348 15.8948 12.4804 15.7072 12.2929C15.5197 12.1054 15.2653 12 15.0001 12H9.00012C8.7349 12 8.48055 12.1054 8.29301 12.2929C8.10547 12.4804 8.00012 12.7348 8.00012 13V20H5.00012V11.58L12.0001 4.42999L19.0001 11.62V20Z" />
                    </g>
                    <defs>
                      <clipPath id="clip0_12478_5201">
                        <rect width="24" height="24" fill="yellow" />
                      </clipPath>
                    </defs>
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={"/create"}
                  className={`${pathname === "/create" ? `${s.nav__item__active} ${s.nav__item}` : `${s.nav__item}`}`}
                >
                  <svg
                    className={`${pathname === "/create" ? `${s.nav__icon__active} ${s.nav__icon}` : `${s.nav__icon}`}`}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_12478_5208)">
                      <path d="M18 3H6C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6V18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18V6C21 5.20435 20.6839 4.44129 20.1213 3.87868C19.5587 3.31607 18.7956 3 18 3ZM19 18C19 18.2652 18.8946 18.5196 18.7071 18.7071C18.5196 18.8946 18.2652 19 18 19H6C5.73478 19 5.48043 18.8946 5.29289 18.7071C5.10536 18.5196 5 18.2652 5 18V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H18C18.2652 5 18.5196 5.10536 18.7071 5.29289C18.8946 5.48043 19 5.73478 19 6V18Z" />
                      <path d="M15 11H13V9C13 8.73478 12.8946 8.48043 12.7071 8.29289C12.5196 8.10536 12.2652 8 12 8C11.7348 8 11.4804 8.10536 11.2929 8.29289C11.1054 8.48043 11 8.73478 11 9V11H9C8.73478 11 8.48043 11.1054 8.29289 11.2929C8.10536 11.4804 8 11.7348 8 12C8 12.2652 8.10536 12.5196 8.29289 12.7071C8.48043 12.8946 8.73478 13 9 13H11V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V13H15C15.2652 13 15.5196 12.8946 15.7071 12.7071C15.8946 12.5196 16 12.2652 16 12C16 11.7348 15.8946 11.4804 15.7071 11.2929C15.5196 11.1054 15.2652 11 15 11Z" />
                    </g>
                    <defs>
                      <clipPath id="clip0_12478_5208">
                        <rect width="24" height="24" />
                      </clipPath>
                    </defs>
                  </svg>
                  Create
                </Link>
              </li>
              <li>
                <Link
                  href={"/my-profile"}
                  className={`${
                    pathname === "/my-profile" ? `${s.nav__item__active} ${s.nav__item}` : `${s.nav__item}`
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_12478_5216)">
                      <path
                        d="M12 11C12.7911 11 13.5645 10.7654 14.2223 10.3259C14.8801 9.88635 15.3928 9.26164 15.6955 8.53074C15.9983 7.79983 16.0775 6.99556 15.9231 6.21964C15.7688 5.44372 15.3878 4.73098 14.8284 4.17157C14.269 3.61216 13.5563 3.2312 12.7804 3.07686C12.0044 2.92252 11.2002 3.00173 10.4693 3.30448C9.73836 3.60723 9.11365 4.11992 8.67412 4.77772C8.2346 5.43552 8 6.20888 8 7C8 8.06087 8.42143 9.07828 9.17157 9.82843C9.92172 10.5786 10.9391 11 12 11Z"
                        fill={`${pathname === "/my-profile" ? "var(--primary-500)" : "var(--light-100)"}`}
                      />
                      <path
                        d="M18 21C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946 20.5196 19 20.2652 19 20C19 18.1435 18.2625 16.363 16.9497 15.0503C15.637 13.7375 13.8565 13 12 13C10.1435 13 8.36301 13.7375 7.05025 15.0503C5.7375 16.363 5 18.1435 5 20C5 20.2652 5.10536 20.5196 5.29289 20.7071C5.48043 20.8946 5.73478 21 6 21H18Z"
                        fill={`${pathname === "/my-profile" ? "var(--primary-500)" : "var(--light-100)"}`}
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_12478_5216">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  href={"/messenger"}
                  className={`${
                    pathname === "/messenger" ? `${s.nav__item__active} ${s.nav__item}` : `${s.nav__item}`
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_12478_5183)">
                      <path
                        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                        fill={`${pathname === "/messenger" ? "var(--primary-500)" : "var(--light-100)"}`}
                      />
                      <path
                        d="M16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z"
                        fill={`${pathname === "/messenger" ? "var(--primary-500)" : "var(--light-100)"}`}
                      />
                      <path
                        d="M8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z"
                        fill={`${pathname === "/messenger" ? "var(--primary-500)" : "var(--light-100)"}`}
                      />
                      <path
                        d="M19.0701 4.92999C17.4293 3.27849 15.2638 2.2512 12.9467 2.02523C10.6297 1.79926 8.30647 2.38877 6.3775 3.69212C4.44854 4.99548 3.03475 6.931 2.37988 9.165C1.72501 11.399 1.87009 13.7915 2.79012 15.93C2.88601 16.1288 2.91747 16.3525 2.88012 16.57L2.00012 20.8C1.96621 20.9622 1.97314 21.1302 2.02027 21.2891C2.06739 21.4479 2.15325 21.5925 2.27012 21.71C2.36592 21.8051 2.47999 21.8798 2.60545 21.9297C2.73091 21.9795 2.86516 22.0034 3.00012 22H3.20012L7.48012 21.14C7.69765 21.1138 7.91824 21.1449 8.12012 21.23C10.2586 22.15 12.6511 22.2951 14.8851 21.6402C17.1191 20.9854 19.0546 19.5716 20.358 17.6426C21.6613 15.7136 22.2508 13.3904 22.0249 11.0734C21.7989 8.75635 20.7716 6.59078 19.1201 4.94999L19.0701 4.92999ZM19.9001 13.29C19.7046 14.484 19.2408 15.6181 18.5437 16.6069C17.8465 17.5957 16.9342 18.4136 15.8753 18.9988C14.8164 19.5841 13.6385 19.9216 12.4303 19.9859C11.2222 20.0502 10.0151 19.8396 8.90012 19.37C8.50466 19.2018 8.07985 19.1134 7.65012 19.11C7.4624 19.1113 7.2751 19.128 7.09012 19.16L4.27012 19.73L4.84012 16.91C4.95364 16.2993 4.88046 15.6685 4.63012 15.1C4.16051 13.985 3.94992 12.7779 4.01421 11.5698C4.0785 10.3616 4.41598 9.18374 5.00126 8.12484C5.58654 7.06595 6.40438 6.15359 7.39321 5.45644C8.38205 4.75929 9.51614 4.29551 10.7101 4.09999C11.9634 3.89431 13.2476 3.98997 14.4566 4.37905C15.6656 4.76814 16.7645 5.43948 17.6626 6.33753C18.5606 7.23558 19.232 8.33454 19.6211 9.54351C20.0101 10.7525 20.1058 12.0367 19.9001 13.29Z"
                        fill={`${pathname === "/messenger" ? "var(--primary-500)" : "var(--light-100)"}`}
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_12478_5183">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Messenger
                </Link>
              </li>
              <li>
                <Link
                  href={"/search"}
                  className={`${pathname === "/search" ? `${s.nav__item__active} ${s.nav__item}` : `${s.nav__item}`}`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_12478_5176)">
                      <path
                        d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z"
                        fill={`${pathname === "/search" ? "var(--primary-500)" : "var(--light-100)"}`}
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_12478_5176">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Search
                </Link>
              </li>
              <li>
                <Link
                  href={"/favourites"}
                  className={`${
                    pathname === "/favourites" ? `${s.nav__item__active} ${s.nav__item}` : `${s.nav__item}`
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_12478_5225)">
                      <path
                        d="M6.09008 21.06C5.82486 21.06 5.57051 20.9546 5.38297 20.7671C5.19544 20.5796 5.09008 20.3252 5.09008 20.06L4.94008 5.4C4.92804 5.10234 4.97496 4.80525 5.07815 4.52579C5.18135 4.24633 5.33877 3.99004 5.54137 3.77164C5.74396 3.55324 5.98774 3.37705 6.25868 3.25321C6.52961 3.12936 6.82236 3.0603 7.12008 3.05L16.7101 3C17.0082 3.00521 17.3024 3.06909 17.5758 3.18801C17.8492 3.30692 18.0965 3.47854 18.3036 3.69305C18.5107 3.90756 18.6735 4.16077 18.7827 4.43821C18.8919 4.71565 18.9454 5.01189 18.9401 5.31L19.0801 19.97C19.0818 20.1452 19.0374 20.3178 18.9514 20.4705C18.8654 20.6232 18.7408 20.7506 18.5901 20.84C18.4381 20.9278 18.2656 20.974 18.0901 20.974C17.9145 20.974 17.7421 20.9278 17.5901 20.84L11.8901 17.68L6.60008 20.91C6.44343 20.9975 6.26916 21.0488 6.09008 21.06ZM11.8501 15.51C12.0238 15.5103 12.1951 15.5514 12.3501 15.63L17.0601 18.24L16.9401 5.29C16.9401 5.09 16.8101 4.95 16.7301 4.96L7.13008 5.05C7.05008 5.05 6.94008 5.18 6.94008 5.38L7.06008 18.28L11.3401 15.65C11.4955 15.561 11.671 15.5128 11.8501 15.51Z"
                        fill={`${pathname === "/favourites" ? "var(--primary-500)" : "var(--light-100)"}`}
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_12478_5225">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Favorites
                </Link>
              </li>
              {paidAccount && (
                <li>
                  <Link
                    href={"/statistics"}
                    className={`${
                      pathname === "/statistics" ? `${s.nav__item__active} ${s.nav__item}` : `${s.nav__item}`
                    }`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_10744_8021)">
                        <path
                          d="M21.0001 7C21.0095 6.93032 21.0095 6.85968 21.0001 6.79C20.9913 6.73129 20.9745 6.67407 20.9501 6.62C20.9236 6.57113 20.8935 6.52433 20.8601 6.48C20.822 6.41675 20.7748 6.35947 20.7201 6.31L20.6001 6.24C20.5423 6.19696 20.4782 6.16321 20.4101 6.14H20.2101C20.1491 6.08099 20.078 6.03356 20.0001 6H15.0001C14.7348 6 14.4805 6.10536 14.2929 6.29289C14.1054 6.48043 14.0001 6.73478 14.0001 7C14.0001 7.26522 14.1054 7.51957 14.2929 7.70711C14.4805 7.89464 14.7348 8 15.0001 8H17.8301L13.8301 12.71L9.51005 10.14C9.30543 10.0183 9.06411 9.97359 8.82948 10.0139C8.59484 10.0542 8.38229 10.177 8.23005 10.36L3.23005 16.36C3.14585 16.461 3.08241 16.5777 3.04336 16.7033C3.00432 16.8289 2.99044 16.961 3.00251 17.092C3.01459 17.2229 3.05239 17.3503 3.11374 17.4666C3.17509 17.5829 3.25879 17.6861 3.36005 17.77C3.53996 17.9191 3.7664 18.0005 4.00005 18C4.14696 18.0002 4.29212 17.9681 4.4252 17.9059C4.55829 17.8437 4.67603 17.7529 4.77005 17.64L9.22005 12.3L13.4901 14.86C13.6926 14.9801 13.931 15.0249 14.1633 14.9865C14.3957 14.9481 14.607 14.8289 14.7601 14.65L19.0001 9.7V12C19.0001 12.2652 19.1054 12.5196 19.2929 12.7071C19.4805 12.8946 19.7348 13 20.0001 13C20.2653 13 20.5196 12.8946 20.7072 12.7071C20.8947 12.5196 21.0001 12.2652 21.0001 12V7Z"
                          fill={`${pathname === "/statistics" ? "var(--primary-500)" : "var(--light-100)"}`}
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_10744_8021">
                          <rect
                            width="24"
                            height="24"
                            fill={`${pathname === "/statistics" ? "var(--primary-500)" : "var(--light-100)"}`}
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Statistics
                  </Link>
                </li>
              )}
            </ul>
            <button className={s.nav__btn}>
              <Image src={"/img/nav-icons/logout.svg"} alt={"logout"} width={24} height={24} />
              Log Out
            </button>
          </nav>
          <div className={s.profile}>
            <div>
              <Image
                src={"/img/profile/avatar.png"}
                alt={"avatar"}
                width={204}
                height={204}
                className={s.profile__avatar}
              />
            </div>
            <div className={s.profile__wrapper}>
              <div className={s.profile__title}>
                <div className={s.profile__title__wrapper}>
                  <p>URLProfiele</p>
                  {paidAccount && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.3654 0.521155C11.7342 0.218242 12.2658 0.218242 12.6346 0.521155L14.7751 2.27886C14.9697 2.43869 15.2175 2.5192 15.4689 2.50429L18.2337 2.34039C18.7101 2.31215 19.1402 2.62457 19.2605 3.08645L19.959 5.76657C20.0225 6.01028 20.1757 6.22105 20.3878 6.35676L22.7209 7.84927C23.123 8.10648 23.2872 8.61199 23.1131 9.05641L22.1029 11.6352C22.011 11.8697 22.011 12.1303 22.1029 12.3648L23.1131 14.9436C23.2872 15.388 23.123 15.8935 22.7209 16.1507L20.3878 17.6432C20.1757 17.779 20.0225 17.9897 19.959 18.2334L19.2605 20.9136C19.1402 21.3754 18.7101 21.6879 18.2337 21.6596L15.4689 21.4957C15.2175 21.4808 14.9697 21.5613 14.7751 21.7211L12.6346 23.4788C12.2658 23.7818 11.7342 23.7818 11.3654 23.4788L9.22494 21.7211C9.03031 21.5613 8.78254 21.4808 8.53113 21.4957L5.76633 21.6596C5.28986 21.6879 4.85985 21.3754 4.73948 20.9136L4.04099 18.2334C3.97747 17.9897 3.82434 17.779 3.61219 17.6432L1.27908 16.1507C0.877008 15.8935 0.712758 15.388 0.886858 14.9436L1.89711 12.3648C1.98897 12.1303 1.98897 11.8697 1.89711 11.6352L0.886858 9.05641C0.712757 8.61199 0.877008 8.10648 1.27908 7.84927L3.61219 6.35676C3.82434 6.22105 3.97747 6.01028 4.04099 5.76657L4.73948 3.08645C4.85985 2.62457 5.28986 2.31215 5.76633 2.34039L8.53113 2.50429C8.78254 2.5192 9.03031 2.43869 9.22494 2.27886L11.3654 0.521155Z"
                        fill="#397DF6"
                      />
                      <g clip-path="url(#clip0_4700_12136)">
                        <path
                          d="M15.0801 8.14001C15.0111 8.08537 14.9319 8.04494 14.8472 8.02105C14.7625 7.99716 14.6739 7.99029 14.5865 8.00083C14.4991 8.01136 14.4146 8.0391 14.338 8.08244C14.2614 8.12578 14.1941 8.18387 14.1401 8.25334L9.47341 14.2533L7.18674 11.4667C7.13311 11.3953 7.06567 11.3354 6.98844 11.2906C6.91122 11.2457 6.82577 11.2169 6.73717 11.2057C6.64857 11.1945 6.55863 11.2012 6.47269 11.2255C6.38674 11.2497 6.30655 11.291 6.23686 11.3468C6.16717 11.4027 6.10941 11.472 6.06701 11.5505C6.02461 11.6291 5.99843 11.7154 5.99002 11.8044C5.98162 11.8933 5.99116 11.9829 6.01808 12.0681C6.045 12.1532 6.08876 12.2321 6.14674 12.3L8.92674 15.7533C8.98949 15.8307 9.06877 15.893 9.15875 15.9357C9.24874 15.9784 9.34715 16.0003 9.44674 16C9.55246 16.0047 9.65778 15.9842 9.754 15.9402C9.85022 15.8961 9.93457 15.8298 10.0001 15.7467L15.2201 9.08001C15.2733 9.00936 15.3119 8.92883 15.3337 8.8431C15.3555 8.75738 15.36 8.66817 15.347 8.58069C15.3339 8.4932 15.3036 8.40918 15.2578 8.33352C15.212 8.25787 15.1516 8.19209 15.0801 8.14001Z"
                          fill="white"
                        />
                        <path
                          d="M18.4134 8.14001C18.3444 8.08537 18.2652 8.04494 18.1805 8.02105C18.0958 7.99716 18.0072 7.99029 17.9198 8.00083C17.8324 8.01136 17.7479 8.0391 17.6713 8.08244C17.5947 8.12578 17.5274 8.18387 17.4734 8.25334L12.8067 14.2533L12.4001 13.7533L11.5601 14.8333L12.2934 15.7467C12.3561 15.824 12.4354 15.8863 12.5254 15.929C12.6154 15.9717 12.7138 15.9937 12.8134 15.9933C12.9135 15.9929 13.0123 15.9699 13.1023 15.926C13.1923 15.8822 13.2713 15.8186 13.3334 15.74L18.5534 9.07334C18.6056 9.0029 18.6433 8.92286 18.6645 8.8378C18.6858 8.75274 18.69 8.66433 18.677 8.57764C18.664 8.49095 18.634 8.40767 18.5888 8.33258C18.5435 8.25748 18.4839 8.19204 18.4134 8.14001Z"
                          fill="white"
                        />
                        <path
                          d="M9.80663 12.7067L10.6666 11.6267L10.5333 11.4667C10.4807 11.3938 10.4138 11.3322 10.3368 11.2858C10.2598 11.2394 10.1741 11.2091 10.0851 11.1966C9.99601 11.1842 9.90535 11.1898 9.81854 11.2133C9.73174 11.2368 9.65058 11.2777 9.57996 11.3333C9.51148 11.3884 9.45454 11.4564 9.41243 11.5335C9.37031 11.6105 9.34384 11.6952 9.33455 11.7826C9.32526 11.8699 9.33332 11.9582 9.35828 12.0425C9.38323 12.1267 9.42458 12.2051 9.47996 12.2733L9.80663 12.7067Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4700_12136">
                          <rect width="16" height="16" fill="white" transform="translate(4 4)" />
                        </clipPath>
                      </defs>
                    </svg>
                  )}
                </div>
                <button className={s.profile__btn}>Profile Settings</button>
              </div>
              <div className={s.profile__info}>
                <div className={s.profile__info__subscriptions}>
                  <p>2 218</p>
                  <p>Subscriptions</p>
                </div>
                <div className={s.profile__info__subscribers} onClick={() => setShowSubscribers(true)}>
                  <p>2 358</p>
                  <p>Subscribers</p>
                </div>
                <div className={s.profile__info__publications}>
                  <p>2 764</p>
                  <p>Publications</p>
                </div>
              </div>
              <p className={s.profile__desc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
            </div>
          </div>
          <div className={s.profile__posts}>
            <Image src={"/img/profile/posts/post1.png"} alt={"post1"} width={234} height={228} />
            <Image src={"/img/profile/posts/post2.png"} alt={"post1"} width={234} height={228} />
            <Image src={"/img/profile/posts/post3.png"} alt={"post1"} width={234} height={228} />
            <Image src={"/img/profile/posts/post4.png"} alt={"post1"} width={234} height={228} />
            <Image src={"/img/profile/posts/post5.png"} alt={"post1"} width={234} height={228} />
            <Image src={"/img/profile/posts/post6.png"} alt={"post1"} width={234} height={228} />
            <Image src={"/img/profile/posts/post7.png"} alt={"post1"} width={234} height={228} />
            <Image src={"/img/profile/posts/post8.png"} alt={"post1"} width={234} height={228} />
          </div>
        </div>
      </div>
      {showSubscribers && (
        <Modal
          title={"2 358 Subscribers"}
          isShowBtnOk={false}
          maxWidth={"644px"}
          onClose={() => setShowSubscribers(false)}
        >
          <div className={s.modal}>
            <input type="text" className={s.modal__input} placeholder={"Search"} />
            <Image className={s.modal__icon} src={"/img/modal/search.svg"} alt={"search"} width={20} height={20} />
          </div>
          <div className={s.modal__content}>
            <div className={s.modal__content__left}>
              <Image
                src={"/img/modal/avatar.png"}
                alt={"avatar"}
                width={36}
                height={36}
                className={s.modal__content__avatar}
              />
              <p>URLProfiele</p>
            </div>
            <div className={s.modal__content__right}>
              <button className={s.modal__content__subscribe}>Subscribe</button>
              <button className={s.modal__content__delete}>Delete</button>
            </div>
          </div>
          <div className={s.modal__content}>
            <div className={s.modal__content__left}>
              <Image
                src={"/img/modal/avatar.png"}
                alt={"avatar"}
                width={36}
                height={36}
                className={s.modal__content__avatar}
              />
              <p>URLProfiele</p>
            </div>
            <div className={s.modal__content__right}>
              <button className={s.modal__content__subscribe}>Subscribe</button>
              <button className={s.modal__content__delete}>Delete</button>
            </div>
          </div>
          <div className={s.modal__content}>
            <div className={s.modal__content__left}>
              <Image
                src={"/img/modal/avatar.png"}
                alt={"avatar"}
                width={36}
                height={36}
                className={s.modal__content__avatar}
              />
              <p>URLProfiele</p>
            </div>
            <div className={s.modal__content__right}>
              <button className={s.modal__content__subscribe}>Subscribe</button>
              <button className={s.modal__content__delete}>Delete</button>
            </div>
          </div>
          <div className={s.modal__content}>
            <div className={s.modal__content__left}>
              <Image
                src={"/img/modal/avatar.png"}
                alt={"avatar"}
                width={36}
                height={36}
                className={s.modal__content__avatar}
              />
              <p>URLProfiele</p>
            </div>
            <div className={s.modal__content__right}>
              <button className={s.modal__content__subscribe}>Subscribe</button>
              <button className={s.modal__content__delete}>Delete</button>
            </div>
          </div>
          <div className={s.modal__content}>
            <div className={s.modal__content__left}>
              <Image
                src={"/img/modal/avatar.png"}
                alt={"avatar"}
                width={36}
                height={36}
                className={s.modal__content__avatar}
              />
              <p>URLProfiele</p>
            </div>
            <div className={s.modal__content__right}>
              <button className={s.modal__content__subscribe}>Subscribe</button>
              <button className={s.modal__content__delete}>Delete</button>
            </div>
          </div>
          <div className={s.modal__content}>
            <div className={s.modal__content__left}>
              <Image
                src={"/img/modal/avatar.png"}
                alt={"avatar"}
                width={36}
                height={36}
                className={s.modal__content__avatar}
              />
              <p>URLProfiele</p>
            </div>
            <div className={s.modal__content__right}>
              <button className={s.modal__content__subscribe}>Subscribe</button>
              <button className={s.modal__content__delete}>Delete</button>
            </div>
          </div>
          <div className={s.modal__content}>
            <div className={s.modal__content__left}>
              <Image
                src={"/img/modal/avatar.png"}
                alt={"avatar"}
                width={36}
                height={36}
                className={s.modal__content__avatar}
              />
              <p>URLProfiele</p>
            </div>
            <div className={s.modal__content__right}>
              <button className={s.modal__content__subscribe}>Subscribe</button>
              <button className={s.modal__content__delete}>Delete</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default MyProfile;
