import { Button, Typography } from "@mui/material"
import "./login.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useAppDispatch } from "../../store/store"
import { loginUser } from "../../store/actionHelpers/userActionHelper"

const Login = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const dispatch = useAppDispatch()
    const loginHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        dispatch(loginUser(email, password))
    }
    return (
        <div className="login">
            <form className="loginForm" onSubmit={loginHandler}>
                <Typography variant="h3" style={{ padding: "2vmax" }}>Social App</Typography>

                <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />

                <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />

                <Link to="/forgot/password">
                    <Typography>Forgot Password</Typography>
                </Link>

                <Button type="submit">Login</Button>

                <Link to="/register">
                    <Typography>New User?</Typography>
                </Link>
            </form>
        </div>
    )
}

export default Login