import express from 'express';
import {
  createPost,
  deletePost,
  likeAndUnlikePost,
  getPostOfFollowing,
  updateCaption,
  commentOnPost,
  deleteComment,
} from '../controllers/postController';
import { isAuthenticated } from '../middlewares/auth';
import { uploadMulter } from '../utils/multerUtils'

const router = express.Router();

router.route('/post/upload').post(isAuthenticated, uploadMulter.single('image'), createPost);

router.route('/post/:id').get(isAuthenticated, likeAndUnlikePost).put(isAuthenticated, updateCaption).delete(isAuthenticated, deletePost);

router.route('/posts').get(isAuthenticated, getPostOfFollowing);

router
  .route('/post/comment/:id')
  .put(isAuthenticated, commentOnPost)
  .delete(isAuthenticated, deleteComment);

export default router;
