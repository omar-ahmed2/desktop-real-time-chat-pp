import React, { useState, useMemo } from 'react';
import { chatUsers } from '../../../data/mockdata';

import ChatList from '../chatList';
import ChatSearchInput from '../searchbar/ChatSearchInput';

const ChatRightSidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  

  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return term
      ? chatUsers.filter(user =>
          user.name.toLowerCase().includes(term)
        )
      : chatUsers;
  }, [searchTerm]);

 


  return (
    <>
      <ChatSearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

        <div className="flex">
            <img src="/images/image (7).png" className="pleft" />
            <h4 className="logo-text">All Chat</h4>
        </div>

      <ChatList users={filteredUsers} />

    </>
  );
};

export default ChatRightSidebar;