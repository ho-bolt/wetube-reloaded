
import Video from "../models/Video";


export const home = (req, res) => {
    Video.find({}, (error, videos) => { })
    return res.render("home", { pageTitle: "Home" })
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
export const postUpload = (req, res) => {
    const { title } = req.body;


    return res.redirect("/")
}
