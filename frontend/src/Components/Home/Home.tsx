import Post from "../Post/Post"
import User from "../User/User"
import "./Home.css"


const Home = () => {
    return (
        <div className="home">
            <div className="homeleft">
                <Post />
            </div>
            <div className="homeright">
                <User userId={"user._id"} name={"Piyush Prateek"} avatar={"https://media.licdn.com/dms/image/D4D35AQEdgE-FT66YRQ/profile-framedphoto-shrink_400_400/0/1694940833344?e=1696284000&v=beta&t=jnz4uhzmli5Li5VORx0JQmV6cOoakdPV1sFg-bbttP0"} />
            </div>

        </div>
    )
}

export default Home