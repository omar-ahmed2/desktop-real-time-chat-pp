import React from "react";
import { useState, useRef, useEffect } from "react";
import "./Groups.css";
import { groupProps, friendProps } from "../../types/interface";
import Sidebar from "../Chat/Sidebar/Sidebar";
import MediaQuery, { useMediaQuery } from "react-responsive";
import EditGroup from "./editGroup";
import { Plus, ArrowLeft, Send, Image as ImageIcon } from "lucide-react";

const Groups = () => {
  const [groupName, setGroupName] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [groups, setGroups] = useState<groupProps[]>([]);
  const [activeChat, setActiveChat] = useState<groupProps | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [newGroupDescription, setNewGroupDescription] = useState<string>("");
  const [newGroupMembers, setNewGroupMembers] = useState<friendProps[]>([]);
  const [newGroupAvatar, setNewGroupAvatar] = useState<string>("/images/group-default.png");
  const [availableFriends, setAvailableFriends] = useState<friendProps[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("/images/group-default.png");
  
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const addGroupDialogRef = useRef<HTMLDialogElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1225px)" });
  
  const truncateDescription = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  
  // Load groups from localStorage on component mount
  useEffect(() => {
    const savedGroups = localStorage.getItem('chattyGroups');
    
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups));
    } else {
      // Set initial groups data
      const initialGroups = [
        {
          id: 1,
          name: "DEPI Graduation Project Team",
          avatar: "/images/DEPI.png",
          description:
            "Welcome to The Wanderers! A group for those who love to explore new places",
          friends: [
            { id: 1, username: "Omar Ahmed", profile: "/images/Omar Ahmed.png" },
            { id: 2, username: "Kareem Hassan", profile: "/images/Kareem.png" },
            { id: 3, username: "Gamal Micheal", profile: "/images/gamal.png" },
            { id: 4, username: "Amir Wagdy", profile: "/images/amir.png" },
            { id: 5, username: "Mohamed Shawky", profile: "/images/mohamed.png" },
            { id: 6, username: "Moataz Tamer", profile: "/images/moataz.png" },
          ],
          messages: [
            { id: 1, sender: "Omar Ahmed", content: "Hi everyone! How's the project going?", timestamp: "10:30 AM" },
            { id: 2, sender: "Kareem Hassan", content: "Making good progress on my end. Frontend is almost ready.", timestamp: "10:32 AM" },
            { id: 3, sender: "Gamal Micheal", content: "Backend APIs are 70% complete, should finish by tomorrow.", timestamp: "10:35 AM" },
          ]
        },
        {
          id: 2,
          name: "Football Team",
          avatar: "/images/football.png",
          description: "For football lovers",
          friends: [
            { id: 1, username: "Omar Ahmed", profile: "/images/Omar Ahmed.png" },
            { id: 2, username: "Sarah Ali", profile: "/images/Sarah Ali.png" },
            { id: 3, username: "Mai Mohamed", profile: "/images/mai.png" },
          ],
          messages: [
            { id: 1, sender: "Omar Ahmed", content: "When's our next match?", timestamp: "Yesterday" },
            { id: 2, sender: "Sarah Ali", content: "Saturday at 5pm, don't forget your cleats!", timestamp: "Yesterday" },
          ]
        },
        {
          id: 3,
          name: "Gaming Squad",
          avatar: "/images/squad.png",
          description: "Lorem ipsum dolor sit.",
          friends: [
            { id: 1, username: "Mohamed Shawky", profile: "/images/mohamed.png" },
            { id: 2, username: "Kareem Hassan", profile: "/images/Kareem.png" },
            { id: 3, username: "Amir Wagdy", profile: "/images/amir.png" },
            { id: 4, username: "Moataz Tamer", profile: "/images/moataz.png" },
            { id: 5, username: "Sarah Ali", profile: "/images/Sarah Ali.png" },
          ],
          messages: [
            { id: 1, sender: "Mohamed Shawky", content: "Who's up for some Fortnite tonight?", timestamp: "3 days ago" },
            { id: 2, sender: "Amir Wagdy", content: "I'm in! Around 9pm?", timestamp: "3 days ago" },
          ]
        },
        {
          id: 4,
          name: "Work Team",
          avatar: "/images/teamwork.png",
          description: "This is a group for work-related discussions.",
          friends: [
            { id: 1, username: "Mai Mohamed", profile: "/images/mai.png" },
            { id: 2, username: "Eng. Sayed Safwet", profile: "/images/eng.sayed.png" },
            { id: 3, username: "Kenzi Mohamed", profile: "/images/kenzi.png" },
            { id: 4, username: "Omar Ahmed", profile: "/images/Omar Ahmed.png" },
          ],
          messages: [
            { id: 1, sender: "Eng. Sayed Safwet", content: "Team meeting tomorrow at 10 AM", timestamp: "Monday" },
            { id: 2, sender: "Mai Mohamed", content: "Will the quarterly report be discussed?", timestamp: "Monday" },
            { id: 3, sender: "Eng. Sayed Safwet", content: "Yes, please bring your updates", timestamp: "Monday" },
          ]
        },
        {
          id: 5,
          name: "Travel Buddies",
          avatar: "/images/travel.png",
          description: "This is a group for travel enthusiasts.",
          friends: [
            { id: 1, username: "Omar Ahmed", profile: "/images/Omar Ahmed.png" },
            { id: 2, username: "Kareem Hassan", profile: "/images/Kareem.png" },
            { id: 3, username: "Gamal Micheal", profile: "/images/gamal.png" },
            { id: 4, username: "Amir Wagdy", profile: "/images/amir.png" },
          ],
          messages: [
            { id: 1, sender: "Omar Ahmed", content: "Anyone interested in a trip to Dahab next month?", timestamp: "Last week" },
            { id: 2, sender: "Kareem Hassan", content: "I'm free the first two weeks", timestamp: "Last week" },
          ]
        },
        {
          id: 6,
          name: "Study Group",
          avatar: "/images/study.png",
          description: "This is a group for study enthusiasts.",
          friends: [
            { id: 1, username: "Sarah Ali", profile: "/images/Sarah Ali.png" },
            { id: 2, username: "Mai Mohamed", profile: "/images/mai.png" },
            { id: 3, username: "Kenzi Mohamed", profile: "/images/kenzi.png" },
            { id: 4, username: "Omar Ahmed", profile: "/images/Omar Ahmed.png" },
          ],
          messages: [
            { id: 1, sender: "Sarah Ali", content: "Has anyone started on the final project?", timestamp: "2 weeks ago" },
            { id: 2, sender: "Mai Mohamed", content: "I've done the research phase", timestamp: "2 weeks ago" },
          ]
        },
        {
          id: 7,
          name: "Friends Hangout",
          avatar: "/images/hangout.png",
          description: "A group for friends to hang out.",
          friends: [
            { id: 1, username: "Omar Ahmed", profile: "/images/Omar Ahmed.png" },
            { id: 2, username: "Kareem Hassan", profile: "/images/Kareem.png" },
            { id: 3, username: "Gamal Micheal", profile: "/images/gamal.png" },
            { id: 4, username: "Amir Wagdy", profile: "/images/amir.png" },
            { id: 5, username: "Mohamed Shawky", profile: "/images/mohamed.png" },
            { id: 6, username: "Moataz Tamer", profile: "/images/moataz.png" },
            { id: 7, username: "Eng. Sayed Safwet", profile: "/images/eng.sayed.png" },        
          ],
          messages: [
            { id: 1, sender: "Omar Ahmed", content: "Movie night this Friday?", timestamp: "2 days ago" },
            { id: 2, sender: "Moataz Tamer", content: "I'm in! What are we watching?", timestamp: "2 days ago" },
          ]
        },
      ];
      
      setGroups(initialGroups);
      localStorage.setItem('chattyGroups', JSON.stringify(initialGroups));
    }

    // Set up available friends for adding to groups
    setAvailableFriends([
      { id: 1, username: "Omar Ahmed", profile: "/images/Omar Ahmed.png" },
      { id: 2, username: "Kareem Hassan", profile: "/images/Kareem.png" },
      { id: 3, username: "Gamal Micheal", profile: "/images/gamal.png" },
      { id: 4, username: "Amir Wagdy", profile: "/images/amir.png" },
      { id: 5, username: "Mohamed Shawky", profile: "/images/mohamed.png" },
      { id: 6, username: "Moataz Tamer", profile: "/images/moataz.png" },
      { id: 7, username: "Eng. Sayed Safwet", profile: "/images/eng.sayed.png" },
      { id: 8, username: "Sarah Ali", profile: "/images/Sarah Ali.png" },
      { id: 9, username: "Mai Mohamed", profile: "/images/mai.png" },
      { id: 10, username: "Kenzi Mohamed", profile: "/images/kenzi.png" },
    ]);
  }, []);

  // Save groups to localStorage whenever they change
  useEffect(() => {
    if (groups.length > 0) {
      localStorage.setItem('chattyGroups', JSON.stringify(groups));
    }
  }, [groups]);

  useEffect(() => {
    // Scroll to bottom of messages whenever activeChat changes or a new message is added
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChat, newMessage]);

  const filteredGroups = groups.filter((item) =>
    item.name.toLowerCase().includes(groupName.toLowerCase())
  );

  const openDialog = (id: number) => {
    setSelectedGroup(id);
    if (dialogRef.current) {
      dialogRef.current.showModal();
      setIsOpen(true);
    }
  };

  const openAddGroupDialog = () => {
    if (addGroupDialogRef.current) {
      addGroupDialogRef.current.showModal();
      setIsAddGroupOpen(true);
    }
  };

  const closeAddGroupDialog = () => {
    if (addGroupDialogRef.current) {
      addGroupDialogRef.current.close();
      setIsAddGroupOpen(false);
      // Reset form fields
      setNewGroupName("");
      setNewGroupDescription("");
      setNewGroupMembers([]);
      setNewGroupAvatar("/images/group-default.png");
      setPreviewUrl("/images/group-default.png");
      setSelectedFile(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create URL for preview
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      setNewGroupAvatar(fileUrl);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const createNewGroup = () => {
    if (newGroupName.trim() && newGroupMembers.length > 0) {
      const newGroup: groupProps = {
        id: groups.length > 0 ? Math.max(...groups.map(g => g.id)) + 1 : 1,
        name: newGroupName,
        avatar: newGroupAvatar,
        description: newGroupDescription || "No description provided",
        friends: newGroupMembers,
        messages: [{
          id: 1,
          sender: "System",
          content: `Welcome to ${newGroupName}! This group was created today.`,
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }]
      };
      
      const updatedGroups = [...groups, newGroup];
      setGroups(updatedGroups);
      localStorage.setItem('chattyGroups', JSON.stringify(updatedGroups));
      closeAddGroupDialog();
      
      // Open the newly created group chat
      setActiveChat(newGroup);
    }
  };

  const toggleFriendSelection = (friend: friendProps) => {
    if (newGroupMembers.some(member => member.id === friend.id)) {
      setNewGroupMembers(newGroupMembers.filter(member => member.id !== friend.id));
    } else {
      setNewGroupMembers([...newGroupMembers, friend]);
    }
  };

  const openGroupChat = (group: groupProps) => {
    setActiveChat(group);
  };

  const closeGroupChat = () => {
    setActiveChat(null);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() && activeChat) {
      const updatedGroups = groups.map(group => {
        if (group.id === activeChat.id) {
          const updatedGroup = {
            ...group,
            messages: [
              ...(group.messages || []),
              {
                id: group.messages ? Math.max(...group.messages.map(m => m.id)) + 1 : 1,
                sender: "Omar Ahmed", // Current user (hardcoded for now)
                content: newMessage,
                timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
              }
            ]
          };
          setActiveChat(updatedGroup);
          return updatedGroup;
        }
        return group;
      });
      
      setGroups(updatedGroups);
      localStorage.setItem('chattyGroups', JSON.stringify(updatedGroups));
      setNewMessage("");
    }
  };

  // Format the timestamp for display
  const formatTimestamp = (timestamp: string) => {
    if (timestamp === "Just now") return timestamp;
    return timestamp;
  };

  // Render Group List View
  const renderGroupsList = () => (
    <div className="group-flex-container">
      <div className="flex w-full items-center justify-between bg-purple-100 p-4">
        <h1 className="text-3xl font-bold text-purple-800">Manage Groups</h1>
        <button 
          onClick={openAddGroupDialog}
          className="add-group-btn flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 transition-all"
          aria-label="Add new group"
        >
          <Plus size={24} />
        </button>
      </div>
      
      <div className="flex items-center justify-center my-4">
        <input
          type="text"
          placeholder="Search For Groups"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-4/5 h-12 rounded-full bg-gray-100 text-gray-800 text-center placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      
      <div className="flex flex-col w-full flex-grow overflow-y-auto scrollbar-custom groups-list px-2">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <div
              key={group.id}
              className="group-card bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 transition-all my-3 flex items-center p-3 cursor-pointer"
              onClick={() => openGroupChat(group)}
            >
              <img
                src={group.avatar}
                alt={`${group.name} avatar`}
                className="w-16 h-16 rounded-full object-cover border-2 border-purple-200"
              />
              <div className="ml-4 flex-grow">
                <h3 className="text-purple-800 font-semibold text-lg">{group.name}</h3>
                <p className="text-gray-600 text-sm">
                  {truncateDescription(group.description, isMobile ? 50 : 100)}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {group.friends.length} {group.friends.length === 1 ? "member" : "members"}
                </p>
              </div>
              <div className="flex flex-col items-center ml-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openDialog(group.id);
                  }}
                  className="p-2 hover:bg-purple-100 rounded-full"
                  aria-label="Edit group"
                >
                  <img
                    src="/images/editGroup.png"
                    alt="Edit Group"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-gray-500">
            <p>No groups found</p>
            <button 
              onClick={openAddGroupDialog}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Create a new group
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Render Group Chat View
  const renderGroupChat = () => {
    if (!activeChat) return null;
    
    return (
      <div className="group-chat-container flex flex-col h-full">
        {/* Group Chat Header */}
        <div className="group-chat-header flex items-center p-4 bg-purple-100 border-b border-purple-200">
          <button 
            className="mr-2 p-2 rounded-full hover:bg-purple-200"
            onClick={closeGroupChat}
            aria-label="Back to groups list"
          >
            <ArrowLeft size={20} />
          </button>
          <img 
            src={activeChat.avatar} 
            alt={activeChat.name} 
            className="w-10 h-10 rounded-full object-cover border-2 border-purple-300"
          />
          <div className="ml-3">
            <h2 className="font-semibold text-lg text-purple-800">{activeChat.name}</h2>
            <p className="text-xs text-gray-600">
              {activeChat.friends.length} {activeChat.friends.length === 1 ? "member" : "members"}
            </p>
          </div>
        </div>
        
        {/* Messages Area */}
        <div className="group-chat-messages flex-grow p-4 overflow-y-auto bg-gray-50">
          {/* Welcome message - shown at the top of every chat */}
          <div className="text-center mb-6 mt-2">
            <div className="inline-block bg-purple-100 px-4 py-2 rounded-full text-sm text-purple-800">
              Welcome to {activeChat.name}
            </div>
          </div>
          
          {activeChat.messages && activeChat.messages.length > 0 ? (
            activeChat.messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 flex ${message.sender === "Omar Ahmed" ? "justify-end" : message.sender === "System" ? "justify-center" : "justify-start"}`}
              >
                {message.sender !== "Omar Ahmed" && message.sender !== "System" && (
                  <img 
                    src={activeChat.friends.find(f => f.username === message.sender)?.profile || "/images/default-user.png"}
                    alt={message.sender}
                    className="w-8 h-8 rounded-full mr-2 self-end"
                  />
                )}
                
                <div 
                  className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                    message.sender === "System"
                    ? "bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-full inline-block"
                    : message.sender === "Omar Ahmed" 
                      ? "bg-purple-600 text-white"
                      : "bg-white border border-gray-200 text-gray-800 shadow-sm"
                  }`}
                >
                  {message.sender !== "Omar Ahmed" && message.sender !== "System" && (
                    <p className="text-xs font-semibold mb-1 text-purple-600">{message.sender}</p>
                  )}
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === "System"
                    ? "hidden"
                    : message.sender === "Omar Ahmed" 
                      ? "text-purple-200" 
                      : "text-gray-500"
                  }`}>
                    {formatTimestamp(message.timestamp)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No messages yet. Be the first to send one!
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message Input */}
        <form onSubmit={sendMessage} className="group-chat-input p-3 bg-white border-t border-gray-200 flex">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow p-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button 
            type="submit"
            className="ml-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full w-12 h-12 flex items-center justify-center"
            disabled={!newMessage.trim()}
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    );
  };

  return (
    <>
      {/* Edit Group Dialog */}
      <EditGroup
        dialogRef={dialogRef}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        groups={groups}
        setGroups={setGroups}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      
      {/* Add Group Dialog */}
      <dialog
        ref={addGroupDialogRef}
        className="group-dialog bg-white rounded-lg shadow-xl p-6 w-1/2 max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-600">Create New Group</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Group Name</label>
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Enter group name"
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={newGroupDescription}
              onChange={(e) => setNewGroupDescription(e.target.value)}
              placeholder="Enter group description"
              className="w-full p-2 border border-gray-300 rounded h-20 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Group Avatar</label>
            <div className="flex items-center space-x-4">
              <img
                src={previewUrl}
                alt="Group avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-purple-200"
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                type="button"
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 flex items-center"
                onClick={triggerFileInput}
              >
                <ImageIcon size={16} className="mr-2" />
                Choose Image
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Add Members</label>
            <div className="border border-gray-300 rounded p-2 max-h-40 overflow-y-auto scrollbar-custom text-gray-800">
              {availableFriends.map(friend => (
                <div 
                  key={friend.id}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => toggleFriendSelection(friend)}
                >
                  <input
                    type="checkbox"
                    checked={newGroupMembers.some(member => member.id === friend.id)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  <img
                    src={friend.profile}
                    alt={friend.username}
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <span>{friend.username}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 text-sm text-purple-600">
              {newGroupMembers.length} member{newGroupMembers.length !== 1 ? 's' : ''} selected
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={closeAddGroupDialog}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={createNewGroup}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
            disabled={!newGroupName.trim() || newGroupMembers.length === 0}
          >
            Create Group
          </button>
        </div>
      </dialog>
      
      {/* Main Layout */}
      <div className="chat-layout-container">
        <div className="groups-main-card">
          {/* Left Sidebar (only show when not in chat view on mobile/tablet) */}
          {(!isTablet || (isTablet && !activeChat)) && (
            <MediaQuery minWidth={1225}>
              <Sidebar />
            </MediaQuery>
          )}
          
          {/* Main Content Area */}
          {activeChat ? renderGroupChat() : renderGroupsList()}
          
          {/* Bottom Sidebar (only show when not in chat view on mobile/tablet) */}
          {(!isTablet || (isTablet && !activeChat)) && (
            <MediaQuery maxWidth={1225}>
              <Sidebar />
            </MediaQuery>
          )}
        </div>
      </div>
    </>
  );
};

export default Groups;