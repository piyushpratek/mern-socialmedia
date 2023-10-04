import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "../../types/types";
import { likeFailure, likeRequest, likeSuccess } from "../slice/post/likeandCommentPostSlice";

export const likePost = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(likeRequest());

    const { data } = await axios.get(`/api/v1/post/${id}`);
    dispatch(likeSuccess(data.message))
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError?.response?.data?.message || "Error Occurred";
    dispatch(likeFailure(message))
  }
};

// export const addCommentOnPost = (id, comment) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "addCommentRequest",
//     });

//     const { data } = await axios.put(
//       `/api/v1/post/comment/${id}`,
//       {
//         comment,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     dispatch({
//       type: "addCommentSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "addCommentFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

// export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "deleteCommentRequest",
//     });

//     const { data } = await axios.delete(`/api/v1/post/comment/${id}`, {
//       data: { commentId },
//     });
//     dispatch({
//       type: "deleteCommentSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "deleteCommentFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

// export const createNewPost = (caption, image) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "newPostRequest",
//     });

//     const { data } = await axios.post(
//       `/api/v1/post/upload`,
//       {
//         caption,
//         image,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     dispatch({
//       type: "newPostSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "newPostFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

// export const updatePost = (caption, id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "updateCaptionRequest",
//     });

//     const { data } = await axios.put(
//       `/api/v1/post/${id}`,
//       {
//         caption,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     dispatch({
//       type: "updateCaptionSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "updateCaptionFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

// export const deletePost = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "deletePostRequest",
//     });

//     const { data } = await axios.delete(`/api/v1/post/${id}`);
//     dispatch({
//       type: "deletePostSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "deletePostFailure",
//       payload: error.response.data.message,
//     });
//   }
// };
