export const localsMiddleware = (req, res, next) => {

    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "WETUBE"
    res.locals.loggedInUser = req.session.user;
    console.log("@@@@", res.locals)
    next()
}