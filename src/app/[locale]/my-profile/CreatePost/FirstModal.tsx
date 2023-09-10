import React, { ChangeEvent, Dispatch, SetStateAction, useId } from "react";
import s from "./CreatePost.module.scss";
import { PrimaryBtn } from "src/components/Buttons/PrimaryBtn";
import { TransparentBtn } from "src/components/Buttons/TransparentBtn";
import { Modal } from "@/components/Modals/Modal";
import { ImageType } from "./CreatePost";
import Image from "next/image";
import { postActions } from "@/redux/reducers/post/postReducer";
import { useAppDispatch } from "@/redux/hooks/useDispatch";

type Props = {
  setPostImage: (value: string) => void;
  setFile: (file: File[]) => void;
  setShowCreatePostModal: (value: boolean) => void;
  setLoadedImages: Dispatch<SetStateAction<ImageType[]>>;
  loadedImages: ImageType[];
  currentFile?: File[];
};
export const FirstModal: React.FC<Props> = ({
  currentFile,
  setPostImage,
  setFile,
  setShowCreatePostModal,
  setLoadedImages,
  loadedImages,
}) => {
  const dispatch = useAppDispatch();
  const id = useId();
  const onSetUserAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (currentFile) {
      let newArr = currentFile;
      newArr.push(file);
      setFile(newArr);
    } else {
      setFile([file]);
    }

    let newImagesArr: ImageType[] = loadedImages;
    newImagesArr.push({ id, image: URL.createObjectURL(file) });

    newImagesArr.map((i) => {
      // dispatch(postActions.addImage(i));
    });

    setPostImage(URL.createObjectURL(file));

    dispatch(postActions.addImage({ id, image: URL.createObjectURL(file) }));
    // setLoadedImages(newImagesArr);
  };

  return (
    <Modal title={"Add photo"} width={"492px"} onClose={() => setShowCreatePostModal(false)}>
      <div className={s.createPost}>
        <Image
          src={"/img/create-post/no-image.png"}
          alt={"no-image"}
          width={222}
          height={228}
          className={s.createPost__image}
        />
        <div className={s.createPost__select}>
          <input type="file" className={s.createPost__file} onChange={onSetUserAvatar} />
          <div className={s.createPost__overlay}>
            <PrimaryBtn>Select from computer</PrimaryBtn>
          </div>
        </div>
        <div className={s.createPost__open}>
          <TransparentBtn>Open draft</TransparentBtn>
        </div>
      </div>
    </Modal>
  );
};
