
export interface User {
    _id: string;
    name: string;
    avatar: {
        public_id: string;
        url: string;
    };
    email: string;
    password: string;
    posts: string[]; // Change this to match the actual type
    followers: string[]; // Change this to match the actual type
    following: string[]; // Change this to match the actual type
}

export type AllUsersData = User[];

export interface Post {
    comments: string[] | undefined;
    likes: string[] | undefined;
    caption: string;
    owner: string;
    image: { url: string };
    _id: string;
    avatar: { url: string }
    name?: string

    // id: number;
    // title: string;
    // content: string;
    // authorId: number;
}
