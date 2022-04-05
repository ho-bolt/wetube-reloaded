import express from "express";
import { join, login } from "../controller/userController";
import { home, search } from "../controller/videoController";


const globalRouter = express.Router();


globalRouter.get("/", home)
globalRouter.get('/join', join)
globalRouter.get("/login", login)
globalRouter.get("/search", search)


//이 파일을 통째로 export한다.
export default globalRouter;