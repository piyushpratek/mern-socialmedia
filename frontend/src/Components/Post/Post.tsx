import { Avatar, Button, Dialog, Typography } from "@mui/material";
import "./Post.css"
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addCommentOnPost, likePost } from "../../store/actionHelpers/postActionHelper";
import { getFollowingPosts, getMyPosts } from "../../store/actionHelpers/userActionHelper";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";

interface PostProps {
    postId: string;
    caption: string;
    postImage: string;
    likes?: {
        _id: string;
        name: string;
        avatar: {
            url: string;
        };
    }[];
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
    ownerImage: string;
    ownerName: string;
    ownerId: string;
    isDelete?: boolean;
    isAccount?: boolean;
}
const Post = ({ postId, caption, postImage, likes = [], comments = [], ownerImage, ownerName, ownerId, isDelete = false, isAccount = false }: PostProps) => {

    const [liked, setLiked] = useState<boolean>(false)
    const [likesUser, setLikesUser] = useState<boolean>(false)
    const [commentValue, setCommentValue] = useState<string>("");
    const [commentToggle, setCommentToggle] = useState<boolean>(false);
    // const [captionValue, setCaptionValue] = useState(caption);
    // const [captionToggle, setCaptionToggle] = useState<boolean>(false);

    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.user)
    const handleLike = async () => {
        setLiked(!liked)
        await dispatch(likePost(postId))

        if (isAccount) {
            dispatch(getMyPosts());
        } else {
            dispatch(getFollowingPosts())
        }
    }

    const addCommentHandler = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        await dispatch(addCommentOnPost(postId, commentValue))

        if (isAccount) {
            dispatch(getMyPosts());
        } else {
            dispatch(getFollowingPosts())
        }

    }

    useEffect(() => {
        likes.forEach((item) => {
            if (item._id === user?._id) {
                setLiked(true)
            }
        })
    }, [likes, user?._id])

    return (
        <div className="post">
            <div className="postHeader">
                {isAccount ? <Button><MoreVert /></Button> : null} </div>
            <img src={postImage} alt="Post" />

            <div className="postDetails">
                <Avatar src={ownerImage} alt="User" sx={{ height: "3vmax", width: "3vmax" }} />
                <Link to={`/user/${ownerId}`}>
                    <Typography fontWeight={700}>{ownerName}</Typography>
                </Link>

                <Typography fontWeight={100} color="rgba(0,0,0,0.582)" style={{ alignSelf: "center" }}>{caption}</Typography>
            </div>
            <button style={{ border: "none", backgroundColor: "white", cursor: "pointer", margin: "1vmax 2vmax" }} onClick={() => setLikesUser(!likesUser)} disabled={likes.length === 0 ? true : false}>
                <Typography>{likes.length} Likes</Typography>
            </button>

            <div className="postFooter">
                <Button onClick={handleLike}> {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />} </Button>

                <Button onClick={() => setCommentToggle(!commentToggle)}>
                    <ChatBubbleOutline />
                </Button>

                {isDelete ? <Button>
                    <DeleteOutline />
                </Button> : null}
            </div>
            <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
                <div className="DialogBox">
                    <Typography variant="h4">Liked By</Typography>
                    {likes.map(like => (
                        <User key={like._id} userId={like._id} name={like.name} avatar={like.avatar.url} />
                    ))}
                </div>
            </Dialog>

            <Dialog open={commentToggle} onClose={() => setCommentToggle(!commentToggle)}>
                <div className="DialogBox">
                    <Typography variant="h4">Comments</Typography>
                    <form className="commentForm" onSubmit={addCommentHandler}>
                        <input type="text" value={commentValue} onChange={(e) => setCommentValue(e.target.value)}
                            placeholder="Comment Here..." required />
                        <Button type="submit" variant="contained">Add</Button>
                    </form>
                    {comments?.length > 0 ? (
                        comments.map((item) =>
                            <CommentCard
                                key={item._id}
                                userId={item.user?._id}
                                name={item.user.name}
                                avatar={item.user.avatar.url}
                                comment={item.comment}
                                commentId={item._id}
                                postId={postId}
                                isAccount={isAccount}
                            />)
                    ) : (<Typography>No Comments Yet</Typography>)}

                </div>
            </Dialog>
        </div>
    )
}

export default Post