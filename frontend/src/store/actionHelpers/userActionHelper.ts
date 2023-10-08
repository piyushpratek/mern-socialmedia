import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { loadUserFailure, loadUserRequest, loadUserSuccess, loginFailure, loginRequest, loginSuccess, logoutUserFailure, logoutUserRequest, logoutUserSuccess, registerFailure, registerRequest, registerSuccess } from "../slice/user/userSlice";
import { postOfFollowingFailure, postOfFollowingRequest, postOfFollowingSuccess } from "../slice/user/postOfFollowingSlice";
import { allUsersFailure, allUsersRequest, allUsersSuccess } from "../slice/user/allUsersSlice";
import { ErrorResponse, ForgotPasswordData, Registeruserdata, ResetPasswordData, UpdatePasswordData, UpdateProfileData } from "../../types/types";
import { myPostsFailure, myPostsRequest, myPostsSuccess } from "../slice/post/myPostsSlice";
import { deleteProfileFailure, deleteProfileRequest, deleteProfileSuccess, followUserFailure, followUserRequest, followUserSuccess, forgotPasswordFailure, forgotPasswordRequest, forgotPasswordSuccess, resetPasswordFailure, resetPasswordRequest, resetPasswordSuccess, updatePasswordFailure, updatePasswordRequest, updatePasswordSuccess, updateProfileFailure, updateProfileRequest, updateProfileSuccess } from "../slice/post/likePostSlice";
import { userPostsFailure, userPostsRequest, userPostsSuccess } from "../slice/post/userPostsSlice";
import { userProfileFailure, userProfileRequest, userProfileSuccess } from "../slice/user/userProfileSlice";

//Login User
export const loginUser = (email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(loginRequest())
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password }, config
    );

    dispatch(loginSuccess(data.user))
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError?.response?.data?.message || "Error Occurred";
    dispatch(loginFailure(message));

  }
};

export const loadUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch(loadUserRequest())

    const { data } = await axios.get("/api/v1/me");

    dispatch(loadUserSuccess(data.user))

  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError?.response?.data?.message || "Error Occurred";
    dispatch(loadUserFailure(message));
  }
};

export const getFollowingPosts = () => async (dispatch: Dispatch) => {
  try {
    dispatch(postOfFollowingRequest())

    const { data } = await axios.get("/api/v1/posts");
    dispatch(postOfFollowingSuccess(data.posts))
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError?.response?.data?.message || "Error Occurred";
    dispatch(postOfFollowingFailure(message))
  }
};

export const getMyPosts = () => async (dispatch: Dispatch) => {
  try {
    dispatch(myPostsRequest())

    const { data } = await axios.get("/api/v1/my/posts");
    dispatch(myPostsSuccess(data.posts))
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError?.response?.data?.message || "Error Occurred";
    dispatch(myPostsFailure(message))
  }
};

export const getAllUsers =
  (name = "") =>
    async (dispatch: Dispatch) => {
      try {
        dispatch(allUsersRequest())

        const { data } = await axios.get(`/api/v1/users?name=${name}`);
        dispatch(allUsersSuccess(data.users))
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(allUsersFailure(message))
      }
    };

//Logout User 
export const logoutUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch(logoutUserRequest())

    await axios.get("/api/v1/logout");
    dispatch(logoutUserSuccess())
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError?.response?.data?.message || "Error Occurred";
    dispatch(logoutUserFailure(message))
  }
};

//Register User 
export const registerUser =
  (registerUserData: Registeruserdata) => async (dispatch: Dispatch) => {
    try {
      dispatch(registerRequest())

      const myForm = new FormData();
      myForm.set("name", registerUserData.name);
      myForm.set("email", registerUserData.email);
      myForm.set("password", registerUserData.password);
      myForm.set("avatar", registerUserData?.avatar as any);

      const payload = myForm;
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post("/api/v1/register", payload, config);
      dispatch(registerSuccess(data.user))
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const message = axiosError?.response?.data?.message || "Error Occurred";
      dispatch(registerFailure(message))
    }
  };

//Update Profile 
export const updateProfile = (updatUserData: UpdateProfileData) => async (dispatch: Dispatch) => {
  try {
    dispatch(updateProfileRequest())

    const myForm = new FormData();
    myForm.set("name", updatUserData?.name);
    myForm.set("email", updatUserData?.email);
    myForm.set("avatar", updatUserData?.avatar as any);

    const payload = myForm;

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put("/api/v1/update/profile", payload, config);
    dispatch(updateProfileSuccess(data.message))
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError?.response?.data?.message || "Error Occurred";
    dispatch(updateProfileFailure(message))
  }
};

//Update password
export const updatePassword =
  (payload: UpdatePasswordData) => async (dispatch: Dispatch) => {
    try {
      dispatch(updatePasswordRequest())
      const config = { headers: { "Content-Type": "application/json" } }
      const { data } = await axios.put("/api/v1/update/password", payload, config);
      dispatch(updatePasswordSuccess(data.message))
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const message = axiosError?.response?.data?.message || "Error Occurred";
      dispatch(updatePasswordFailure(message))
    }
  };

//delete profile 
export const deleteMyProfile = () => async (dispatch: Dispatch) => {
  try {
    dispatch(deleteProfileRequest())

    const { data } = await axios.delete("/api/v1/delete/me");
    dispatch(deleteProfileSuccess(data.message))
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError?.response?.data?.message || "Error Occurred";
    dispatch(deleteProfileFailure(message))
  }
};

//Forgot Password
export const forgotPassword = (payload: ForgotPasswordData) => async (dispatch: Dispatch) => {
  try {
    dispatch(forgotPasswordRequest())
    // const payload = email
    const config = { headers: { "Content-Type": "application/json" } }
    const { data } = await axios.post("/api/v1/forgot/password", payload, config);
    dispatch(forgotPasswordSuccess(data.message))
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError?.response?.data?.message || "Error Occurred";
    dispatch(forgotPasswordFailure(message))
  }
};

export const resetPassword = (payload: ResetPasswordData) => async (dispatch: Dispatch) => {
  try {
    dispatch(resetPasswordRequest())
    const config = { headers: { "Content-Type": "application/json" } }
    const { data } = await axios.put(`/api/v1/password/reset/${payload?.token}`, payload, config);
    dispatch(resetPasswordSuccess(data.message))
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError?.response?.data?.message || "Error Occurred";
    dispatch(resetPasswordFailure(message))
  }
};

export const getUserPosts = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(userPostsRequest())

    const { data } = await axios.get(`/api/v1/userposts/${id}`);
    dispatch(userPostsSuccess(data.posts))
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError?.response?.data?.message || "Error Occurred";
    dispatch(userPostsFailure(message))
  }
};

export const getUserProfile = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(userProfileRequest())

    const { data } = await axios.get(`/api/v1/user/${id}`);
    dispatch(userProfileSuccess(data.user))
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError?.response?.data?.message || "Error Occurred";
    dispatch(userProfileFailure(message))
  }
};

export const followAndUnfollowUser = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(followUserRequest())

    const { data } = await axios.get(`/api/v1/follow/${id}`);
    dispatch(followUserSuccess(data.message))
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError?.response?.data?.message || "Error Occurred";
    dispatch(followUserFailure(message))
  }
};
