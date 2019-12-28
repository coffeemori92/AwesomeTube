import routes from '../routes';
import User from '../models/User';
import passport from 'passport';

export const getJoin = (req, res) => {
    res.render('join', {
        pageTitle: '新規登録'
    });
};

export const postJoin = async (req, res, next) => {
    console.log(req.body);
    const {
        body: {
            name, email, password, password2
        }
    } = req;
    if(password !== password2){
        req.flash('passwordError', 'パスワードが一致しません');
        res.status(400);
        res.render('join', {pageTitle: '新規登録'});
    }
    try{
        const exUser = await User.findOne({email: email});
        if(exUser){
            req.flash('emailError', '既に登録されているメールです');
            res.render('join', {pageTitle: '新規登録'});
        }else{
            try{
                const user = await User({
                    name, email
                });
                await User.register(user, password);
                next();
            }catch(error){
                console.error(error);
                res.redirect(routes.home);
            }
        }
    }catch(error){
        console.error(error);
        res.redirect(routes.home);
    }
};

export const getLogin = (req, res) => {
    res.render('login', {
        pageTitle: 'ログイン'
    });
};

export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const logout = (req, res) => {
    req.logout(); // req.user 객체 제거
    req.session.destroy(); // req.session 객체의 내용 제거
    res.redirect(routes.home);
};

export const getMe = (req, res) => {
    res.render('userDetail', {pageTitle: 'プロフィル', user: req.user});
};