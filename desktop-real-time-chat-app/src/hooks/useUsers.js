import { useQuery } from '@tanstack/react-query';

const fetchUsers = async () => {
  const token = sessionStorage.getItem('token');
  const res = await fetch('http://localhost:3000/api/getallusers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export const useUsers = () => useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  refetchOnWindowFocus: false, // Optional: disable refetch on window focus
  refetchInterval: 60000, // Optional: refetch data every 60 seconds (adjust as needed)
});