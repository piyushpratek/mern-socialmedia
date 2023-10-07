import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "../../types/types";
import { addCommentFailure, addCommentRequest, addCommentSuccess, deleteCommentFailure, deleteCommentRequest, deleteCommentSuccess, deletePostFailure, deletePostRequest, deletePostSuccess, likeFailure, likeRequest, likeSuccess, newPostFailure, newPostRequest, newPostSuccess, updateCaptionFailure, updateCaptionRequest, updateCaptionSuccess } from "../slice/post/likePostSlice";

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

export const addCommentOnPost = (id: string, comment: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(addCommentRequest());

    const { data } = await axios.put(
      `/api/v1/post/comment/${id}`,
      {
        comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(addCommentSuccess(data.message))
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError?.response?.data?.message || "Error Occurred";
    dispatch(addCommentFailure(message))
  }
};

export const deleteCommentOnPost = (id: string, commentId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(deleteCommentRequest())
    const { data } = await axios.delete(`/api/v1/post/comment/${id}`, {
      data: { commentId },
    }
    );
    dispatch(deleteCommentSuccess(data.message))
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError?.response?.data?.message || "Error Occurred";
    dispatch(deleteCommentFailure(message))
  }
};

export const createNewPost = (caption: string, image: File | null | string) => async (dispatch: Dispatch) => {
  try {
    dispatch(newPostRequest())
    const myForm = new FormData();
    myForm.set("caption", caption);
    if (image instanceof Blob) {
      myForm.set("image", image);
    }
    const payload = myForm;

    const config = { headers: { "Content-Type": "multipart/form-data" } }
    const { data } = await axios.post(`/api/v1/post/upload`, payload, config);
    dispatch(newPostSuccess(data.message))
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError?.response?.data?.message || "Error Occurred";
    dispatch(newPostFailure(message))
  }
};

export const updatePost = (caption: string, id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(updateCaptionRequest())
    const myForm = new FormData();
    myForm.set('caption', caption);
    const payload = myForm
    const config = { headers: { "Content-Type": "application/json", }, };
    const { data } = await axios.put(`/api/v1/post/${id}`, payload, config);
    dispatch(updateCaptionSuccess(data.message))
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError?.response?.data?.message || "Error Occurred";
    dispatch(updateCaptionFailure(message))
  }
};

export const deletePost = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(deletePostRequest())

    const { data } = await axios.delete(`/api/v1/post/${id}`);
    dispatch(deletePostSuccess(data.message))
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError?.response?.data?.message || "Error Occurred";
    dispatch(deletePostFailure(message))
  }
};
