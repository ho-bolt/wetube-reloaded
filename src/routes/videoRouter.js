import express from "express";
const videoRouter = express.Router();
import { watch, getEdit, postEdit, getUpload, postUpload, deleteVideo } from "../controller/videoController"




//오직 숫자만 받는다.
videoRouter.get("/:id([0-9a-f]{24})", watch)
videoRouter.route("/upload").get(getUpload).post(postUpload)
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo)

export default videoRouter;