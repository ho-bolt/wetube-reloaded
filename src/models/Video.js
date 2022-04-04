import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    //클라이언트에서 해킹해서 고칠 수 있기 때문에 db에도 해줘야한다.
    title: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, required: true, trim: true, minlength: 20 },
    //바로 실행시키고 싶지 않아서 ()를 뺀다. 새로운 데이터를 생성했을때만 실행
    createdAt: { type: Date, required: true, default: Date.now },
    hashtags: [{ type: String }],
    meat: {
        views: { type: Number, default: 0, required: true },
        rating: { type: Number, default: 0, required: true }
    },
});

const Video = mongoose.model("Video", videoSchema)
export default Video;
