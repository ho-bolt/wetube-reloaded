import express from "express";
const videoRouter = express.Router();
import { watch, getEdit, postEdit, getUpload, postUpload } from "../controller/videoController"




//오직 숫자만 받는다.
videoRouter.get("/:id(\\d+)", watch)
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload)

export default videoRouter;