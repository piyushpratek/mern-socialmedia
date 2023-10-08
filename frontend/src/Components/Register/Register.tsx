import { Avatar, Typography, Button } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store"
import { Link } from "react-router-dom";
import "./Register.css";
import { registerUser } from "../../store/actionHelpers/userActionHelper";
import { clearErrors, setAlertMessage } from "../../store/slice/user/userSlice";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null | string | undefined>("");
  const [password, setPassword] = useState<string>("");
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const Reader = new FileReader();
      Reader.readAsDataURL(file);

      Reader.onload = () => {
        if (Reader.readyState === 2) {
          setAvatar(file);
          setAvatarPreview(Reader.result as string);
        }
      };
    }
  };

  const submitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password, avatar }));
  };

  useEffect(() => {
    if (error) {
      dispatch(setAlertMessage({ message: error, severity: "error", }))
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Aap
        </Typography>

        <Avatar
          src={avatarPreview as string}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          value={name}
          placeholder="Name"
          className="registerInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="registerInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="registerInputs"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/">
          <Typography>Already Signed Up? Login Now</Typography>
        </Link>

        <Button disabled={loading} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Register;
