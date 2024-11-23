import {headers} from 'next/headers';
import {Dialogs} from '@/app/(authorized)/messenger/dialogs/Dialogs';

import s from './Messenger.module.scss'

const Messenger = () => {
    const headersList = headers();
    const accessToken = headersList.get('accessToken') as string;
    const id = headersList.get('id');
  // if (!accessToken) {
  //   throw new Error('Access token отсутствует в заголовках.');
  // }
    return (
        <div className={s.wrapper}>
            <h1>Messenger</h1>
            <Dialogs accessToken={accessToken} id={id}/>
        </div>
    );
};

export default Messenger;