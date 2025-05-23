import { io } from "socket.io-client";

let socket;

const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      withCredentials: true,
      transports: ["websocket"],
    });
  }
  return socket;
};

export default getSocket;