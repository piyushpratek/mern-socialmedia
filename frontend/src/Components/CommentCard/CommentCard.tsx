import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./CommentCard.css";
import { Delete } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getFollowingPosts, getMyPosts } from "../../store/actionHelpers/userActionHelper";
import { deleteCommentOnPost } from "../../store/actionHelpers/postActionHelper";

interface CommentProps {
  userId: string;
  name: string;
  avatar: string;
  comment: string;
  commentId: string;
  postId: string;
  isAccount: boolean
}

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}: CommentProps) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const deleteCommentHandle = () => {
    dispatch(deleteCommentOnPost(postId, commentId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography>{comment}</Typography>

      {isAccount ? (
        <Button onClick={deleteCommentHandle}>
          <Delete />
        </Button>
      ) : userId === user?._id ? (
        <Button onClick={deleteCommentHandle}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
