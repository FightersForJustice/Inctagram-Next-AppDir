import { io, Socket } from 'socket.io-client';

export class SocketApi {
  static socket: Socket | null = null;
  static createConnection(accessToken: string) {
    const options = {
      query: {
        accessToken,
      },
    };
    console.log(accessToken);
    this.socket = io('https://inctagram.work', options)

    this.socket.on('connect', () => {
      console.log('connected')
    })

    this.socket.on('connect_error', error => {
      console.log('Web Socket connect_error', error)
    })

    this.socket.on('disconnect', () => {
      console.log('Web Socket Disconnected')
    })
  }
}

export default SocketApi;
