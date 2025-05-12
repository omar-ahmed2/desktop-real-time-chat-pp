import React from "react";
import { useState, useRef, useEffect } from "react";
import "./Groups.css";
import { groupProps } from "../../types/interface";
import Sidebar from "../Chat/Sidebar/Sidebar";
import MediaQuery, { useMediaQuery } from "react-responsive";
import EditGroup from "./editGroup";
const Groups = () => {
  const [groupName, setGroupName] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [groups, setGroups] = useState<groupProps[]>([]);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 490px)" });
  const truncateDescription = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  useEffect(() => {
    setGroups([
      {
        id: 1,
        name: "DEPI Graduation Project Team",
        avatar: "/images/DEPI.png",
        description:
          "Welcome to The Wanderers! A group for those who love to explore new places, try new foods, and embrace the thrill of adventure. Whether you're a seasoned traveler or someone just starting their",
        friends: [
          { id: 1, username: "Omar Ahmed", profile: "/images/Omar Ahmed.png" },
          { id: 2, username: "Kareem Hassan", profile: "/images/Kareem.png" },
          { id: 3, username: "Gamal Micheal", profile: "/images/gamal.png" },
          { id: 4, username: "Amir Wagdy", profile: "/images/amir.png" },
          { id: 5, username: "Mohamed Shawky", profile: "/images/mohamed.png" },
          { id: 6, username: "Moataz Tamer", profile: "/images/moataz.png" },
        ],
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
          { id: 4, username: "Sarah Ali", profile: "/images/Sarah Ali.png" },
        ],
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
          { id: 4, username: "Omar Ahemd", profile: "/images/Omar Ahmed.png" },
        ],
      },
      {
        id: 5,
        name: "Travel Buddies",
        avatar: "/images/travel.png",
        description: "this is a group for travel enthusiasts.",
        friends: [
          { id: 1, username: "Omar Ahmed", profile: "/images/Omar Ahmed.png" },
          { id: 2, username: "Kareem Hassan", profile: "/images/Kareem.png" },
          { id: 3, username: "Gamal Micheal", profile: "/images/gamal.png" },
          { id: 4, username: "Amir Wagdy", profile: "/images/amir.png" },
        ],
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
      },
    ]);
  }, []);


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
  return (
    <>
    
    <EditGroup
              dialogRef={dialogRef}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
              groups={groups}
              setGroups={setGroups}
              isOpen={isOpen} // Pass down isOpen and setIsOpen
              setIsOpen={setIsOpen} // Pass down setIsOpen
            />
      <div className="chat-layout-container">
        <div className="groups-main-card">
           <MediaQuery minWidth={1225}>
                      <Sidebar />
            </MediaQuery>
          <div className="group-flex-container">
            <div className="flex  w-full  items-center justify-center bg-[#dcdcdc] ">
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
            <div className="flex flex-col w-full flex-grow  overflow-y-auto scrollbar-custom groups-list">
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  className="outline outline-2 outline-gray-400 rounded-lg shadow-lg hover:outline-gray-600 hover:shadow-xl transition-all mt-[25px] flex flex-row items-center w-[98%] ml-2 h-[80px] px-4 gap-4
                  "
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
                        {truncateDescription(
                          group.description,
                          isMobile ? 50 : 100
                        )}
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
          <MediaQuery maxWidth={1225}>
            <Sidebar />
          </MediaQuery>
        </div>
      </div>
    </>
  );
};

export default Groups;
