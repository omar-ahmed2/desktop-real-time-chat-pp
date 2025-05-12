import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import getSocket from '../socket'; // Import the socket singleton
import authContext from '../authContext';
import { useContext } from 'react';
const useSocketListeners = () => {
  const queryClient = useQueryClient();
  const savedToken = sessionStorage.getItem('token');
  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Check if token exists
    if (!token) {
      console.log("No token found, skipping socket connection");
      return; // If no token, don't establish socket connection
    }

    const socket = getSocket(); // Get the existing or new socket connection

    socket.on("connect", () => {
      console.log("Connected to socket.io server");
    });

    socket.on("user_registered", async (data) => {
      console.log("New user registered:", data);
      await queryClient.refetchQueries({ queryKey: ['users'] });
    });

    return () => {
      socket.off("connect");
      socket.off("user_registered");
    };
  }, [queryClient,savedToken]);
};

export default useSocketListeners;
