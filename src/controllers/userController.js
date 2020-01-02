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
        res.status(400);
        res.render('join', {pageTitle: '新規登録'});
    }
    try{
        const exUser = await User.findOne({email: email});
        if(exUser){
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

export const logout = (req, res) => {
    req.logout(); // req.user 객체 제거
    req.session.destroy(); // req.session 객체의 내용 제거
    res.redirect(routes.home);
};

export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const lineLogin = passport.authenticate('line');

export const lineLoginCallback = async (_, __, profile, cb) => {
    console.log(profile);
};

export const postLineLogin = (req, res) => {
    res.redirect(routes.home);
};

export const githubLogin = passport.authenticate('github');

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
};

export const githubLoginCallback = async (_, __, profile, cb) => {
    const {
        _json: {
            id, avatar_url: avatarUrl, name, email
        }
    } = profile;
    console.log(profile);
    try {
        const user = await User.findOne({ email });
        if(user){
            user.githubId = id;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            email,
            name,
            githubId: id,
            avatarUrl
        });
        return cb(null, newUser);
    }catch(error){
        return cb(error);
    }
};

export const getMe = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).populate('videos');
        res.render('userDetail', {pageTitle: 'プロフィール', user });
    }catch(error){
        res.redirect(routes.home);
    }
    
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
    console.log(req.body);
    console.log(req.file);
    try{
        await User.findByIdAndUpdate(req.user.id, {
            // AWS S3사용시 file.location
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