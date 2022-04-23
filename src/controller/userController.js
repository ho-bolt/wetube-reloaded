import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import { render } from "express/lib/response";
import { emit } from "nodemon";




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
    const user = await User.findOne({ username, sociaOnly: false });
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

export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize"
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email"
    };
    //scope에 명시하면 GitHub이 code를 준다. 
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl)
}

//http://localhost:4000/users/github/finish?code=a58a462802f8e28649d4
export const finishGithubLogin = async (req, res) => {
    //유저를 code와 함게 돌려 보내준다.
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECERT,
        code: req.query.code
    }
    //이 code 이다. 그리고 이 code가 access_token으로 바뀐다.
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    //fetch를 통해서 데이터를 받아오고 
    const tokenRequest = await (
        await fetch(finalUrl, {
            method: "POST",
            headers: {
                Accept: "application/json"
            },
        })
    ).json();
    //그 데이터에서 json을 추출한다.
    if ("access_token" in tokenRequest) {
        //access api 
        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com"
        const userData = await (await fetch(`${apiUrl}/user`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        })
        ).json()
        console.log(userData)
        const emailData = await (await fetch(`${apiUrl}/user/emails`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        })
        ).json()
        // console.log(emailData)
        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified === true
        );
        if (!emailObj) {
            return res.redirect('/login')
        }
        let user = await User.findOne({ email: emailObj.email });
        if (!user) {
            //걍 회원가입해서 만든 이메일이 있고
            //깃헙으로 소셜로그인 했는데 그때 같은 이메일이 있다면, 
            // 로그인 시켜준다.
            user = await User.create({
                avatarUrl: userData.avatar_url,
                name: userData.name,
                username: userData.login,
                email: emailObj.email,
                password: "",
                sociaOnly: true,
                location: userData.location
            });
        }
        //create an account 
        // 깃헙으로 로그인 타서 들어왔는데 깃헙에서 갖고 있는 이메일이  db에 없다?? 그러면
        // 회원가입을 시켜준다. 
        //password없이 소셜로 로그인 시켜버린다.
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/")

        //중복된 이메일을 어케 처리할 것인가?
    } else {
        return res.redirect('/login')
    }
    // res.send(JSON.stringify(json))
}

export const edit = (req, res) => res.send("edit")
export const deleteUser = (req, res) => res.send("delete user")
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/")
}
export const see = (req, res) => res.send("see")


