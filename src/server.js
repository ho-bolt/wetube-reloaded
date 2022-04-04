
import express from "express";
// import { get } from "express/lib/response";
import morgan from "morgan";
import globalRouter from "./routes/globalRouter";
import userRouter from "./routes/userRouter";
import videoRouter from "./routes/videoRouter";




const app = express();


app.use(morgan("dev"))
//global router


app.set("view engine", "pug")
app.set("views", process.cwd() + "/src/views")
app.use(express.urlencoded({ extended: true }))
app.use("/", globalRouter)
app.use("/videos", videoRouter)
app.use("/users", userRouter)


export default app;
