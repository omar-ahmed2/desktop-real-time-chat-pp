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
