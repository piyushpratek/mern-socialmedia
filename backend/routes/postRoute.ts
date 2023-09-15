import express from 'express';
import {
  createPost,
  // likeAndUnlikePost,
  // deletePost,
  // getPostOfFollowing,
  // updateCaption,
  // commentOnPost,
  // deleteComment,
} from '../controllers/postController';
// const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

// router.route('/post/upload').post(isAuthenticated, createPost);
router.route('/post/upload').post(createPost);

// router
//   .route('/post/:id')
//   .get(isAuthenticated, likeAndUnlikePost)
//   .put(isAuthenticated, updateCaption)
//   .delete(isAuthenticated, deletePost);

// router.route('/posts').get(isAuthenticated, getPostOfFollowing);

// router
//   .route('/post/comment/:id')
//   .put(isAuthenticated, commentOnPost)
//   .delete(isAuthenticated, deleteComment);

export default router;
