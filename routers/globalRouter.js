import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/videoController';
import { getJoin, postLogin, getLogin, logout, postJoin, getMe } from '../controllers/userController';
import { onlyPublic, onlyPrivate } from '../middlewares';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin); // 신규등록(화면)
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin); // 회원가입(DB) -> 로그인(DB)

globalRouter.get(routes.login, onlyPublic, getLogin); // 로그인(화면)
globalRouter.post(routes.login, postLogin); // 로그인(DB)

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

// globalRouter.get(routes.github, githubLogin);

globalRouter.get(routes.me, getMe);

export default globalRouter;