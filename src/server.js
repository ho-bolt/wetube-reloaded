
import express from "express";
// import { get } from "express/lib/response";
import morgan from "morgan";
import rootRouter from "./routes/rootRouter";
import userRouter from "./routes/userRouter";
import videoRouter from "./routes/videoRouter";
import MongoStore from "connect-mongo";
import session from "express-session";
import { localsMiddleware } from "./middlewares";




const app = express();


app.use(morgan("dev"))
//global router


app.set("view engine", "pug")
app.set("views", process.cwd() + "/src/views")
app.use(express.urlencoded({ extended: true }))
//브라우저에 cookie보냄
//cookie안에는 sessionID를 넣음
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        //쿠키가 얼마나 유효할 지 정할 수 있다. 
        // cookie: {
        //     maxAge: 20000,
        // },
        store: MongoStore.create({ mongoUrl: process.env.DB_URL })
    })
);
//sessionStore는 session을 저장하는 곳
app.use((req, res, next) => {
    req.sessionStore.all((error, sessions) => {
        console.log(sessions)
        next()
    })
})
app.get("/add-one", (req, res, next) => {
    req.session.potato += 1;
    return res.send(`${req.session.id}`)
})
app.use(localsMiddleware)
app.use("/", rootRouter)
app.use("/videos", videoRouter)
app.use("/users", userRouter)


export default app;
