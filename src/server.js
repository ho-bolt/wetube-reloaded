import express from "express";
// import { get } from "express/lib/response";
import morgan from "morgan";
import globalRouter from "./routes/globalRouter";
import userRouter from "./routes/userRouter";
import videoRouter from "./routes/videoRouter";


const PORT = 4000;
const app = express();


console.log(process.cwd())
app.use(morgan("dev"))
//global router


app.set("view engine", "pug")
app.set("views", process.cwd() + "/src/views")
app.use("/", globalRouter)
app.use("/videos", videoRouter)
app.use("/users", userRouter)


const home = (req, res) => {
    console.log("i will respond")
    return res.send("hello")
}
const login = (req, res) => {
    return res.send("login")
}


const handleListening = () => console.log(`"Server Listening on port localhost:${PORT}`);
app.listen(PORT, handleListening);

