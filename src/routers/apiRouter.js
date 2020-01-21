import express from 'express';
import routes from '../routes';
import { postAddComment, getLoadComment } from '../controllers/commentController';
import { postRegisterView } from '../controllers/videoController';

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);

apiRouter.get(routes.loadComment, getLoadComment);

export default apiRouter;