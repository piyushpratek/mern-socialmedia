export interface User {
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
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
}

