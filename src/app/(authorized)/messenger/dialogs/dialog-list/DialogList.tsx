import Image from 'next/image';
import { ItemDialogs } from '@/api/messenger.api';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/utils/useDebaunce';
import { getUsers } from '@/app/(authorized)/search/SearchContent/actions';
import { UserType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import { useTranslation } from 'react-i18next';
import { useGetLanguage } from '@/redux/hooks/useGetLanguage';
import { formatDialogsDate } from '@/utils/formatDialogsDate';

import s from './DialogList.module.scss';

type PropsType = {
  dialogs: ItemDialogs[];
  fetchDialog: (partnerId: number) => void;
  id: string | null;
  accessToken: string;
  fetchDialogs: () => void;
}

export const DialogList = ({ dialogs, fetchDialog, id, accessToken, fetchDialogs }: PropsType) => {

  const { t } = useTranslation();
  const language = useGetLanguage()
  const translate = (key: string): string => t(`Messenger.${key}`);
  const translateTime = (key: string): string => t(`Time.${key}`)

  const dialogsListRef = useRef<HTMLDivElement | null>(null);

  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<UserType[]>([]);
  const [showUsers, setShowUsers] = useState(false);

  let searchInputHandler = useDebounce(search, 400);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearch(value);
    setShowUsers(true);
  };


  const getMoreSearchedUsers = async () => {
    if (!accessToken) return;

    const data = await getUsers({
      search: searchInputHandler,
      pageNumber: 1,
      pageSize: 5,
    });

    if (data) {
      setUsers(data.items);
    }
  };

  const selectUser = (userId: number) => {

    fetchDialog(id && +id === userId ? userId : userId);
    setShowUsers(false);
    setSearch('');
  };

  useEffect(() => {
    searchInputHandler !== '' && getMoreSearchedUsers();
  }, [searchInputHandler]);

  useEffect(() => {
    let scrollTimeout: string | number | NodeJS.Timeout | undefined;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        if (dialogsListRef.current) {
          const scrollTop = dialogsListRef.current.scrollTop;
          const scrollHeight = dialogsListRef.current.scrollHeight;
          const clientHeight = dialogsListRef.current.clientHeight;

          if (scrollTop + clientHeight >= scrollHeight - 300) {
            fetchDialogs();
          }
        }
      }, 200);
    };

    const scrollableElement = dialogsListRef.current;
    scrollableElement?.addEventListener('scroll', handleScroll);

    return () => {
      scrollableElement?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={s.list_wrapper}>
      <div className={s.input_block}>
        <input
          type="text"
          placeholder={translate('search.placeholder')}
          autoFocus
          value={search}
          onChange={onChangeSearch}
          className={s.input}
        />
        <Image
          className={s.search}
          src={'/img/modal/search.svg'}
          alt={'search'}
          width={20}
          height={20}
        />
        {showUsers && search !== '' &&
          <div className={s.search_users}>
            {users.length > 0 ?
              users.map((user) => (
              <button key={user.id} onClick={() => selectUser(user.id)}>
                <div className={s.search_user}>
                  <Image
                    src={user?.avatars[0]?.url ?? '/img/create-post/no-image.png'}
                    alt="avatar"
                    width={48}
                    height={48}
                    className={s.avatar}
                  />
                  <p>{user.userName}</p>
                </div>
              </button>
            ))
            :
              <p className={s.no_user}>{translate('search.noUser')}</p>
            }
          </div>}
      </div>
      <div className={s.list} ref={dialogsListRef}>
        {dialogs.length > 0 ?
          dialogs.map((dialog) => (
            <button key={dialog.id}
                    onClick={() => fetchDialog(id && +id === dialog.ownerId ? dialog.receiverId : dialog.ownerId)}>
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
                    <span>{formatDialogsDate(
                      dialog.createdAt, language, translateTime)}</span>
                  </div>
                  <p className={s.message}>
                    {dialog.messageText}</p>
                </div>
              </div>
            </button>
          ))
          :
          <p className={s.no_dialogs}>{translate('dialogs.noDialogs')}</p>
        }
      </div>
    </div>
  );
};