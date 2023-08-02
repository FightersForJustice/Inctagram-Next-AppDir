import React from "react";

import s from "./PostPopup.module.scss";

type Props = {
  setEditPost: (value: boolean) => void;
  setVisiblePopup: (value: boolean) => void;
  postId: number | undefined;
  toggleShowAreYouSureModal: () => void;
};

export const PostPopup: React.FC<Props> = ({ setEditPost, setVisiblePopup, postId, toggleShowAreYouSureModal }) => {
  const onEditPost = () => {
    setVisiblePopup(false);
    setEditPost(true);
  };

  return (
    <>
      <div className={s.popup}>
        <div className={s.popup__item} onClick={onEditPost}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 20H5C4.73478 20 4.48043 20.1054 4.29289 20.2929C4.10536 20.4804 4 20.7348 4 21C4 21.2652 4.10536 21.5196 4.29289 21.7071C4.48043 21.8946 4.73478 22 5 22H19C19.2652 22 19.5196 21.8946 19.7071 21.7071C19.8946 21.5196 20 21.2652 20 21C20 20.7348 19.8946 20.4804 19.7071 20.2929C19.5196 20.1054 19.2652 20 19 20Z"
              fill="white"
            />
            <path
              d="M5.0003 18H5.0903L9.2603 17.62C9.71709 17.5745 10.1443 17.3732 10.4703 17.05L19.4703 8.05C19.8196 7.68096 20.0084 7.1885 19.9953 6.68053C19.9822 6.17256 19.7682 5.6905 19.4003 5.34L16.6603 2.6C16.3027 2.26409 15.8341 2.07135 15.3436 2.05845C14.8532 2.04554 14.3751 2.21336 14.0003 2.53L5.0003 11.53C4.67706 11.856 4.4758 12.2832 4.4303 12.74L4.0003 16.91C3.98683 17.0565 4.00583 17.2041 4.05596 17.3424C4.10608 17.4807 4.1861 17.6062 4.2903 17.71C4.38374 17.8027 4.49455 17.876 4.61639 17.9258C4.73823 17.9755 4.86869 18.0008 5.0003 18ZM15.2703 4L18.0003 6.73L16.0003 8.68L13.3203 6L15.2703 4ZM6.3703 12.91L12.0003 7.32L14.7003 10.02L9.1003 15.62L6.1003 15.9L6.3703 12.91Z"
              fill="white"
            />
          </svg>
          <p className={s.popup__item__name}>Edit Post</p>
        </div>
        <div className={s.popup__item} onClick={toggleShowAreYouSureModal}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 6.00001H16V4.33001C15.9765 3.68982 15.7002 3.08506 15.2316 2.6483C14.7629 2.21153 14.1402 1.9784 13.5 2.00001H10.5C9.85975 1.9784 9.23706 2.21153 8.76843 2.6483C8.2998 3.08506 8.02346 3.68982 8 4.33001V6.00001H3C2.73478 6.00001 2.48043 6.10536 2.29289 6.2929C2.10536 6.48043 2 6.73479 2 7.00001C2 7.26522 2.10536 7.51958 2.29289 7.70711C2.48043 7.89465 2.73478 8.00001 3 8.00001H4V19C4 19.7957 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7957 20 19V8.00001H21C21.2652 8.00001 21.5196 7.89465 21.7071 7.70711C21.8946 7.51958 22 7.26522 22 7.00001C22 6.73479 21.8946 6.48043 21.7071 6.2929C21.5196 6.10536 21.2652 6.00001 21 6.00001ZM10 4.33001C10 4.17001 10.21 4.00001 10.5 4.00001H13.5C13.79 4.00001 14 4.17001 14 4.33001V6.00001H10V4.33001ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V8.00001H18V19Z"
              fill="white"
            />
          </svg>
          <p className={s.popup__item__name}>Delete Post</p>
        </div>
      </div>
    </>
  );
};
