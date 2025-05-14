import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import getSocket from '../socket';

const fetchChatList = async () => {
  const token = sessionStorage.getItem('token');
  const user = JSON.parse(sessionStorage.getItem('user'));
  console.log("from socketListner");
  
  // Ensure token and user are present
  if (!token || !user) {
    throw new Error('Token or user data is missing');
  }
  
  const userId = user?._id; // Optional chaining for better safety
  
  const res = await fetch('http://localhost:3000/api/fetchchatlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }), // Sending UserId in the request body
  });

  if (!res.ok) {
    throw new Error('Failed to fetch ChatList');
  }

  return res.json();
};

export const useChatList = () => {
  const queryClient = useQueryClient();
  
  // Set up a listener for chat_deleted event to invalidate the chatlist query
  useEffect(() => {
    const socket = getSocket();
    
    const handleChatDeleted = (data) => {
      console.log('Chat deleted event received in useChatList hook:', data);
      // Force a refetch of the chat list
      queryClient.invalidateQueries({ queryKey: ['chatlist'] });
    };
    
    socket.on('chat_deleted', handleChatDeleted);
    
    return () => {
      socket.off('chat_deleted', handleChatDeleted);
    };
  }, [queryClient]);
  
  return useQuery({
    queryKey: ['chatlist'],
    queryFn: fetchChatList,
    refetchOnWindowFocus: false,
    staleTime: 30000, // Consider data stale after 30 seconds
    cacheTime: 1000 * 60 * 5, // Keep data in cache for 5 minutes
    retry: 1, // Only retry failed requests once
  });
};