
export interface User {
    _id: string;
    name: string;
    avatar: {
        public_id: string;
        url: string;
    };
    email: string;
    password: string;
    posts: string[];
    followers: {
        _id: string,
        name: string,
        avatar: {
            url: string;
        };
    }[]
    following: {
        _id: string,
        name: string,
        avatar: {
            url: string;
        };
    }[]
}

export interface Registeruserdata {
    email: string;
    password: string;
    name: string;
    avatar?: (File | null | string) | undefined
}

export interface UpdateProfileData {
    email: string;
    name: string;
    avatar?: (File | null | string) | undefined
}

export interface UpdatePasswordData {
    oldPassword: string;
    newPassword: string
}

export interface ForgotPasswordData {
    email: string;
    token: string;
}

export interface ResetPasswordData {
    newPassword: string;
    token: string;
}

export type AllUsersData = User[];

// export interface Post {
//     comments: string[] | undefined;
//     likes: string[] | undefined;
//     caption: string;
//     owner: {
//         avatar: { url: string }
//         _id: string
//         name: string
//         email: string
//     }
//     image: { url: string };
//     _id: string;
//     avatar: { url: string }
//     name?: string
// }

export interface Post {
    comments?: {
        user: {
            _id: string;
            name: string;
            avatar: {
                url: string;
            };
        };
        comment: string;
        _id: string;
    }[];
    likes?: {
        _id: string;
        name: string;
        avatar: {
            url: string;
        };
    }[];
    caption: string;
    owner: {
        avatar: { url: string }
        _id: string
        name: string
        email: string
    }
    image: { url: string };
    _id: string;
    avatar: { url: string }
    name?: string
}

export interface ErrorResponse {
    message: string;
}

// interface PostProps {
//     postId: string;
//     caption: string;
//     postImage: string;
//     likes?: {
//         _id: string;
//         name: string;
//         avatar: {
//             url: string;
//         };
//     }[];
//     comments?: {
//         user: {
//             _id: string;
//             name: string;
//             avatar: {
//                 url: string;
//             };
//         };
//         comment: string;
//         _id: string;
//     }[];
//     ownerImage: string;
//     ownerName: string;
//     ownerId: string;
//     isDelete?: boolean;
//     isAccount?: boolean;
// }