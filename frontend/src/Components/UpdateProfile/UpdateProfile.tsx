import { Avatar, Typography, Button } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store"
import "./UpdateProfile.css";
import Loader from "../Loader/Loader";
import { loadUser, updateProfile } from "../../store/actionHelpers/userActionHelper";
import { setAlertMessage, clearErrors } from "../../store/slice/user/userSlice";
import { clearMessage } from "../../store/slice/post/likePostSlice";

const UpdateProfile = () => {
  const { loading, error, user } = useAppSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useAppSelector((state) => state.like);

  const [name, setName] = useState<string>(user!.name);
  const [email, setEmail] = useState<string>(user!.email);
  const [avatar, setAvatar] = useState<File | null | string | undefined>("");
  const [avatarPrev, setAvatarPrev] = useState<string>(user!.avatar.url);

  const dispatch = useAppDispatch();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const Reader = new FileReader();
      Reader.readAsDataURL(file);

      Reader.onload = () => {
        if (Reader.readyState === 2) {
          setAvatar(file);
          setAvatarPrev(Reader.result as string);
        }
      };
    }
  };

  const submitHandler = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await dispatch(updateProfile({ name, email, avatar }));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      dispatch(setAlertMessage({ message: error, severity: "error", }))
      dispatch(clearErrors());
    }

    if (updateError) {
      dispatch(setAlertMessage({ message: updateError, severity: "error", }))
      dispatch(clearErrors());
    }

    if (message) {
      dispatch(setAlertMessage({ message: message, severity: "success", }))
      dispatch(clearMessage());
    }
  }, [dispatch, error, updateError, message]);
  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <Avatar
          src={avatarPrev}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          value={name}
          placeholder="Name"
          className="updateProfileInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="updateProfileInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={updateLoading} type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
