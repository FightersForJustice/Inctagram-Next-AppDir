import { AspectRatioType } from '@/app/(authorized)/CreatePost/CreatePost';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { postActions } from '@/redux/reducers/post/postReducer';

import s from './CroppingSizeModal.module.scss';

export const CroppingSizeModal = () => {
  const dispatch = useAppDispatch();
  const ratio = useAppSelector((state) => state.post.cropAspectRatio);
  return (
    <div className={s.cropping__size}>
      <div className={s.cropping__items}>
        <div
          className={s.cropping__item}
          onClick={() => {
            dispatch(postActions.setCropAspectRatio(AspectRatioType.one));
          }}
        >
          <p
            className={`${
              ratio === AspectRatioType.one
                ? `${s.cropping__text__active}`
                : `${s.cropping__text}`
            }`}
          >
            Original
          </p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_306_6397)">
              <path
                d="M18 3H6C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6V18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18V6C21 5.20435 20.6839 4.44129 20.1213 3.87868C19.5587 3.31607 18.7956 3 18 3ZM6 5H18C18.2652 5 18.5196 5.10536 18.7071 5.29289C18.8946 5.48043 19 5.73478 19 6V14.36L15.8 11.63C15.3042 11.222 14.6821 10.999 14.04 10.999C13.3979 10.999 12.7758 11.222 12.28 11.63L5 17.7V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5ZM18 19H6.56L13.56 13.16C13.6945 13.0602 13.8575 13.0062 14.025 13.0062C14.1925 13.0062 14.3555 13.0602 14.49 13.16L19 17V18C19 18.2652 18.8946 18.5196 18.7071 18.7071C18.5196 18.8946 18.2652 19 18 19Z"
                fill={ratio === AspectRatioType.one ? 'white' : '#8D9094'}
              />
              <path
                d="M8 10C8.82843 10 9.5 9.32843 9.5 8.5C9.5 7.67157 8.82843 7 8 7C7.17157 7 6.5 7.67157 6.5 8.5C6.5 9.32843 7.17157 10 8 10Z"
                fill={ratio === AspectRatioType.one ? 'white' : '#8D9094'}
              />
            </g>
            <defs>
              <clipPath id="clip0_306_6397">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div
          className={s.cropping__item}
          onClick={() =>
            dispatch(postActions.setCropAspectRatio(AspectRatioType.two))
          }
        >
          <p
            className={`${
              ratio === AspectRatioType.two
                ? `${s.cropping__text__active}`
                : `${s.cropping__text}`
            }`}
          >
            4:3
          </p>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1"
              width="16"
              height="16"
              rx="2"
              stroke={ratio === AspectRatioType.two ? 'white' : '#8D9094'}
              strokeWidth="2"
            />
          </svg>
        </div>
        <div
          className={s.cropping__item}
          onClick={() =>
            dispatch(postActions.setCropAspectRatio(AspectRatioType.three))
          }
        >
          <p
            className={`${
              ratio === AspectRatioType.three
                ? `${s.cropping__text__active}`
                : `${s.cropping__text}`
            }`}
          >
            4:5
          </p>
          <svg
            width="18"
            height="26"
            viewBox="0 0 18 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1"
              width="16"
              height="24"
              rx="2"
              stroke={ratio === AspectRatioType.three ? 'white' : '#8D9094'}
              strokeWidth="2"
            />
          </svg>
        </div>
        <div
          className={s.cropping__item}
          onClick={() =>
            dispatch(postActions.setCropAspectRatio(AspectRatioType.four))
          }
        >
          <p
            className={`${
              ratio === AspectRatioType.four
                ? `${s.cropping__text__active}`
                : `${s.cropping__text}`
            }`}
          >
            16:9
          </p>
          <svg
            width="26"
            height="20"
            viewBox="0 0 26 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="25"
              y="1"
              width="18"
              height="24"
              rx="2"
              transform="rotate(90 25 1)"
              stroke={ratio === AspectRatioType.four ? 'white' : '#8D9094'}
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
