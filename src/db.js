import mongoose from "mongoose"

mongoose.connect("mongodb://127.0.0.1:27017/wetube", {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

const db = mongoose.connection;
const handleOpen = () => console.log("Connected to DB")
const handleError = (error) => console.log("DB Error", error)

//on은 여러번 일어날 수 있는 것
db.on("error", handleError);
//once는 한 번만 
db.once("open", handleOpen)
