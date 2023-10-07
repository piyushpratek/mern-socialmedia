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
//"image"= is a field name used from controller 
const FILE_FIELD_NAME = 'image';
router.route('/post/upload').post(isAuthenticated, uploadMulter.single(FILE_FIELD_NAME), createPost);

router.route('/post/:id').get(isAuthenticated, likeAndUnlikePost).put(isAuthenticated, updateCaption).delete(isAuthenticated, deletePost);

router.route('/posts').get(isAuthenticated, getPostOfFollowing);

router
  .route('/post/comment/:id')
  .put(isAuthenticated, commentOnPost)
  .delete(isAuthenticated, deleteComment);

export default router;