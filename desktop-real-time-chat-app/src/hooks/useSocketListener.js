import { useEffect, useState, useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import AuthContext from '../authContext';
import getSocket from '../socket';

const useSocketListeners = () => {
  const queryClient = useQueryClient();
  const { user, setUser, fetchUserFromServer } = useContext(AuthContext);
  const [savedToken, setSavedToken] = useState(sessionStorage.getItem('token'));

  useEffect(() => {
    // Check for token every second until it's found
    const intervalId = setInterval(() => {
      const currentToken = sessionStorage.getItem('token');
      if (currentToken) {
        setSavedToken(currentToken);
        clearInterval(intervalId); // Stop the interval once the token is found
      }
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (!savedToken) return;

    const socket = getSocket();

    socket.on('connect', () => {
      console.log('Connected to socket.io server');
      
      // Emit a join event with the user's ID once connected
      if (user?._id) {
        socket.emit('join_user_room', { userId: user._id });
      }
    });

    socket.on('user_registered', async (data) => {
      console.log('New user registered:', data);
      await queryClient.refetchQueries({ queryKey: ['users'] });
    });

    socket.on('friend_added', async (data) => {
      console.log('Friend added event received:', data);
      
      // Check if this event involves the current user
      if (user?._id && (
        (data.userId && data.userId === user._id) || 
        (data.friendId && data.friendId === user._id) ||
        (data.user && data.user._id === user._id) ||
        (data.friend && data.friend._id === user._id)
      )) {
        try {
          const updatedUserData = await fetchUserFromServer(savedToken, user._id);
          setUser(updatedUserData);
          sessionStorage.setItem('user', JSON.stringify(updatedUserData));
          console.log('User data updated after friend_added event:', updatedUserData);
          
          // Invalidate and refetch chatlist to ensure UI is updated
          queryClient.invalidateQueries({ queryKey: ['chatlist'] });
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      }
      
      // Also refresh the users query data
      await queryClient.refetchQueries({ queryKey: ['users'] });
    });

    socket.on('friend_removed', async (data) => {
      console.log('Friend removed event received:', data);
      
      // Check if this event involves the current user
      if (user?._id && (
        (data.userId && data.userId === user._id) || 
        (data.friendId && data.friendId === user._id) ||
        (data.user && data.user._id === user._id) ||
        (data.friend && data.friend._id === user._id)
      )) {
        try {
          const updatedUserData = await fetchUserFromServer(savedToken, user._id);
          setUser(updatedUserData);
          sessionStorage.setItem('user', JSON.stringify(updatedUserData));
          
          // Force clear and refetch instead of just refetching
          // This ensures any deleted chats are removed from the UI
          queryClient.removeQueries({ queryKey: ['chatlist'] });
          queryClient.invalidateQueries({ queryKey: ['chatlist'] });
          
          console.log('User data updated after friend_removed event:', updatedUserData);
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      }
      
      // Also refresh the users query data
      await queryClient.refetchQueries({ queryKey: ['users'] });
    });

    // Add a specific handler for chat deletion events
    socket.on('chat_deleted', async (data) => {
      console.log('Chat deleted event received:', data);
      
      // If this chat deletion involves the current user, update the UI
      if (user?._id && (
        data.participants.includes(user._id)
      )) {
        // Force clear the chatlist cache and refetch
        queryClient.removeQueries({ queryKey: ['chatlist'] });
        queryClient.invalidateQueries({ queryKey: ['chatlist'] });
      }
    });

    socket.on('friend_request_received', async (data) => {
      console.log('Friend request received:', data);
      await queryClient.refetchQueries({ queryKey: ['users'] });
      
      // Optionally update user data from server if needed
      if (user?._id && (data.receiverId === user._id || data.senderId === user._id)) {
        try {
          const updatedUserData = await fetchUserFromServer(savedToken, user._id);
          setUser(updatedUserData);
          sessionStorage.setItem('user', JSON.stringify(updatedUserData));
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    // Cleanup event listeners when component unmounts
    return () => {
      socket.off('connect');
      socket.off('user_registered');
      socket.off('friend_added');
      socket.off('friend_removed');
      socket.off('chat_deleted');
      socket.off('friend_request_received');
      socket.off('disconnect');
    };
  }, [savedToken, queryClient, user, setUser, fetchUserFromServer]);
};

export default useSocketListeners;