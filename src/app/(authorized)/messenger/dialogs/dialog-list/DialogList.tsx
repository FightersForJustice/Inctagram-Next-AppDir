'use client'

import Image from "next/image";
import {ItemDialogs} from "@/api/messenger.api";

import s from "./DialogList.module.scss";
import React from "react";

type PropsType = {
  dialogs: ItemDialogs[] | null
}

export const DialogList = ({dialogs}: PropsType) => {
  return (
      <div>
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
                  <div key={dialog.id} className={s.dialog}>
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

        ))
            :
            <p>No dialogs</p>
        }
      </div>
  );
};


{/*{ C ?*/
}
{/*    messages.map((message) => (*/
}
{/*    <div key={message.id} className={s.dialog}>*/
}
{/*    gh*/
}
{/*        {message.messageText}*/
}

{/*    </div> */
}
{/*))*/
}
{/*: <div>No messages</div>*/
}
{/*}*/
}