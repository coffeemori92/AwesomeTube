import express from 'express';
import routes from '../routes';
import { onlyPrivate, uploadVideo } from '../middlewares';
import { getUpload, postUpload, videoDetail, getEditVideo, postEditVideo } from '../controllers/videoController';

const videoRouter = express.Router();

videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

export default videoRouter;