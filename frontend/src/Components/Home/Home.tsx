import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import Post from "../Post/Post"
import User from "../User/User"
import "./Home.css"
import { getAllUsers, getFollowingPosts } from "../../store/actionHelpers/userActionHelper"
import Loader from "../Loader/Loader"
import { Typography } from "@mui/material"

const Home = () => {
    const { loading, posts, error } = useAppSelector((state) => state.postOfFollowing)
    const { users, loading: usersLoading } = useAppSelector((state) => state.allUsers)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getFollowingPosts())
        dispatch(getAllUsers())

    }, [dispatch])

    return (
        loading === true || usersLoading === true ? <Loader /> : (<div className="home">
            <div className="homeleft">
                {
                    posts && posts.length > 0 ? posts.map((post) => (
                        <Post key={post._id}
                            postId={post._id}
                            caption={post.caption}
                            postImage={post.image.url}
                            likes={post.likes}
                            comments={post.comments}
                            ownerImage={post.owner.avatar.url}
                            ownerName={post.owner.name}
                            ownerId={post.owner._id}
                            isDelete
                            isAccount
                        />
                    )) : <Typography variant="h6">No Posts Yet</Typography>
                }


            </div>
            <div className="homeright">
                {users.length > 0 ? users.map((user) => ((
                    <User key={user._id} userId={user._id} name={user.name} avatar={user.avatar.url} />
                ))) : <Typography >No Users yet</Typography>
                }
            </div>

        </div>)
    )
}

export default Home