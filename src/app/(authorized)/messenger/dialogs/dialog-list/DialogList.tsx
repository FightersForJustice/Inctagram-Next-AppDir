'use client';

import Image from 'next/image';
import { ItemDialogs } from '@/api/messenger.api';

import s from './DialogList.module.scss';
import React from 'react';

type PropsType = {
  dialogs: ItemDialogs[] | null;
  fetchDialog: (partnerId: number) => void;
  id: string | null;
}

export const DialogList = ({ dialogs, fetchDialog, id }: PropsType) => {
  return (
    <div className={s.list}>
      <div className={s.input_block}>
        <input
          type="text"
          // value={search}
          // onChange={onChangeSearch}
          placeholder={'Input search'}
          autoFocus
        />
      </div>
      {dialogs ?
        dialogs.map((dialog) => (
          <button key={dialog.id} onClick={() => fetchDialog(id && +id === dialog.ownerId ? dialog.receiverId : dialog.ownerId)}>
            <div className={s.dialog}>
              <Image
                src={dialog?.avatars[0]?.url ?? '/img/create-post/no-image.png'}
                alt="avatar"
                width={48}
                height={48}
                className={s.avatar}
              />
              <div className={s.info}>
                <div className={s.user}>
                  <div className={s.name}>{dialog.userName}</div>
                  <span>18:34</span>
                </div>
                <p className={s.message}>{dialog.messageText}</p>
              </div>
            </div>
          </button>
        ))
        :
        <p>No dialogs</p>
      }
    </div>
  );
};