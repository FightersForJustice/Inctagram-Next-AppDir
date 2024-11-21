'use client'

import {useConnectSocket} from "@/webSocket/hooks/useConnectSocket";
import {useEffect, useState} from "react";
import {SocketEvents} from "@/webSocket/hooks/SocketEvents";
import {getDialogs, ItemDialogs} from "@/api/messenger.api";
import {DialogList} from "@/app/(authorized)/messenger/dialogs/dialog-list/DialogList";

import s from './Dialogs.module.scss'
import {DialogWindow} from "@/app/(authorized)/messenger/dialogs/dialog-window/DialogWindow";


type PropsType = {
    accessToken: string;
    id: string | null;
}

export const Dialogs = ({accessToken, id}: PropsType) => {

    const [dialogs, setDialogs] = useState<ItemDialogs[] | null>(null)

    const socket = useConnectSocket({accessToken});

    const sendMessage = () => {
        if (!socket) {
            console.error('Socket не подключен или сообщение пустое.');
            return;
        }

        socket.emit(SocketEvents.RECEIVE_MESSAGE, {message: 'Как дела?', receiverId: 1558}, (response: any) => {
            console.log('Сообщение отправлено:', response);
        });
    };


    const fetchDialogs = async () => {
        const data = await getDialogs(accessToken);
        if (data && data.items.length > 0) {
            console.log('Fetched dialogs:', data.items);
            setDialogs(data.items);
        }
    };

    useEffect(() => {
        fetchDialogs();
    }, []);


    return (
        <div className={s.dialogs}>
            <DialogList dialogs={dialogs}/>
            <DialogWindow />
        </div>
    );
};

