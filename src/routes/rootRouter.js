import express from "express";
import { getJoin, getLogin, postJoin, postLogin } from "../controller/userController";
import { home, search } from "../controller/videoController";


const rootRouter = express.Router();


rootRouter.get("/", home)
rootRouter.route('/join').get(getJoin).post(postJoin)
rootRouter.route("/login").get(getLogin).post(postLogin)
rootRouter.get("/search", search)


//이 파일을 통째로 export한다.
export default rootRouter;