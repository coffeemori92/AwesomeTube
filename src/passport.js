import passport from 'passport';
import GithubStrategy from 'passport-github';
import LineStrategy from 'passport-line-auth';
import User from './models/User';
import routes from './routes';
import { githubLoginCallback, lineLoginCallback } from './controllers/userController';

passport.use(User.createStrategy());

passport.use(new LineStrategy({
    channelID: process.env.LINE_ID,
    channelSecret: process.env.LINE_SECRET,
    callbackURL: process.env.PRODUCTION
        ? `https://whispering-tor-64595.herokuapp.com${routes.lineCallback}`
        : `http://localhost:4000${routes.lineCallback}`,
    scope: ['profile', 'openid', 'email']
}, lineLoginCallback
));

passport.use(new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: process.env.PRODUCTION
        ? `https://whispering-tor-64595.herokuapp.com${routes.githubCallback}`
        : `http://localhost:4000${routes.githubCallback}`
}, githubLoginCallback
));

passport.serializeUser(User.serializeUser()); // req.session 객체에 어떤 데이터를 저장할지 선택
passport.deserializeUser(User.deserializeUser()); // DB에서 세션에 저장했던 값을 받아 사용자 정보 조회 -> req.user에 저장