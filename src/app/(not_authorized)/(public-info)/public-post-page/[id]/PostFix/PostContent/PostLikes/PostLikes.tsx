import s from './PostLikes.module.scss';

type Props = {
  toggleLike: () => void;
  isLiked: boolean;
}


export const PostLikes = ({ toggleLike, isLiked }: Props) => {
  return (
    <div className={s.post__likes}>
      <div className={s.post__likes__container}>
        <div className={s.post__likes__btns}>
          <div className={s.post__likes__btns__wrapper}>
            <button onClick={toggleLike}>
              {isLiked ?
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                    <path d='M12 21C11.8684 21.0008 11.7379 20.9755 11.6161 20.9258C11.4943 20.876 11.3834 20.8027 11.29 20.71L3.51999 12.93C2.54536 11.9452 1.99866 10.6156 1.99866 9.23C1.99866 7.84443 2.54536 6.51482 3.51999 5.53C4.50226 4.55051 5.83283 4.00047 7.21999 4.00047C8.60716 4.00047 9.93773 4.55051 10.92 5.53L12 6.61L13.08 5.53C14.0623 4.55051 15.3928 4.00047 16.78 4.00047C18.1672 4.00047 19.4977 4.55051 20.48 5.53C21.4546 6.51482 22.0013 7.84443 22.0013 9.23C22.0013 10.6156 21.4546 11.9452 20.48 12.93L12.71 20.71C12.6166 20.8027 12.5057 20.876 12.3839 20.9258C12.2621 20.9755 12.1316 21.0008 12 21Z' fill='red'/>
                </svg>
                :
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 21C11.8684 21.0008 11.7379 20.9755 11.6161 20.9258C11.4943 20.876 11.3834 20.8027 11.29 20.71L3.51999 12.93C2.54536 11.9452 1.99866 10.6156 1.99866 9.23C1.99866 7.84443 2.54536 6.51482 3.51999 5.53C4.50226 4.55051 5.83283 4.00047 7.21999 4.00047C8.60716 4.00047 9.93773 4.55051 10.92 5.53L12 6.61L13.08 5.53C14.0623 4.55051 15.3928 4.00047 16.78 4.00047C18.1672 4.00047 19.4977 4.55051 20.48 5.53C21.4546 6.51482 22.0013 7.84443 22.0013 9.23C22.0013 10.6156 21.4546 11.9452 20.48 12.93L12.71 20.71C12.6166 20.8027 12.5057 20.876 12.3839 20.9258C12.2621 20.9755 12.1316 21.0008 12 21ZM7.21999 6C6.79667 5.99808 6.37717 6.08018 5.9858 6.24154C5.59443 6.40289 5.23897 6.6403 4.93999 6.94C4.33605 7.54712 3.99703 8.36865 3.99703 9.225C3.99703 10.0814 4.33605 10.9029 4.93999 11.51L12 18.58L19.06 11.51C19.6639 10.9029 20.003 10.0814 20.003 9.225C20.003 8.36865 19.6639 7.54712 19.06 6.94C18.4437 6.35771 17.6279 6.0333 16.78 6.0333C15.9321 6.0333 15.1163 6.35771 14.5 6.94L12.71 8.74C12.617 8.83373 12.5064 8.90812 12.3846 8.95889C12.2627 9.00966 12.132 9.0358 12 9.0358C11.868 9.0358 11.7373 9.00966 11.6154 8.95889C11.4936 8.90812 11.383 8.83373 11.29 8.74L9.49999 6.94C9.20102 6.6403 8.84556 6.40289 8.45419 6.24154C8.06282 6.08018 7.64332 5.99808 7.21999 6Z"
                    fill="white" />
                </svg>
              }

            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21.0004 3.99999C20.99 3.90813 20.9699 3.81762 20.9404 3.72999V3.63999C20.8925 3.5287 20.8247 3.42705 20.7404 3.33999C20.6556 3.26026 20.5574 3.19596 20.4504 3.14999H20.3604C20.2683 3.0796 20.1628 3.02858 20.0504 2.99999H20.0004C19.901 2.98491 19.7999 2.98491 19.7004 2.99999L1.70045 8.99999C1.50038 9.06575 1.32618 9.193 1.20268 9.36358C1.07918 9.53417 1.0127 9.73939 1.0127 9.94999C1.0127 10.1606 1.07918 10.3658 1.20268 10.5364C1.32618 10.707 1.50038 10.8342 1.70045 10.9L10.2304 13.74L13.0704 22.27C13.1362 22.4701 13.2634 22.6443 13.434 22.7678C13.6046 22.8913 13.8098 22.9577 14.0204 22.9577C14.231 22.9577 14.4363 22.8913 14.6069 22.7678C14.7774 22.6443 14.9047 22.4701 14.9704 22.27L20.9704 4.26999C20.9927 4.18178 21.0028 4.09094 21.0004 3.99999ZM16.3004 6.28999L10.7304 11.86L5.16045 9.99999L16.3004 6.28999ZM14.0004 18.84L12.1404 13.27L17.7104 7.69999L14.0004 18.84Z"
                fill="white"
              />
            </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6.09032 21.06C5.82511 21.06 5.57075 20.9546 5.38322 20.7671C5.19568 20.5796 5.09032 20.3252 5.09032 20.06L4.94032 5.4C4.92828 5.10234 4.97521 4.80525 5.0784 4.52579C5.18159 4.24633 5.33901 3.99004 5.54161 3.77164C5.74421 3.55324 5.98799 3.37705 6.25892 3.25321C6.52986 3.12936 6.8226 3.0603 7.12032 3.05L16.7103 3C17.0084 3.00521 17.3026 3.06909 17.576 3.18801C17.8494 3.30692 18.0968 3.47854 18.3038 3.69305C18.5109 3.90756 18.6737 4.16077 18.7829 4.43821C18.8921 4.71565 18.9456 5.01189 18.9403 5.31L19.0803 19.97C19.082 20.1452 19.0377 20.3178 18.9517 20.4705C18.8657 20.6232 18.7411 20.7506 18.5903 20.84C18.4383 20.9278 18.2659 20.974 18.0903 20.974C17.9148 20.974 17.7423 20.9278 17.5903 20.84L11.8903 17.68L6.60032 20.91C6.44368 20.9975 6.2694 21.0488 6.09032 21.06ZM11.8503 15.51C12.0241 15.5103 12.1953 15.5514 12.3503 15.63L17.0603 18.24L16.9403 5.29C16.9403 5.09 16.8103 4.95 16.7303 4.96L7.13032 5.05C7.05032 5.05 6.94032 5.18 6.94032 5.38L7.06032 18.28L11.3403 15.65C11.4958 15.561 11.6712 15.5128 11.8503 15.51Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
