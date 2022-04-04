
import Video from "../models/Video";

//callback부분
// Video.find({}, (error, videos) => {
//     if (error) {
//         return res.render("server-error")
//     }return res.render("server-error")
// }) 
export const home = async (req, res) => {
    try {
        const videos = await Video.find({})
        return res.render("home", { pageTitle: "Home", videos })
    } catch (error) {
        return res.render("server-error", { error })
    }

}
export const watch = (req, res) => {
    // const id = req.params.id;
    //파라미터 받고
    const { id } = req.params;
    //id에 대응하는 데이터 video에 넣기

    //그 데이터의 title과 데이터 자체를 watch로 보내줘

    return res.render("watch", { pageTitle: `Watch` })
}

export const getEdit = (req, res) => {
    const { id } = req.params;
    return res.render("edit", { pageTitle: `Editing ` })
}
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    return res.redirect(`/videos/${id}`)
}

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload video" })
}
export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try {

        await Video.create({
            title,
            description,
            hashtags: hashtags.split(", ").map(word => `#${word}`),

        });
        return res.redirect("/")
    } catch (error) {
        console.log(error)
        return res.render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message,
        });
    }

    //save는 promise를 return한다.
}
