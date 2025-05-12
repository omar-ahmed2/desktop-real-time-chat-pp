import { useState, useMemo } from 'react';
import { chatUsers } from '../../../data/mockdata';
import ChatList from '../chatList';
import ChatSearchInput from '../searchbar/ChatSearchInput';
import MediaQuery from 'react-responsive';


const ChatRightSidebar = ({ setMessage, setSelectedUser }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return term
      ? chatUsers.filter(user =>
          user.name.toLowerCase().includes(term)
        )
      : chatUsers;
  }, [searchTerm]);

  const handleUserSelect = (userId) => {
    const user = chatUsers.find(user => user.id === userId);
    setSelectedUser(user); // تحديد المستخدم المختار هنا
    setMessage(userId); // إرسال المستخدم لعرض الرسائل
  };

  return (
    <div className='mobile-chat-container'>

      <MediaQuery maxWidth={1225}>
          <div className="sidebar-header animate-fade-in">
            <div className="logo-chatty">
            <img src="/images/logo2.png" alt="Logo" className="logo-chatty" /><span className="logo-text-chatty">Chatty</span>
          </div>
        </div>
        </MediaQuery>

      <ChatSearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="flex">
        <img src="/images/image (7).png" className="pleft" alt="Logo" />
        <h4 className="logo-text">All Chat</h4>
      </div>

      <ChatList users={filteredUsers} setMessage={setMessage} onSelectUser={handleUserSelect} /> {/* إضافة دالة onSelectUser هنا */}
    </div>
  );
};

export default ChatRightSidebar;
