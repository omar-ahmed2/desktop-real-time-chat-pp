import React, { useEffect, useRef, useState } from "react";
import { groupCreationProps } from "../../types/interface";
const GroupCreation = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]);
  const friendDiv = useRef<{ [key: number]: HTMLDivElement | null }>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [groupName, setGroupName] = useState<string>("");
  const [maxFriends, setMaxFriends] = useState<number[]>([]); // Maximum number of friends to add
  const [username, setUsername] = useState<string>("");
  const [friends, setFriends] = useState<groupCreationProps[]>([]); // List of friends added
  useEffect(() => {
    setFriends([
      {
        id: 1,
        username: "John Doe",
        number: "1234567890",
        profile: "/images/picProfile.png",
      },
      {
        id: 2,
        username: "Jane Smith",
        number: "0987654321",
        profile: "/images/picProfile.png",
      },
      {
        id: 3,
        username: "Alice Johnson",
        number: "1122334455",
        profile: "/images/picProfile.png",
      },
      {
        id: 4,
        username: "Bob Brown",
        number: "5566778899",
        profile: "/images/picProfile.png",
      },
      {
        id: 5,
        username: "Charlie Davis",
        number: "2233445566",
        profile: "/images/picProfile.png",
      },
      {
        id: 6,
        username: "Charlie Davis",
        number: "2233445566",
        profile: "/images/picProfile.png",
      },
      {
        id: 7,
        username: "Charlie Davis",
        number: "2233445566",
        profile: "/images/picProfile.png",
      },
      {
        id: 8,
        username: "Charlie Davis",
        number: "2233445566",
        profile: "/images/picProfile.png",
      },
      {
        id: 9,
        username: "Charlie Davis",
        number: "2233445566",
        profile: "/images/picProfile.png",
      },
      {
        id: 10,
        username: "Charlie Davis",
        number: "2233445566",
        profile: "/images/picProfile.png",
      },
      {
        id: 11,
        username: "Charlie Davis",
        number: "2233445566",
        profile: "/images/picProfile.png",
      },
    ]);
  }, []);
  const openDialog = () => {
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
  const handleCheckboxChange =
    (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        if (maxFriends.length < 10) {
          setMaxFriends((prev) => [...prev, id]); // Add friend ID as a number
        } else {
          // Optional: Prevent selection if limit reached
          e.target.checked = false;
          alert("You can only add up to 10 friends.");
        }
      } else {
        setMaxFriends((prev) => prev.filter((friendId) => friendId !== id)); // Remove friend ID as a number
      }
    };
  const handleDivClick = (id: number) => {
    checkboxRefs.current[id]?.click();
  };
  // Close dialog when clicking on backdrop (outside the dialog box)
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
  return (
    <>
      <dialog
        ref={dialogRef}
        className={`h-[80vh] 2xl:w-[35%] sm:w[100%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-dark-start to-dark-end rounded-lg  p-0 m-0 transition-all duration-500 ease-in-out
        ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <div className="w-full h-full flex flex-col rounded-full">
          <div className="p-6 flex flex-col justify-content-center items-center ">
            <input
              type="text"
              className="w-[200px] h-[45px] mt-[25px] text-[black] text-center placeholder-black-500"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            ></input>
          </div>
          <p className="text-white ml-[25px] text-2xl">Add friends</p>
          <p className="text-white-500 ml-[45px] mt-[10px] text-1xl">
            You can add {10 - maxFriends.length} more friends
          </p>
          <div className="flex flex-row mb-3 ">
            <input
              type="text"
              className="w-[325px] h-[45px] mt-[15px] ml-[25px] text-black text-center placeholder-gray-500 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
              placeholder="Type the username of a friend"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className="ml-[25px] mt-[20px] w-[65px] h-[40px] flex items-center justify-center text-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300">
              Add
            </button>
          </div>

          <div className="flex flex-wrap mb-5 w-full 2xl:max-h-[200px] sm:max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent hover:scrollbar-thumb-gray-700 transition-all duration-300">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className={`w-[48%] rounded-2xl mt-[15px] p-4 mr-auto ml-auto cursor-pointer hover:bg-[rgba(184,58,207,0.2)] ${
                  maxFriends.includes(friend.id)
                    ? "bg-[rgba(184,58,207,0.2)]"
                    : "bg-[rgba(255,255,255,0.1)]"
                }`}
                onClick={() => handleDivClick(friend.id)}
                ref={(el) => {
                  friendDiv.current[friend.id] = el;
                }}
              >
                <div className="flex flex-row items-center gap-4">
                  <img
                    src={friend.profile}
                    alt="Profile"
                    className="w-15 h-15 rounded-full"
                  />
                  <div className="flex flex-col">
                    <p className="text-white">{friend.username}</p>
                    <p className="text-white text-sm">{friend.number}</p>
                  </div>
                  <input
                    ref={(el) => {
                      checkboxRefs.current[friend.id] = el;
                    }}
                    type="checkbox"
                    onChange={(e) => handleCheckboxChange(friend.id)(e)}
                    onClick={(e) => e.stopPropagation()}
                    className="ml-auto w-6 h-6 mr-3 transform scale-125 appearance-none border-2 !border-gray-400 rounded-sm bg-white !checked:bg-black checked:border-[#b83acf] transition-all ease-in-out duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </dialog>

      <div className="mt-8 text-center">
        <img
          src="/images/add-group.png"
          onClick={openDialog}
          className="cursor-pointer h-[25px] w-[25px]"
        ></img>
      </div>
    </>
  );
};

export default GroupCreation;
