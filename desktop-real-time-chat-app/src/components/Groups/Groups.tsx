import React from "react";
import { useState } from "react";
import './Groups.css';
import Sidebar from "../Chat/Sidebar/Sidebar";
const Groups = () => {
  const [groupName, setGroupName] = useState<string>("");
  const groups = [
    {
      id: 1,
      name: "Sarah Parker",
      avatar: "/images/group1.png",
      description: "Lorem ipsum dolor sit.",
    },
    {
      id: 2,
      name: "John Doe",
      avatar: "/images/group1.png",
      description: "Lorem ipsum dolor sit.",
    },
    {
      id: 3,
      name: "Jane Smith",
      avatar: "/images/group1.png",
      description: "Lorem ipsum dolor sit.",
    },
    {
      id: 4,
      name: "Alice Johnson",
      avatar: "/images/group2.png",
      description: "Lorem ipsum dolor sit.",
    },
    {
      id: 5,
      name: "Bob Brown",
      avatar: "/images/group2.png",
      description: "Lorem ipsum dolor sit.",
    },
    {
      id: 6,
      name: "Alice Johnson",
      avatar: "/images/group2.png",
      description: "Lorem ipsum dolor sit.",
    },
    {
      id: 7,
      name: "Jarvis Clipper",
      avatar: "/images/group3.png",
      description: "Lorem ipsum dolor sit.",
    },
    {
      id: 8,
      name: "SuperMan Community",
      avatar: "/images/group3.png",
      description: "Lorem ipsum dolor sit.",
    },
  ];
  return (
    <>
      <div className="flex flex-row h-screen bg-[#F0F2F5] overflow-hidden">
        <div className="h-screen w-[20%] bg-[#F0F2F5] flex flex-col">
          <Sidebar />
        </div>
        <div>
          <div className="flex flex-grow h-[80px] bg-[#dcdcdc] ">
            <h1 className="pl-[30px] pt-[5px] text-5xl text-black">
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
              className="w-[600px] h-[50px] mt-[25px] rounded-full bg-[#d9d9d9] text-[black] text-center placeholder-black-500 mb-[25px]"
            />
          </div>
          <div className="flex flex-wrap w-full 2xl:max-h-[100%] sm:max-h-[100vh]  overflow-y-auto scrollbar-custom">
            {groups.map((group) => (
              <div
                key={group.id}
                className="bg-[purple] flex flex-row items-center w-full h-[90px] px-4 gap-4 rounded-lg "
              >
                <img
                  src={group.avatar}
                  alt={`${group.name} avatar`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
               <div className="flex flex-col justify-center">
                <span className="text-black font-medium mb-[10px]">{group.name}</span>
                <p className="text-black-500">{group.description}</p>
                </div>
              </div>
              <img src="/images/editGroup.png" alt="Arrow" className="w-6 h-6 ml-auto cursor-pointer" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Groups;
