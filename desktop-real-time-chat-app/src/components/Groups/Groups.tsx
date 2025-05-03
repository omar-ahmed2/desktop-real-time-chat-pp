import React from "react";
import { useState, useRef, useEffect } from "react";
import "./Groups.css";
import { groupProps } from "../../types/interface";
import Sidebar from "../Chat/Sidebar/Sidebar";
import { useMediaQuery } from 'react-responsive';
const Groups = () => {
  const [groupName, setGroupName] = useState<string>("");
  const [filterText, setFilterText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [groups, setGroups] = useState<groupProps[]>([]);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const isMobile = useMediaQuery({ query: '(max-width: 490px)' });
  const truncateDescription = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  useEffect(() => {
    setGroups([
      {
        id: 1,
        name: "Sarah Parker",
        avatar: "/images/group1.png",
        description:
          "Welcome to The Wanderers! A group for those who love to explore new places, try new foods, and embrace the thrill of adventure. Whether you're a seasoned traveler or someone just starting their",
        friends: [
          { id: 1, username: "John Doe", profile: "/images/group1.png" },
          { id: 2, username: "Jane Smith", profile: "/images/group1.png" },
          { id: 3, username: "Alice Johnson", profile: "/images/group2.png" },
          { id: 4, username: "Bob Brown", profile: "/images/group2.png" },
        ],
      },
      {
        id: 2,
        name: "John Doe",
        avatar: "/images/group2.png",
        description: "Lorem ipsum dolor sit.",
        friends: [
          { id: 1, username: "Sarah Parker", profile: "/images/group1.png" },
          { id: 2, username: "Jane Smith", profile: "/images/group1.png" },
          { id: 3, username: "Alice Johnson", profile: "/images/group2.png" },
          { id: 4, username: "Bob Brown", profile: "/images/group2.png" },
        ],
      },
      {
        id: 3,
        name: "Alice Johnson",
        avatar: "/images/group3.png",
        description: "Lorem ipsum dolor sit.",
        friends: [
          { id: 1, username: "Sarah Parker", profile: "/images/group1.png" },
          { id: 2, username: "Jane Smith", profile: "/images/group1.png" },
          { id: 3, username: "John Doe", profile: "/images/group2.png" },
          { id: 4, username: "Bob Brown", profile: "/images/group2.png" },
        ],
      },
      {
        id: 4,
        name: "Bob Brown",
        avatar: "/images/group2.png",
        description: "Lorem ipsum dolor sit.",
        friends: [
          { id: 1, username: "Sarah Parker", profile: "/images/group1.png" },
          { id: 2, username: "Jane Smith", profile: "/images/group1.png" },
          { id: 3, username: "Alice Johnson", profile: "/images/group2.png" },
          { id: 4, username: "John Doe", profile: "/images/group2.png" },
        ],
      },
      {
        id: 5,
        name: "Charlie Davis",
        avatar: "/images/group3.png",
        description: "Lorem ipsum dolor sit.",
        friends: [
          { id: 1, username: "Sarah Parker", profile: "/images/group1.png" },
          { id: 2, username: "Jane Smith", profile: "/images/group1.png" },
          { id: 3, username: "Alice Johnson", profile: "/images/group2.png" },
          { id: 4, username: "John Doe", profile: "/images/group2.png" },
        ],
      },
      {
        id: 6,
        name: "David Wilson",
        avatar: "/images/group3.png",
        description: "Lorem ipsum dolor sit.",
        friends: [
          { id: 1, username: "Sarah Parker", profile: "/images/group1.png" },
          { id: 2, username: "Jane Smith", profile: "/images/group1.png" },
          { id: 3, username: "Alice Johnson", profile: "/images/group2.png" },
          { id: 4, username: "John Doe", profile: "/images/group2.png" },
        ],
      },
      {
        id: 7,
        name: "Emma Thompson",
        avatar: "/images/group2.png",
        description: "Lorem ipsum dolor sit.",
        friends: [
          { id: 1, username: "Sarah Parker", profile: "/images/group1.png" },
          { id: 2, username: "Jane Smith", profile: "/images/group1.png" },
          { id: 3, username: "Alice Johnson", profile: "/images/group2.png" },
          { id: 4, username: "John Doe", profile: "/images/group2.png" },
          { id: 5, username: "John Doe", profile: "/images/group2.png" },
          { id: 6, username: "John Doe", profile: "/images/group2.png" },
          { id: 7, username: "John Doe", profile: "/images/group2.png" },
        ],
      },
    ]);
  }, []);

  const handleClick = (e: MouseEvent) => {
    if (dialogRef.current && e.target === dialogRef.current) {
      closeDialog();
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.addEventListener("click", handleClick);
    return () => dialog?.removeEventListener("click", handleClick);
  }, []);

  const openDialog = (id: number) => {
    setSelectedGroup(id);
    if (dialogRef.current) {
      dialogRef.current.showModal();
      setIsOpen(true);
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      setIsOpen(false);
    }
  };
  const filteredGroups = groups.filter((item) =>
    item.name.toLowerCase().includes(groupName.toLowerCase())
  );
  return (
    <>
      <dialog
        ref={dialogRef}
        className={`group-dialog h-[80vh] 2xl:w-[35%] sm:w-[40%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-dark-start to-dark-end rounded-lg p-0 m-0 transition-transform duration-500 ease-in-out 
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <div className="w-full h-full flex flex-col">
          {selectedGroup !== null &&
            groups
              .filter((group) => group.id === selectedGroup)
              .map((group) => (
                <div
                  key={group.id}
                  className="p-6 flex flex-col justify-content-center items-center"
                >
                  <img
                    className="w-[70px] h-[70px] rounded-full cursor-pointer"
                    src={group.avatar}
                    alt={`${group.name}'s avatar`}
                  />
                  <div className="flex flex-row mt-2 leading-relaxed">
                    <h1 className="text-3xl mr-2">{group.name}</h1>
                    <img
                      src="/images/editButton.png"
                      alt="Edit"
                      className="cursor-pointer w-25 h-25"
                    />
                  </div>
                  <div className="flex flex-col mt-5 mr-auto">
                    <div className="flex flex-row items-center mb-2">
                      <h1 className="text-3xl">Group description:</h1>
                      <img
                        src="/images/editButton.png"
                        alt="Edit"
                        className="cursor-pointer w-25 h-25 ml-auto"
                      />
                    </div>
                    <p className="text-gray-500 text-sm mb-4">
                      {truncateDescription(group.description, 200)}
                    </p>
                    <div className="flex flex-row">
                      <h1 className="text-3xl">Members:</h1>
                      <p className="text-white text-2xl ml-5 mt-[3px]">
                        {"(" + group.friends.length + ")"}
                      </p>
                    </div>
                    <div className="flex flex-wrap">
                    {group.friends.map((friend) =>(
                      <div
                      className="group-inner-friend border border-gray-300 border-opacity-50 ml-[25px] w-[40%] hover:bg-[gray] rounded-2xl mt-[15px] p-4 transition-all duration-400 ease-in-out"
                      key={friend.id}
                    >
                      <div className="flex flex-row items-center ">
                        <img
                          src={friend.profile}
                          alt="Profile"
                          className="w-15 h-15 rounded-full"
                        />
                        <div className="flex flex-col">
                          <p className="text-2xl text-white text-center justify-center">{friend.username}</p>
                        
                        </div>
                      </div>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </dialog>

      <div className="chat-layout-container">
        <div className="groups-main-card">
          <Sidebar />
          <div>
            <div className="flex  w-full h-[80px] items-center justify-center bg-[#dcdcdc] ">
              <h1 className="pl-[30px] pt-[5px] text-[2rem] text-black  ">
                Manage Groups
              </h1>
            </div>
            <div className="flex items-center justify-center">
              <input
                type="text"
                placeholder="Search For Groups"
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
                className="w-[50vw] h-[50px] mt-[25px] rounded-full bg-[#d9d9d9] text-[black] text-center placeholder-black-500 mb-[25px]"
              />
            </div>
            <div className="flex flex-col w-full flex-grow h-[60vh] overflow-y-auto scrollbar-custom">
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  className="outline outline-2 outline-gray-400 rounded-lg shadow-lg hover:outline-gray-600 hover:shadow-xl transition-all mt-[25px] flex flex-row items-center w-[98%] ml-2 h-[70px] px-4 gap-4"
                >
                  <img
                    src={group.avatar}
                    alt={`${group.name} avatar`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex flex-col justify-center">
                      <span className="text-black font-medium mb-[10px]">
                        {group.name}
                      </span>
                      <p className="text-black-500">
                        {truncateDescription(group.description, isMobile ? 50 : 100 )}
                      </p>
                    </div>
                  </div>
                  <img
                    src="/images/editGroup.png"
                    alt="Arrow"
                    onClick={() => openDialog(group.id)}
                    className="w-6 h-6 ml-auto cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Groups;
