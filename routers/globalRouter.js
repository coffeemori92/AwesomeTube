import express from 'express';
import routes from '../routes';
import { home } from '../controllers/videoController';
import { onlyPublic } from '../middlewares';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);


export default globalRouter;