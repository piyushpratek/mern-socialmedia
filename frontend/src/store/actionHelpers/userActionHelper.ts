import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { loadUserFailure, loadUserRequest, loadUserSuccess, loginFailure, loginRequest, loginSuccess, logoutUserFailure, logoutUserRequest, logoutUserSuccess, registerFailure, registerRequest, registerSuccess } from "../slice/user/userSlice";
import { postOfFollowingFailure, postOfFollowingRequest, postOfFollowingSuccess } from "../slice/user/postOfFollowingSlice";
import { allUsersFailure, allUsersRequest, allUsersSuccess } from "../slice/user/allUsersSlice";
import { ErrorResponse, Registeruserdata } from "../../types/types";
import { myPostsFailure, myPostsRequest, myPostsSuccess } from "../slice/post/myPostsSlice";

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

// export const updateProfile = (name, email, avatar) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "updateProfileRequest",
//     });

//     const { data } = await axios.put(
//       "/api/v1/update/profile",
//       { name, email, avatar },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     dispatch({
//       type: "updateProfileSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "updateProfileFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

// export const updatePassword =
//   (oldPassword, newPassword) => async (dispatch) => {
//     try {
//       dispatch({
//         type: "updatePasswordRequest",
//       });

//       const { data } = await axios.put(
//         "/api/v1/update/password",
//         { oldPassword, newPassword },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       dispatch({
//         type: "updatePasswordSuccess",
//         payload: data.message,
//       });
//     } catch (error) {
//       dispatch({
//         type: "updatePasswordFailure",
//         payload: error.response.data.message,
//       });
//     }
//   };

// export const deleteMyProfile = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: "deleteProfileRequest",
//     });

//     const { data } = await axios.delete("/api/v1/delete/me");

//     dispatch({
//       type: "deleteProfileSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "deleteProfileFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

// export const forgotPassword = (email) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "forgotPasswordRequest",
//     });

//     const { data } = await axios.post(
//       "/api/v1/forgot/password",
//       {
//         email,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     dispatch({
//       type: "forgotPasswordSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "forgotPasswordFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

// export const resetPassword = (token, password) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "resetPasswordRequest",
//     });

//     const { data } = await axios.put(
//       `/api/v1/password/reset/${token}`,
//       {
//         password,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     dispatch({
//       type: "resetPasswordSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "resetPasswordFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

// export const getUserPosts = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "userPostsRequest",
//     });

//     const { data } = await axios.get(`/api/v1/userposts/${id}`);
//     dispatch({
//       type: "userPostsSuccess",
//       payload: data.posts,
//     });
//   } catch (error) {
//     dispatch({
//       type: "userPostsFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

// export const getUserProfile = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "userProfileRequest",
//     });

//     const { data } = await axios.get(`/api/v1/user/${id}`);
//     dispatch({
//       type: "userProfileSuccess",
//       payload: data.user,
//     });
//   } catch (error) {
//     dispatch({
//       type: "userProfileFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

// export const followAndUnfollowUser = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "followUserRequest",
//     });

//     const { data } = await axios.get(`/api/v1/follow/${id}`);
//     dispatch({
//       type: "followUserSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "followUserFailure",
//       payload: error.response.data.message,
//     });
//   }
// };
