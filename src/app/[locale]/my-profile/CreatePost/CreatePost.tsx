import React, { useState } from "react";
import Image from "next/image";
import * as Popover from "@radix-ui/react-popover";

import s from "./CreatePost.module.scss";
import { CroppingSizeModal } from "./CroppingSizeModal/CroppingSizeModal";
import { InputRange } from "./InputRange/InputRange";
import { ImagesCollection } from "./ImagesCollection/ImagesCollection";
import { Modal } from "../../../../components/Modal/Modal";
import { PrimaryBtn } from "../../../../components/PrimaryBtn/PrimaryBtn";
import { TransparentBtn } from "../../../../components/TransparentBtn/TransparentBtn";
import { FiltersModal } from "./FiltersModal/FiltersModal";

type Props = {
  showCreatePostModal: boolean;
  setShowCreatePostModal: (value: boolean) => void;
};

export const CreatePost: React.FC<Props> = ({ showCreatePostModal, setShowCreatePostModal }) => {
  const [openChangeSize, setOpenChangeSize] = useState(false);
  const [openZoom, setOpenZoom] = useState(false);
  const [openCollectionImages, setOpenCollectionImages] = useState(false);

  const filters = ["Normal", "Kyoto", "Lark", "Gingham", "Moon", "Clarendon", "Juno", "Retro", "Paris"];

  return (
    <>
      {/*<Modal title={"Add photo"} width={"492px"}>
        <div className={s.createPost}>
          <Image
            src={"/img/create-post/no-image.png"}
            alt={"no-image"}
            width={222}
            height={228}
            className={s.createPost__image}
          />
          <div className={s.createPost__select}>
            <PrimaryBtn>Select from computer</PrimaryBtn>
          </div>
          <div className={s.createPost__open}>
            <TransparentBtn>Open draft</TransparentBtn>
          </div>
        </div>
      </Modal>*/}

      {/*<CroppingModal title={"Cropping"}>
        <div className={s.cropping}>
          <Image
            src={"/img/create-post/test-image.png"}
            alt={"test-image"}
            width={754}
            height={504}
            className={s.cropping__image}
          />
          <Popover.Root onOpenChange={() => setOpenChangeSize(!openChangeSize)}>
            <Popover.Trigger>
              <svg
                className={s.cropping__icon1}
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect opacity="0.8" width="36" height="36" rx="2" fill="#171717" />
                <g clipPath="url(#clip0_10893_17123)">
                  <path
                    d="M25.9999 11C25.9999 10.7348 25.8946 10.4804 25.707 10.2929C25.5195 10.1054 25.2652 10 24.9999 10H19.9999C19.7347 10 19.4804 10.1054 19.2928 10.2929C19.1053 10.4804 18.9999 10.7348 18.9999 11C18.9999 11.2652 19.1053 11.5196 19.2928 11.7071C19.4804 11.8946 19.7347 12 19.9999 12H22.5699L19.2899 15.29C19.1962 15.383 19.1218 15.4936 19.071 15.6154C19.0203 15.7373 18.9941 15.868 18.9941 16C18.9941 16.132 19.0203 16.2627 19.071 16.3846C19.1218 16.5064 19.1962 16.617 19.2899 16.71C19.3829 16.8037 19.4935 16.8781 19.6154 16.9289C19.7372 16.9797 19.8679 17.0058 19.9999 17.0058C20.132 17.0058 20.2627 16.9797 20.3845 16.9289C20.5064 16.8781 20.617 16.8037 20.7099 16.71L23.9999 13.42V16C23.9999 16.2652 24.1053 16.5196 24.2928 16.7071C24.4804 16.8946 24.7347 17 24.9999 17C25.2652 17 25.5195 16.8946 25.707 16.7071C25.8946 16.5196 25.9999 16.2652 25.9999 16V11Z"
                    fill={openChangeSize ? "#397df6" : "white"}
                  />
                  <path
                    d="M16.71 19.2899C16.617 19.1962 16.5064 19.1218 16.3846 19.071C16.2627 19.0203 16.132 18.9941 16 18.9941C15.868 18.9941 15.7373 19.0203 15.6154 19.071C15.4936 19.1218 15.383 19.1962 15.29 19.2899L12 22.5699V19.9999C12 19.7347 11.8946 19.4804 11.7071 19.2928C11.5196 19.1053 11.2652 18.9999 11 18.9999C10.7348 18.9999 10.4804 19.1053 10.2929 19.2928C10.1054 19.4804 10 19.7347 10 19.9999V24.9999C10 25.2652 10.1054 25.5195 10.2929 25.707C10.4804 25.8946 10.7348 25.9999 11 25.9999H16C16.2652 25.9999 16.5196 25.8946 16.7071 25.707C16.8946 25.5195 17 25.2652 17 24.9999C17 24.7347 16.8946 24.4804 16.7071 24.2928C16.5196 24.1053 16.2652 23.9999 16 23.9999H13.42L16.71 20.7099C16.8037 20.617 16.8781 20.5064 16.9289 20.3845C16.9797 20.2627 17.0058 20.132 17.0058 19.9999C17.0058 19.8679 16.9797 19.7372 16.9289 19.6154C16.8781 19.4935 16.8037 19.3829 16.71 19.2899V19.2899Z"
                    fill={openChangeSize ? "#397df6" : "white"}
                  />
                </g>
                <defs>
                  <clipPath id="clip0_10893_17123">
                    <rect width="24" height="24" fill="white" transform="translate(6 6)" />
                  </clipPath>
                </defs>
              </svg>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content className="PopoverContent" sideOffset={5}>
                <CroppingSizeModal />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
          <Popover.Root onOpenChange={() => setOpenZoom(!openZoom)}>
            <Popover.Trigger>
              <svg
                className={s.cropping__icon2}
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect opacity="0.8" width="36" height="36" rx="2" fill="#171717" />
                <g clipPath="url(#clip0_10893_17124)">
                  <path
                    d="M26.71 25.29L23.31 21.9C24.407 20.5025 25.0022 18.7767 25 17C25 15.4178 24.5308 13.871 23.6518 12.5554C22.7727 11.2398 21.5233 10.2145 20.0615 9.60897C18.5997 9.00347 16.9911 8.84504 15.4393 9.15372C13.8874 9.4624 12.462 10.2243 11.3431 11.3431C10.2243 12.462 9.4624 13.8874 9.15372 15.4393C8.84504 16.9911 9.00347 18.5997 9.60897 20.0615C10.2145 21.5233 11.2398 22.7727 12.5554 23.6518C13.871 24.5308 15.4178 25 17 25C18.7767 25.0022 20.5025 24.407 21.9 23.31L25.29 26.71C25.383 26.8037 25.4936 26.8781 25.6154 26.9289C25.7373 26.9797 25.868 27.0058 26 27.0058C26.132 27.0058 26.2627 26.9797 26.3846 26.9289C26.5064 26.8781 26.617 26.8037 26.71 26.71C26.8037 26.617 26.8781 26.5064 26.9289 26.3846C26.9797 26.2627 27.0058 26.132 27.0058 26C27.0058 25.868 26.9797 25.7373 26.9289 25.6154C26.8781 25.4936 26.8037 25.383 26.71 25.29ZM11 17C11 15.8133 11.3519 14.6533 12.0112 13.6666C12.6705 12.6799 13.6075 11.9109 14.7039 11.4567C15.8003 11.0026 17.0067 10.8838 18.1705 11.1153C19.3344 11.3468 20.4035 11.9182 21.2426 12.7574C22.0818 13.5965 22.6532 14.6656 22.8847 15.8295C23.1162 16.9933 22.9974 18.1997 22.5433 19.2961C22.0892 20.3925 21.3201 21.3295 20.3334 21.9888C19.3467 22.6481 18.1867 23 17 23C15.4087 23 13.8826 22.3679 12.7574 21.2426C11.6321 20.1174 11 18.5913 11 17Z"
                    fill={openZoom ? "#397df6" : "white"}
                  />
                  <path
                    d="M19 16H18V15C18 14.7348 17.8946 14.4804 17.7071 14.2929C17.5196 14.1054 17.2652 14 17 14C16.7348 14 16.4804 14.1054 16.2929 14.2929C16.1054 14.4804 16 14.7348 16 15V16H15C14.7348 16 14.4804 16.1054 14.2929 16.2929C14.1054 16.4804 14 16.7348 14 17C14 17.2652 14.1054 17.5196 14.2929 17.7071C14.4804 17.8946 14.7348 18 15 18H16V19C16 19.2652 16.1054 19.5196 16.2929 19.7071C16.4804 19.8946 16.7348 20 17 20C17.2652 20 17.5196 19.8946 17.7071 19.7071C17.8946 19.5196 18 19.2652 18 19V18H19C19.2652 18 19.5196 17.8946 19.7071 17.7071C19.8946 17.5196 20 17.2652 20 17C20 16.7348 19.8946 16.4804 19.7071 16.2929C19.5196 16.1054 19.2652 16 19 16Z"
                    fill={openZoom ? "#397df6" : "white"}
                  />
                </g>
                <defs>
                  <clipPath id="clip0_10893_17124">
                    <rect width="24" height="24" fill="white" transform="translate(6 6)" />
                  </clipPath>
                </defs>
              </svg>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content className="PopoverContent" sideOffset={5}>
                <InputRange />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
          <Popover.Root onOpenChange={() => setOpenCollectionImages(!openCollectionImages)}>
            <Popover.Trigger>
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={s.cropping__icon3}
              >
                <rect opacity="0.8" width="36" height="36" rx="2" fill="#171717" />
                <g clipPath="url(#clip0_10893_17125)">
                  <path
                    d="M24 9H12C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12V24C9 24.7956 9.31607 25.5587 9.87868 26.1213C10.4413 26.6839 11.2044 27 12 27H24C24.7956 27 25.5587 26.6839 26.1213 26.1213C26.6839 25.5587 27 24.7956 27 24V12C27 11.2044 26.6839 10.4413 26.1213 9.87868C25.5587 9.31607 24.7956 9 24 9ZM12 11H24C24.2652 11 24.5196 11.1054 24.7071 11.2929C24.8946 11.4804 25 11.7348 25 12V20.36L21.8 17.63C21.3042 17.222 20.6821 16.999 20.04 16.999C19.3979 16.999 18.7758 17.222 18.28 17.63L11 23.7V12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11ZM24 25H12.56L19.56 19.16C19.6945 19.0602 19.8575 19.0062 20.025 19.0062C20.1925 19.0062 20.3555 19.0602 20.49 19.16L25 23V24C25 24.2652 24.8946 24.5196 24.7071 24.7071C24.5196 24.8946 24.2652 25 24 25Z"
                    fill={openCollectionImages ? "#397df6" : "white"}
                  />
                  <path
                    d="M14 16C14.8284 16 15.5 15.3284 15.5 14.5C15.5 13.6716 14.8284 13 14 13C13.1716 13 12.5 13.6716 12.5 14.5C12.5 15.3284 13.1716 16 14 16Z"
                    fill={openCollectionImages ? "#397df6" : "white"}
                  />
                </g>
                <defs>
                  <clipPath id="clip0_10893_17125">
                    <rect width="24" height="24" fill="white" transform="translate(6 6)" />
                  </clipPath>
                </defs>
              </svg>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content className="PopoverContent" sideOffset={5}>
                <ImagesCollection />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </CroppingModal>*/}

      {/*<FiltersModal title={"Filters"} width={"972px"}>
        <div className={s.cropping__filters}>
          <Image src={"/img/create-post/filters-modal/image.png"} alt={"image"} width={480} height={504} />
          <div className={s.cropping__filters__items}>
            {filters.map((item, index) => {
              return (
                <div key={index} className={s.cropping__filters__item}>
                  <Image
                    src={"/img/create-post/filters-modal/image-filter.png"}
                    alt={"image-filter"}
                    width={108}
                    height={108}
                  />
                  <p>{item}</p>
                </div>
              );
            })}
          </div>
        </div>
      </FiltersModal>*/}

      <FiltersModal title={"Publication"} width={"972px"}>
        <div className={s.cropping__publication}>
          <Image src={"/img/create-post/filters-modal/image.png"} alt={"image"} width={480} height={504} />
          <div className={s.cropping__publication__container}>
            <div>
              <Image src={"/img/create-post/publication-modal/image.png"} alt={"image"} width={72} height={48} />
              <p>URLProfiele</p>
            </div>
            <div>
              <p>Add publication descriptions</p>
              <textarea cols={30} rows={10} />
            </div>
          </div>
        </div>
      </FiltersModal>
    </>
  );
};
