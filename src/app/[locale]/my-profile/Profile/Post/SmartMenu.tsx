import style from "./Post.module.scss";
import React from "react";

export const SmartMenu = ({ onClickEdit, onClickDelete }: { onClickEdit: any; onClickDelete: () => void }) => {
  return (
    <div className={style.SmartMenu}>
      <div onClick={() => onClickEdit(true)} className={style.SmartMenu_edit}>
        <img src="/img/profile/posts/trash-outline.svg" alt="/img/settings-profile/load-avatar.svg" />
        <span>Edit Post</span>
      </div>
      <div onClick={onClickDelete} className={style.SmartMenu_delete}>
        <img src="/img/profile/posts/edit-2-outline.svg" alt="/img/settings-profile/load-avatar.svg" />
        <span>Delete Post</span>
      </div>
    </div>
  );
};
