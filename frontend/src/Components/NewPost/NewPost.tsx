import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import "./NewPost.css";

import { loadUser } from "../../store/actionHelpers/userActionHelper";
import { setAlertMessage } from "../../store/slice/user/userSlice";
import { clearErrors } from "../../store/slice/post/likePostSlice";
import { createNewPost } from "../../store/actionHelpers/postActionHelper";

const NewPost = () => {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");

  const { loading, error, message } = useAppSelector((state) => state.like);
  const dispatch = useAppDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result as string);
      }
    };
  };

  const submitHandler = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await dispatch(createNewPost(caption, image));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      dispatch(setAlertMessage({ message: error, severity: "error", }))
      dispatch(clearErrors())
    }

    if (message) {
      dispatch(setAlertMessage({ message: message, severity: "success", }))
      dispatch(clearErrors())
    }
  }, [dispatch, error, message]);

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h3">New Post</Typography>

        {image && <img src={image} alt="post" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button disabled={loading} type="submit">
          Post
        </Button>
      </form>
    </div>
  );
};

export default NewPost;
