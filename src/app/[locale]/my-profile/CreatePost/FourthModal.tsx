import React, { ChangeEvent, useState } from "react";
import s from "./CreatePost.module.scss";
import Image from "next/image";
import { FiltersModal } from "../../../../components/FiltersModal/FiltersModal";

type Props = {
  postImage: string;
  showThirdModal: () => void;
  aspectRatio: "" | "1:1" | "4:5" | "16:9";
  activeFilter: string;
  zoomValue: string;
};

const FourthModal: React.FC<Props> = ({ postImage, showThirdModal, aspectRatio, activeFilter, zoomValue }) => {
  const [textareaLength, setTextareaLength] = useState(0);
  const [value, setValue] = useState("");

  const onTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length > 500) return;
    setTextareaLength(e.currentTarget.value.length);
    setValue(e.currentTarget.value);
  };

  return (
    <FiltersModal title={"Publication"} width={"972px"} buttonName={"Publish"} showThirdModal={showThirdModal}>
      <div className={s.cropping__publication}>
        <div className={s.cropping__publication__box}>
          <Image
            src={`${postImage ? postImage : "/img/create-post/filters-modal/image.png"}`}
            alt={"image"}
            width={480}
            height={504}
            style={{
              aspectRatio: aspectRatio.replace(":", "/"),
              maxHeight: "504px",
              filter: activeFilter,
              transform: `scale(${+zoomValue / 10})`,
            }}
          />
        </div>
        <div className={s.cropping__publication__container}>
          <div className={s.cropping__publication__header}>
            <Image
              src={"/img/create-post/publication-modal/image.png"}
              alt={"image"}
              width={72}
              height={48}
              className={s.cropping__publication__image}
            />
            <p>URLProfiele</p>
          </div>
          <div>
            <div className={s.cropping__publication__wrapper}>
              <p className={s.cropping__publication__text}>Add publication descriptions</p>
              <p style={{ color: `${textareaLength > 499 ? "red" : "#8D9094"}` }}>{textareaLength} / 500</p>
            </div>
            <textarea
              cols={30}
              rows={10}
              className={s.cropping__publication__textarea}
              placeholder={"Description..."}
              maxLength={500}
              onChange={onTextareaHandler}
              value={value}
            />
          </div>
        </div>
      </div>
    </FiltersModal>
  );
};

export default FourthModal;
