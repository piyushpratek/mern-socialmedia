import { Button, Typography } from "@mui/material"
import "./login.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { loginUser } from "../../store/actionHelpers/userActionHelper"
import { setAlertMessage, clearErrors } from "../../store/slice/user/userSlice"
import { clearMessage } from "../../store/slice/post/likePostSlice"

const Login = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const dispatch = useAppDispatch()
    const { error } = useAppSelector((state) => state.user)
    const { message } = useAppSelector((state) => state.like)

    const loginHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        dispatch(loginUser(email, password))
    }

    useEffect(() => {
        if (error) {
            dispatch(setAlertMessage({ message: error, severity: "error", }))
            dispatch(clearErrors());
        }

        if (message) {
            dispatch(setAlertMessage({ message: message, severity: "success", }))
            dispatch(clearMessage());
        }

    }, [error, dispatch, message]);
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