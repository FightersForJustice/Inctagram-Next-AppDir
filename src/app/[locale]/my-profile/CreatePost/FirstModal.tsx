import React, { ChangeEvent, useState } from "react";
import s from "./CreatePost.module.scss";
import Image from "next/image";
import { PrimaryBtn } from "../../../../components/PrimaryBtn/PrimaryBtn";
import { TransparentBtn } from "../../../../components/TransparentBtn/TransparentBtn";
import { Modal } from "../../../../components/Modal/Modal";

type Props = {
  setShowCreatePostModal: (value: boolean) => void;
  setPostImage: (value: string) => void;
};
const FirstModal: React.FC<Props> = ({ setShowCreatePostModal, setPostImage }) => {
  const [file, setFile] = useState<File>();

  const onSetUserAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setFile(file);
    setPostImage(URL.createObjectURL(file));
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

export default FirstModal;
