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
    res.render('userDetail', {pageTitle: 'プロフィール', user: req.user});
};

export const userDetail = async (req, res) => {
    const { params: { id } } = req;
    try{
        const user = await User.findById(id).populate('videos');
        res.render('userDetail', { pageTitle: 'プロフィール', user });
    }catch(error){
        console.error(error);
        res.redirect(routes.home);
    }
};

export const getEditProfile = (req, res) => {
    res.render('editProfile', { pageTitle: 'プロフィール変更' });
};

export const postEditProfile = async (req, res) => {
    const {
        body: { name, email },
        file
    } = req;
    try{
        await User.findByIdAndUpdate(req.user.id, {
            name, email, avatarUrl: file ? file.path : req.user.avatarUrl
        });
        res.redirect(routes.me);
    }catch(error){
        console.error(error);
        res.redirect(routes.editProfile);
    }
};

export const getChangePassword = (req, res) => {
    res.render('changePassword', { pageTitle: 'パスワード変更' });
};

export const postChangePassword = async (req, res) => {
    const {
        body : {
            oldPassword, newPassword, newPassword1
        }
    } = req;
    try {
        if(newPassword !== newPassword1){
            res.status(400);
            res.redirect(`${routes.user}${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(oldPassword, newPassword);
        res.redirect(routes.me);
    }catch(error){
        console.error(error);
        res.status(400);
        res.redirect(`${routes.user}${routes.changePassword}`);
    }
};