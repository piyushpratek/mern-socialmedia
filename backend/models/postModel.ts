import mongoose, { Types } from 'mongoose'

export interface IComment {
    [x: string]: any;
    user: Types.ObjectId;
    comment: string;
}

export interface IPost extends Document {
    caption: string;
    image: {
        public_id: string;
        url: string;
    };
    owner: Types.ObjectId;
    createdAt: Date;
    likes: Types.ObjectId[];
    comments: IComment[];
}

const postModel = new mongoose.Schema<IPost>({
    caption: String,

    image: {
        public_id: String,
        url: String,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
});

const Post = mongoose.model<IPost>("Post", postModel);

export default Post

