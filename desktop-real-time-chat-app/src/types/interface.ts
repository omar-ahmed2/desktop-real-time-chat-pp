
import React from 'react';

export interface groupCreationProps {
    id: number;
    username: string;
    number?: string;
    profile: string;
}
export interface groupProps {
    id: number;
    name: string;
    avatar: string;
    description: string;
    friends: groupCreationProps[];
}
export interface groupEditProps{
    dialogRef: React.RefObject<HTMLDialogElement | null>
    selectedGroup: number | null
    setSelectedGroup: React.Dispatch<React.SetStateAction<number | null>>
    groups: groupProps[]
    setGroups: React.Dispatch<React.SetStateAction<groupProps[]>>
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}