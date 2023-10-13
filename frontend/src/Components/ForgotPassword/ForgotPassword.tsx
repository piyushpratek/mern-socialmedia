import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store"
import "./ForgotPassword.css";
import { setAlertMessage, clearErrors } from "../../store/slice/user/userSlice";
import { clearMessage } from "../../store/slice/post/likePostSlice";
import { forgotPassword } from "../../store/actionHelpers/userActionHelper";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");

  const dispatch = useAppDispatch();
  const { error, loading, message } = useAppSelector((state) => state.like);

  const submitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(forgotPassword({
      email,
      token: ""
    }));
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
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          className="forgotPasswordInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Send Token
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
