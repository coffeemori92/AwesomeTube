import express from 'express';
import routes from '../routes';
import { onlyPrivate, uploadAvatar } from '../middlewares';
import { getEditProfile, postEditProfile, getChangePassword, postChangePassword, userDetail } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routes.userDetail(), userDetail);

export default userRouter;