import passport from 'passport';
import User from './models/User';
import routes from './routes';

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser()); // req.session 객체에 어떤 데이터를 저장할지 선택
passport.deserializeUser(User.deserializeUser()); // DB에서 세션에 저장했던 값을 받아 사용자 정보 조회 -> req.user에 저장