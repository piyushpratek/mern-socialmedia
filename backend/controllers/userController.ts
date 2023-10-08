import User from '../models/userModel';
import Post from '../models/postModel';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { HttpStatus } from '../http-status.enum';
import { Request, Response } from 'express'
import { sendEmail } from '../middlewares/sendEmail';
import crypto from 'crypto'
import cloudinary from "cloudinary"
import fs from 'fs'

//Register User
export const register = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const avatar = req.file as any

    if (!avatar) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: 'Image is required' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: 'User already exists' });
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar.path, {
      folder: 'avatars',
    });

    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });
    fs.unlinkSync(avatar.path)

    const token = user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(HttpStatus.CREATED).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});

//login user
export const login = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select("+password")
      .populate("posts followers following");

    if (!user) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(HttpStatus.OK).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});

//Logout User
export const logout = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    res
      .status(HttpStatus.OK)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});

//Follow User
export const followUser = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById((req as any).user._id);

    if (!userToFollow) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    if (loggedInUser?.following.includes(userToFollow._id)) {
      const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
      const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id);

      loggedInUser.following.splice(indexfollowing, 1);
      userToFollow.followers.splice(indexfollowers, 1);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(HttpStatus.OK).json({
        success: true,
        message: "User Unfollowed",
      });
    }
    else {
      loggedInUser?.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser!._id);

      await loggedInUser?.save();
      await userToFollow.save();

      res.status(HttpStatus.OK).json({
        success: true,
        message: "User followed",
      });
    }
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});

//Update Password 
export const updatePassword = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Please provide old and new password",
      });
    }

    const isMatch = await user?.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Incorrect Old password",
      });
    }

    user!.password = newPassword;
    await user?.save();

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});

//Update Profile
export const updateProfile = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user._id);

    const { name, email } = req.body;
    const avatar = req.file as any

    if (name) {
      user!.name = name;
    }
    if (email) {
      user!.email = email;
    }

    if (avatar) {
      await cloudinary.v2.uploader.destroy(user!.avatar.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(avatar.path, {
        folder: "avatars",
      });
      user!.avatar.public_id = myCloud.public_id;
      user!.avatar.url = myCloud.secure_url;
    }
    fs.unlinkSync(avatar.path)

    await user?.save();

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});

//Delete MyProfile
export const deleteMyProfile = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user._id);
    const posts = user?.posts;
    const followers = user?.followers;
    const following = user?.following;
    const userId = user?._id;

    // Removing Avatar from cloudinary
    await cloudinary.v2.uploader.destroy(user!.avatar.public_id);

    await user?.deleteOne();

    // Logout user after deleting profile
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    // Delete all posts of the user
    for (let i = 0; i < posts!.length; i++) {
      const post = await Post.findById(posts![i]);
      await cloudinary.v2.uploader.destroy(post!.image.public_id);
      await post?.deleteOne();
    }

    // Removing User from Followers Following
    for (let i = 0; i < followers!.length; i++) {
      const follower = await User.findById(followers![i]);

      const index = follower?.following.indexOf(userId!);
      follower?.following.splice(index as number, 1);
      await follower?.save();
    }

    // Removing User from Following's Followers
    for (let i = 0; i < following!.length; i++) {
      const follows = await User.findById(following![i]);

      const index = follows?.followers.indexOf(userId!);
      follows?.followers.splice(index as number, 1);
      await follows?.save();
    }

    // removing all comments of the user from all posts
    const allPosts = await Post.find();

    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);

      for (let j = 0; j < post!.comments.length; j++) {
        if (post?.comments[j].user === userId) {
          post?.comments.splice(j, 1);
        }
      }
      await post?.save();
    }
    // removing all likes of the user from all posts

    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);

      for (let j = 0; j < post!.likes.length; j++) {
        if (post?.likes[j] === userId) {
          post?.likes.splice(j, 1);
        }
      }
      await post?.save();
    }

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Profile Deleted",
    });
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});

//MyProfile = information of user profile
export const myProfile = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user._id).populate(
      "posts followers following"
    );

    res.status(HttpStatus.OK).json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});

//Get User Profile
export const getUserProfile = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "posts followers following"
    );

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(HttpStatus.OK).json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});

//Get All Users
export const getAllUsers = catchAsyncErrors(async (req, res) => {
  try {
    const users = await User.find({
      // name: { $regex: req.query.name, $options: "i" },
    });

    res.status(HttpStatus.OK).json({
      success: true,
      users,
    });
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});

//Forgot Password
export const forgotPassword = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    const resetPasswordToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${req.protocol}://${req.get(
      "host"
      // )}/api/v1/password/reset/${resetPasswordToken}`;
    )}/password/reset/${resetPasswordToken}`;

    const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });

      res.status(HttpStatus.OK).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error: any) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});

// Reset Password
export const resetPassword = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Password Reset successfully",
    });
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});

//Get MyPosts
export const getMyPosts = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user._id);

    const posts = [];

    for (let i = 0; i < user!.posts.length; i++) {
      const post = await Post.findById(user?.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(HttpStatus.OK).json({
      success: true,
      posts,
    });
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});

//Get UserPosts
export const getUserPosts = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    const posts = [];

    for (let i = 0; i < user!.posts.length; i++) {
      const post = await Post.findById(user?.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(HttpStatus.OK).json({
      success: true,
      posts,
    });
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});
