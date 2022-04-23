import express from "express";
import { edit, deleteUser, logout, see, startGithubLogin, finishGithubLogin } from "../controller/userController";


const userRouter = express.Router();


//라우터와 컨트롤러를 섞어서 쓰는 건 좋지 않다.
userRouter.get("/delete", deleteUser)
userRouter.get("/edit", edit)
userRouter.get("/logout", logout)
userRouter.get("/github/start", startGithubLogin)
userRouter.get("/github/finish", finishGithubLogin)
userRouter.get(":id", see)




export default userRouter;