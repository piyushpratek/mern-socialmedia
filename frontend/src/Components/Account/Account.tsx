import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import User from "../User/User";
import "./Account.css";
import { deleteMyProfile, getMyPosts, logoutUser } from "../../store/actionHelpers/userActionHelper";
import { setAlertMessage } from "../../store/slice/user/userSlice";
import { clearErrors } from "../../store/slice/post/myPostsSlice";
import { clearMessage } from "../../store/slice/post/likePostSlice";
// import { deleteMyProfile, getMyPosts, logoutUser } from "../../Actions/User";

const Account = () => {
  const dispatch = useAppDispatch();

  const { user, loading: userLoading } = useAppSelector((state) => state.user);
  const { loading, error, posts } = useAppSelector((state) => state.myPosts);
  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useAppSelector((state) => state.like);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  const logoutHandler = () => {
    dispatch(logoutUser());
    dispatch(setAlertMessage({ message: "Logged out successfully", severity: "success", }))
  };

  const deleteProfileHandler = async () => {
    await dispatch(deleteMyProfile());
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setAlertMessage({ message: error, severity: "error", }))
      dispatch(clearErrors());
    }

    if (likeError) {
      dispatch(setAlertMessage({ message: likeError, severity: "error", }))
      dispatch(clearErrors());
    }
    if (message) {
      dispatch(setAlertMessage({ message: message, severity: "success", }))
      dispatch(clearMessage());
    }
  }, [error, message, likeError, dispatch]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts?.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h6">You have not made any post</Typography>
        )}
      </div>

      <div className="accountright">
        <Avatar
          src={user?.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />

        <Typography variant="h5">{user?.name}</Typography>

        <div>
          <button onClick={() => setFollowersToggle(!followersToggle)}>
            <Typography>Followers</Typography>
          </button>
          <Typography>{user?.followers.length}</Typography>
        </div>

        <div>
          <button onClick={() => setFollowingToggle(!followingToggle)}>
            <Typography>Following</Typography>
          </button>
          <Typography>{user?.following.length}</Typography>
        </div>

        <div>
          <Typography>Posts</Typography>
          <Typography>{user?.posts.length}</Typography>
        </div>

        <Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button>

        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>

        <Button
          variant="text"
          style={{ color: "red", margin: "2vmax" }}
          onClick={deleteProfileHandler}
          disabled={deleteLoading}
        >
          Delete My Profile
        </Button>

        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>

            {user!.followers.length > 0 ? (
              user!.followers.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no followers
              </Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>

            {user!.following.length > 0 ? (
              user!.following.map((follow) => (
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You're not following anyone
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Account;
