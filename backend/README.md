## Workflow

Create App.ts and then server.ts then config folder(files - config, logger,database)

create models-postModel,userModel

create middlewares =auth.ts for authentication of user , sendEmail using nodemailer function for sending emails for forgot password

create controllers-postController then= createPost -> like and dislike post -> delete post -> getPostOfFollowing -> updateCaption -> commentOnPost -> deleteComment
,
userController then= register -> login -> followUser ->Logout -> updatePassword -> updateProfile -> deleteMyProfile -> myProfile -> getUserProfile -> getAllUsers -> forgotPassword -> resetPassword -> getMyPosts -> getUserPosts

create routes-postRoute then= createPost -> like and dislike post -> delete post ->getPostOfFollowing -> updateCaption -> commentOnPost -> deleteComment,
userRoute then=register -> login -> followUser ->Logout -> updatePassword -> updateProfile -> deleteMyProfile -> myProfile -> getUserProfile -> getAllUsers

password=1234567890

this.resetPasswordExpire = Date.now() + 10 _ 60 _ 1000;
10 minute _ 60 seconds _ 1000 mili seconds -> it means it is valid for 10 minutes

part 2 - 15/55 = delete comment request
