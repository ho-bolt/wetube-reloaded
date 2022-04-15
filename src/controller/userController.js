import User from "../models/User";
import bcrypt from "bcrypt";




export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" })

export const postJoin = async (req, res) => {
    const { name, username, email, password, password2, location } = req.body;
    const exists = await User.exists({ $or: [{ username }, { email }] })
    const pageTitle = "Join";
    if (password !== password2) {
        return res.status(400).render("join", {
            pageTitle, errorMessage: "Password confirmation does not match"
        })
    }

    if (exists) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "This username/email is already taken."
        })
    }
    try {
        await User.create({
            name,
            username,
            email,
            password,
            location,
        })
        return res.redirect("/login");
    } catch (error) {
        return res.status(400).render("join", {
            pageTitle: "Join",
            errorMessage: error._message
        })
    }


};

export const getLogin = (req, res) => res.render("login", { pageTitle: "Login" })

export const postLogin = async (req, res) => {
    //check if account exists
    const { username, password } = req.body;
    const pageTitle = "login"
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).render("login", { pageTitle, errorMessage: "An account with this username does not exists" })
    }
    //check if password is correct
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "Wrong password"
        })
    }
    //세션에 로그인한 정보 추가
    req.session.loggedIn = true;
    req.session.user = user;

    return res.redirect("/")
}



export const edit = (req, res) => res.send("edit")
export const deleteUser = (req, res) => res.send("delete user")
export const logout = (req, res) => res.send("logout")
export const see = (req, res) => res.send("see")


