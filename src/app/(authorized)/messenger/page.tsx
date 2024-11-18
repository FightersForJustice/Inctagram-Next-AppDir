import { headers } from 'next/headers';
import { Dialogs } from '@/app/(authorized)/messenger/dialogs/Dialogs';
import { useConnectSocket } from '@/webSocket/hooks/useConnectSocket';


const Messenger = () => {
  const headersList = headers();
  const accessToken = headersList.get('accessToken') as string;

  // const { emitMessage } = useConnectSocket({
  //   accessToken,
  //   onMessageSent: (message) => {
  //     console.log('Message was sent:', message);
  //   },
  // });

  const handleSendMessage = () => {
    const message = 'Привет!';
    const receiverId = 2; // ID получателя
    // emitMessage(message, receiverId);
  };

  return (
    <div>
      <button onClick={handleSendMessage}>Отправить сообщение</button>
    </div>
  );
};

export default Messenger;