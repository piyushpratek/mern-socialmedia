import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store"
import { Link, useParams } from "react-router-dom";
import "./ResetPassword.css";
import { setAlertMessage, clearErrors } from "../../store/slice/user/userSlice";
import { clearMessage } from "../../store/slice/post/likePostSlice";
import { resetPassword } from "../../store/actionHelpers/userActionHelper";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const params = useParams<{ token: string }>();
  const { error, loading, message } = useAppSelector((state) => state.like);

  const submitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(resetPassword({ token: params.token!, newPassword }));
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
  }, [error, dispatch, message]);

  return (
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <input
          type="password"
          placeholder="New Password"
          required
          className="updatePasswordInputs"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Link to="/">
          <Typography>Login</Typography>
        </Link>
        <Typography>Or</Typography>

        <Link to="/forgot/password">
          <Typography>Request Another Token!</Typography>
        </Link>

        <Button disabled={loading} type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
