import { Avatar, Button, Typography } from "@mui/material";
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
import { likePost } from "../../store/actionHelpers/postActionHelper";
import { setAlertMessage } from "../../store/slice/user/userSlice";

interface PostProps {
    postId: string;
    caption: string;
    postImage: string;
    likes?: string[];
    comments?: string[];
    ownerImage: string;
    ownerName: string;
    ownerId: string;
    isDelete?: boolean;
    isAccount?: boolean;
}
const Post = ({ postId, caption, postImage, likes = [], comments = [], ownerImage, ownerName, ownerId, isDelete = false, isAccount = false }: PostProps) => {

    const [liked, setLiked] = useState<boolean>(false)

    const { error, message } = useAppSelector((state) => state.like)

    const dispatch = useAppDispatch()

    const handleLike = () => {
        setLiked(!liked)

        dispatch(likePost(postId))

    }
    useEffect(() => {
        if (error) {
            dispatch(setAlertMessage({ message: error, severity: "error", }))
        }
        if (message) {
            dispatch(setAlertMessage({ message: message, severity: "success", }))
        }
    }, [dispatch, error, message])

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
            <button style={{ border: "none", backgroundColor: "white", cursor: "pointer", margin: "1vmax 2vmax" }}>
                <Typography>5 Likes</Typography>
            </button>

            <div className="postFooter">
                <Button onClick={handleLike}> {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />} </Button>

                <Button>
                    <ChatBubbleOutline />
                </Button>

                {isDelete ? <Button>
                    <DeleteOutline />
                </Button> : null}
            </div>
        </div>
    )
}

export default Post