import { Typography } from "@mui/material"
import { Link } from "react-router-dom"

interface UserProps {
    userId: string;
    name: string;
    avatar: string;
}

const User = ({ userId, name, avatar }: UserProps) => {
    return (
        <Link to={`/user/${userId}`} className="homeUser">
            <img src={avatar} alt={name} />
            <Typography>{name}</Typography>
        </Link>
    )
}

export default User