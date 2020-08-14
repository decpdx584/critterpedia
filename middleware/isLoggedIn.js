module.exports = (req, res, next) => {
    if (!req.user) {
        req.flash('Error', 'Gotta sign in, my dude!');
        res.redirect('/auth/login');
    } else {
        next();
    }
};