import React, { useState } from 'react';

import s from '../HomePostPopup/HomePostPopup.module.scss';
import * as Popover from '@radix-ui/react-popover';
import { useTranslation } from 'react-i18next';

type PropsType = {
  isMyPost: boolean | null
}

export const HomePostPopup = ({isMyPost}: PropsType) => {
  const [showPopup, setShowPopup] = useState(false);

  const { t } = useTranslation();
  const translate = (key: string): string => t(`HomePostPopup.${key}`);

  return (
    <div className={s.popup}>
      <Popover.Root onOpenChange={() => setShowPopup(!showPopup)}>
        <Popover.Trigger>
          <div className={s.popup__icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clipPath="url(#clip0_310_6956)">
                <path
                  d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                  fill={`${showPopup ? '#397DF6' : 'white'}`}
                />
                <path
                  d="M19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14Z"
                  fill={`${showPopup ? '#397DF6' : 'white'}`}
                />
                <path
                  d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14Z"
                  fill={`${showPopup ? '#397DF6' : 'white'}`}
                />
              </g>
              <defs>
                <clipPath id="clip0_310_6956">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="PopoverContent z-10" sideOffset={5}>
            <div className={s.popup__container}>
              {isMyPost ?
                <div className={s.popup__item}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 6.00001H16V4.33001C15.9765 3.68982 15.7002 3.08506 15.2316 2.6483C14.7629 2.21153 14.1402 1.9784 13.5 2.00001H10.5C9.85975 1.9784 9.23706 2.21153 8.76843 2.6483C8.2998 3.08506 8.02346 3.68982 8 4.33001V6.00001H3C2.73478 6.00001 2.48043 6.10536 2.29289 6.2929C2.10536 6.48043 2 6.73479 2 7.00001C2 7.26522 2.10536 7.51958 2.29289 7.70711C2.48043 7.89465 2.73478 8.00001 3 8.00001H4V19C4 19.7957 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7957 20 19V8.00001H21C21.2652 8.00001 21.5196 7.89465 21.7071 7.70711C21.8946 7.51958 22 7.26522 22 7.00001C22 6.73479 21.8946 6.48043 21.7071 6.2929C21.5196 6.10536 21.2652 6.00001 21 6.00001ZM10 4.33001C10 4.17001 10.21 4.00001 10.5 4.00001H13.5C13.79 4.00001 14 4.17001 14 4.33001V6.00001H10V4.33001ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V8.00001H18V19Z"
                      fill="white"
                    />
                  </svg>
                  <p>{translate('delete')}</p>
                </div>
                :
                <div className={s.popup__item}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_311_6079)">
                      <path
                        d="M19 4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H19C19.7956 20 20.5587 19.6839 21.1213 19.1213C21.6839 18.5587 22 17.7956 22 17V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM18.33 6L12 10.75L5.67 6H18.33ZM19 18H5C4.73478 18 4.48043 17.8946 4.29289 17.7071C4.10536 17.5196 4 17.2652 4 17V7.25L11.4 12.8C11.5731 12.9298 11.7836 13 12 13C12.2164 13 12.4269 12.9298 12.6 12.8L20 7.25V17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_311_6079">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p>{translate('report')}</p>
                </div>}

              {!isMyPost && <div className={s.popup__item}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_311_6082)">
                    <path
                      d="M21 6H20V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4C18.7348 4 18.4804 4.10536 18.2929 4.29289C18.1054 4.48043 18 4.73478 18 5V6H17C16.7348 6 16.4804 6.10536 16.2929 6.29289C16.1054 6.48043 16 6.73478 16 7C16 7.26522 16.1054 7.51957 16.2929 7.70711C16.4804 7.89464 16.7348 8 17 8H18V9C18 9.26522 18.1054 9.51957 18.2929 9.70711C18.4804 9.89464 18.7348 10 19 10C19.2652 10 19.5196 9.89464 19.7071 9.70711C19.8946 9.51957 20 9.26522 20 9V8H21C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7C22 6.73478 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6Z"
                      fill="white"
                    />
                    <path
                      d="M10 11C10.7911 11 11.5645 10.7654 12.2223 10.3259C12.8801 9.88635 13.3928 9.26164 13.6955 8.53074C13.9983 7.79983 14.0775 6.99556 13.9231 6.21964C13.7688 5.44372 13.3878 4.73098 12.8284 4.17157C12.269 3.61216 11.5563 3.2312 10.7804 3.07686C10.0044 2.92252 9.20017 3.00173 8.46927 3.30448C7.73836 3.60723 7.11365 4.11992 6.67412 4.77772C6.2346 5.43552 6 6.20888 6 7C6 8.06087 6.42143 9.07828 7.17157 9.82843C7.92172 10.5786 8.93913 11 10 11ZM10 5C10.3956 5 10.7822 5.1173 11.1111 5.33706C11.44 5.55683 11.6964 5.86918 11.8478 6.23463C11.9991 6.60009 12.0387 7.00222 11.9616 7.39018C11.8844 7.77814 11.6939 8.13451 11.4142 8.41422C11.1345 8.69392 10.7781 8.8844 10.3902 8.96157C10.0022 9.03874 9.60009 8.99914 9.23463 8.84776C8.86918 8.69639 8.55682 8.44004 8.33706 8.11114C8.1173 7.78224 8 7.39556 8 7C8 6.46957 8.21071 5.96086 8.58579 5.58579C8.96086 5.21072 9.46957 5 10 5Z"
                      fill="white"
                    />
                    <path
                      d="M10 13C8.14348 13 6.36301 13.7375 5.05025 15.0503C3.7375 16.363 3 18.1435 3 20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21C4.26522 21 4.51957 20.8946 4.70711 20.7071C4.89464 20.5196 5 20.2652 5 20C5 18.6739 5.52678 17.4021 6.46447 16.4645C7.40215 15.5268 8.67392 15 10 15C11.3261 15 12.5979 15.5268 13.5355 16.4645C14.4732 17.4021 15 18.6739 15 20C15 20.2652 15.1054 20.5196 15.2929 20.7071C15.4804 20.8946 15.7348 21 16 21C16.2652 21 16.5196 20.8946 16.7071 20.7071C16.8946 20.5196 17 20.2652 17 20C17 18.1435 16.2625 16.363 14.9497 15.0503C13.637 13.7375 11.8565 13 10 13Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_311_6082">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p>{translate('follow')}</p>
              </div>}

              <div className={s.popup__item}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_311_6085)">
                    <path
                      d="M18 21H12C11.2044 21 10.4413 20.6839 9.87868 20.1213C9.31607 19.5587 9 18.7956 9 18V12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9H18C18.7956 9 19.5587 9.31607 20.1213 9.87868C20.6839 10.4413 21 11.2044 21 12V18C21 18.7956 20.6839 19.5587 20.1213 20.1213C19.5587 20.6839 18.7956 21 18 21ZM12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12V18C11 18.2652 11.1054 18.5196 11.2929 18.7071C11.4804 18.8946 11.7348 19 12 19H18C18.2652 19 18.5196 18.8946 18.7071 18.7071C18.8946 18.5196 19 18.2652 19 18V12C19 11.7348 18.8946 11.4804 18.7071 11.2929C18.5196 11.1054 18.2652 11 18 11H12Z"
                      fill="white"
                    />
                    <path
                      d="M9.73 15H5.67C4.96268 14.9974 4.28509 14.7152 3.78494 14.2151C3.28478 13.7149 3.00263 13.0373 3 12.33V5.67C3.00263 4.96268 3.28478 4.28509 3.78494 3.78494C4.28509 3.28478 4.96268 3.00263 5.67 3H12.33C13.0373 3.00263 13.7149 3.28478 14.2151 3.78494C14.7152 4.28509 14.9974 4.96268 15 5.67V9.4H13V5.67C13 5.49231 12.9294 5.32189 12.8038 5.19624C12.6781 5.07059 12.5077 5 12.33 5H5.67C5.49231 5 5.32189 5.07059 5.19624 5.19624C5.07059 5.32189 5 5.49231 5 5.67V12.33C5 12.5077 5.07059 12.6781 5.19624 12.8038C5.32189 12.9294 5.49231 13 5.67 13H9.73V15Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_311_6085">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p>{translate('copy')}</p>
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};
