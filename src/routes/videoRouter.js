import express from "express";
const videoRouter = express.Router();
import { see, edit, upload, remove } from "../controller/videoController"




videoRouter.get("/upload", upload)
//오직 숫자만 받는다.
videoRouter.get("/:id(\\d+)", see)
videoRouter.get("/:id(\\d+)/edit", edit)
videoRouter.get("/:id(\\d+)/delete", remove)
export default videoRouter;