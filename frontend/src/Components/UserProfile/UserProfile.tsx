import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store"
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import User from "../User/User";
import { followAndUnfollowUser, getUserPosts, getUserProfile } from "../../store/actionHelpers/userActionHelper";
import { clearErrors, setAlertMessage } from "../../store/slice/user/userSlice";
import { clearMessage } from "../../store/slice/post/likePostSlice";

const UserProfile = () => {
  const dispatch = useAppDispatch();

  const { user, loading: userLoading, error: userError, } = useAppSelector((state) => state.userProfile);

  const { user: me } = useAppSelector((state) => state.user);
  const { loading, error, posts } = useAppSelector((state) => state.userPosts);
  const { error: followError, message, loading: followLoading, } = useAppSelector((state) => state.like);

  const params = useParams<{ id: string }>();

  const [followersToggle, setFollowersToggle] = useState<boolean>(false);
  const [followingToggle, setFollowingToggle] = useState<boolean>(false);
  const [following, setFollowing] = useState<boolean>(false);
  const [myProfile, setMyProfile] = useState<boolean>(false);

  const userId = params?.id || "";

  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowUser(user!._id));
    dispatch(getUserProfile(userId));
  };

  useEffect(() => {
    dispatch(getUserPosts(userId));
    dispatch(getUserProfile(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (me!._id === userId) {
      setMyProfile(true);
    }
    if (user) {
      user.followers.forEach((item: { _id: string; }) => {
        if (item._id === me!._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [user, me?._id, userId, me]);

  useEffect(() => {
    if (error) {
      dispatch(setAlertMessage({ message: error, severity: "error", }))
      dispatch(clearErrors());
    }

    if (followError) {
      dispatch(setAlertMessage({ message: followError, severity: "error", }))
      dispatch(clearErrors());
    }

    if (userError) {
      dispatch(setAlertMessage({ message: userError, severity: "error", }))
      dispatch(clearErrors());
    }
    if (message) {
      dispatch(setAlertMessage({ message: message, severity: "success", }))
      dispatch(clearMessage());
    }
  }, [error, message, followError, userError, dispatch]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
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
            />
          ))
        ) : (
          <Typography variant="h6">User has not made any post</Typography>
        )}
      </div>
      <div className="accountright">

        {user && (
          <>
            <Avatar
              src={user.avatar.url}
              sx={{ height: "8vmax", width: "8vmax" }}
            />

            <Typography variant="h5">{user.name}</Typography>

            <div>
              <button onClick={() => setFollowersToggle(!followersToggle)}>
                <Typography>Followers</Typography>
              </button>
              <Typography>{user.followers.length}</Typography>
            </div>

            <div>
              <button onClick={() => setFollowingToggle(!followingToggle)}>
                <Typography>Following</Typography>
              </button>
              <Typography>{user.following.length}</Typography>
            </div>

            <div>
              <Typography>Posts</Typography>
              <Typography>{user.posts.length}</Typography>
            </div>

            {myProfile ? null : (
              <Button
                variant="contained"
                style={{ background: following ? "red" : "" }}
                onClick={followHandler}
                disabled={followLoading}
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
            )}
          </>
        )}

        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>

            {user && user.followers.length > 0 ? (
              user.followers.map((follower) => (
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

            {user && user.following.length > 0 ? (
              user.following.map((follow) => (
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

export default UserProfile;
