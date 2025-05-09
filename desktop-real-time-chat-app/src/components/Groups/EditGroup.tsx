import React from 'react';
import { groupEditProps } from "../../types/interface";
import { useState, useRef, useEffect } from "react";
  const truncateDescription = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  const EditGroup: React.FC<groupEditProps> = ({ 
    dialogRef, 
    selectedGroup, 
    setSelectedGroup, 
    groups, 
    setGroups,
    isOpen,
    setIsOpen
  }) => {
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
    

    
      const closeDialog = () => {
        if (dialogRef.current) {
          dialogRef.current.close();
          setIsOpen(false);
        }
      };
    return(
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
                  className="p-6 flex flex-col justify-content-center items-center "
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
                      {group.friends.map((friend) => (
                        <div
                          className="group-inner-friend border border-gray-300 border-opacity-50 w-[40%] hover:bg-[gray] rounded-2xl mt-[15px] p-4 transition-all duration-400 ease-in-out ml-auto mr-auto cursor-pointer"
                          key={friend.id}
                        >
                          <div className="flex flex-row items-center ">
                            <img
                              src={friend.profile}
                              alt="Profile"
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="flex flex-col">
                              <p className="text-2xl text-white text-center justify-center">
                                {friend.username}
                              </p>
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

        </>
    );
}
export default EditGroup;