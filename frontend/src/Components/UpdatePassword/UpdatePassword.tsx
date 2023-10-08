import "./UpdatePassword.css";
import { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store"
import { updatePassword } from "../../store/actionHelpers/userActionHelper";
import { setAlertMessage } from "../../store/slice/user/userSlice";
import { clearErrors, clearMessage } from "../../store/slice/post/likePostSlice";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const dispatch = useAppDispatch();

  const { error, loading, message } = useAppSelector((state) => state.like);

  const submitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(updatePassword({ oldPassword, newPassword }));
  };

  useEffect(() => {
    if (error) {
      dispatch(setAlertMessage({ message: error, severity: "error", }))
      dispatch(clearErrors());
    }

    if (message) {
      dispatch(setAlertMessage({ message: message, severity: "success", }))
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <input
          type="password"
          placeholder="Old Password"
          required
          value={oldPassword}
          className="updatePasswordInputs"
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          required
          className="updatePasswordInputs"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
