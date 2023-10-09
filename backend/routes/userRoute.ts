import express from 'express'; // const {
import { deleteMyProfile, followUser, forgotPassword, getAllUsers, getMyPosts, getUserPosts, getUserProfile, login, logout, myProfile, register, resetPassword, updatePassword, updateProfile } from '../controllers/userController';
import { isAuthenticated } from '../middlewares/auth';
import { uploadMulter } from '../utils/multerUtils'


const router = express.Router();

router.route("/register").post(uploadMulter.single('avatar'), register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/follow/:id").get(isAuthenticated, followUser);

router.route("/update/password").put(isAuthenticated, updatePassword);

router.route("/update/profile").put(uploadMulter.single('avatar'), isAuthenticated, updateProfile);

router.route("/delete/me").delete(isAuthenticated, deleteMyProfile);

router.route("/me").get(isAuthenticated, myProfile);

router.route("/my/posts").get(isAuthenticated, getMyPosts);

router.route("/userposts/:id").get(isAuthenticated, getUserPosts);

router.route("/user/:id").get(isAuthenticated, getUserProfile);

router.route("/users").get(isAuthenticated, getAllUsers);

router.route("/forgot/password").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

export default router; 
