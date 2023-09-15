import mongoose from 'mongoose'

const postModel = new mongoose.Schema({
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

// module.exports = mongoose.model("Post", postModal);
const Post = mongoose.model("Post", postModel);

export default Post

