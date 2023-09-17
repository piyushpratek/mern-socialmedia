import Post from "../models/postModel";
import User from "../models/userModel";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { Request, Response } from 'express'
import { HttpStatus } from "../http-status.enum";
// const cloudinary = require('cloudinary');


//Create Post
export const createPost = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    //   folder: 'posts',
    // });

    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: "req.body.public_id",
        url: "req.body.url"
      },
      owner: (req as any).user._id,
    };

    const post = await Post.create(newPostData);

    const user = await User.findById((req as any).user._id);

    // user.posts.unshift(post._id);
    user?.posts.push(post._id);

    await user?.save();

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Post created',
    });
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
})

//Delete Post
export const deletePost = catchAsyncErrors(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Post not found',
      });
    }

    if (post?.owner?.toString() !== (req as any).user._id.toString()) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    // await cloudinary.v2.uploader.destroy(post.image.public_id);

    await post?.deleteOne();

    const user = await User.findById((req as any).user._id);

    const index = user?.posts.indexOf((req as any).params.id);

    user?.posts.splice(index as number, 1);

    await user?.save();

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Post deleted',
    });
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});

//like and unlike post
export const likeAndUnlikePost = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Post not found',
      });
    }

    if (post.likes.includes((req as any).user._id)) {
      const index = post.likes.indexOf((req as any).user._id);

      post.likes.splice(index, 1);

      await post.save();

      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Post Unliked',
      });
    } else {
      post.likes.push((req as any).user._id);

      await post.save();

      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Post Liked',
      });
    }
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});

//Get post of Following
export const getPostOfFollowing = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user._id);

    const posts = await Post.find({
      owner: {
        $in: user?.following,
      },
    }).populate('owner likes comments.user');

    res.status(HttpStatus.OK).json({
      success: true,
      posts: posts.reverse(),
    });
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});

//Update Caption
export const updateCaption = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Post not found',
      });
    }

    if (post.owner.toString() !== (req as any).user._id.toString()) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    post.caption = req.body.caption;
    await post.save();
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Post updated',
    });
  } catch (error: any) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});

// exports.commentOnPost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: 'Post not found',
//       });
//     }

//     let commentIndex = -1;

//     // Checking if comment already exists

//     post.comments.forEach((item, index) => {
//       if (item.user.toString() === req.user._id.toString()) {
//         commentIndex = index;
//       }
//     });

//     if (commentIndex !== -1) {
//       post.comments[commentIndex].comment = req.body.comment;

//       await post.save();

//       return res.status(200).json({
//         success: true,
//         message: 'Comment Updated',
//       });
//     } else {
//       post.comments.push({
//         user: req.user._id,
//         comment: req.body.comment,
//       });

//       await post.save();
//       return res.status(200).json({
//         success: true,
//         message: 'Comment added',
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// exports.deleteComment = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: 'Post not found',
//       });
//     }

//     // Checking If owner wants to delete

//     if (post.owner.toString() === req.user._id.toString()) {
//       if (req.body.commentId === undefined) {
//         return res.status(400).json({
//           success: false,
//           message: 'Comment Id is required',
//         });
//       }

//       post.comments.forEach((item, index) => {
//         if (item._id.toString() === req.body.commentId.toString()) {
//           return post.comments.splice(index, 1);
//         }
//       });

//       await post.save();

//       return res.status(200).json({
//         success: true,
//         message: 'Selected Comment has deleted',
//       });
//     } else {
//       post.comments.forEach((item, index) => {
//         if (item.user.toString() === req.user._id.toString()) {
//           return post.comments.splice(index, 1);
//         }
//       });

//       await post.save();

//       return res.status(200).json({
//         success: true,
//         message: 'Your Comment has deleted',
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
