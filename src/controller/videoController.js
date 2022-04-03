
const fakeUser = {
    username: "Nicolas",
    loggedIn: false,

}
let videos = [
    {
        title: "First Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 12,
        id: 1,
    },
    {
        title: "Second Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id: 2,
    },
    {
        title: "Third Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id: 3,
    },

];

export const trending = (req, res) => {
    return res.render("home", { pageTitle: "Home", videos })
}
export const watch = (req, res) => {
    // const id = req.params.id;
    //파라미터 받고
    const { id } = req.params;
    //id에 대응하는 데이터 video에 넣기
    const video = videos[id - 1]
    //그 데이터의 title과 데이터 자체를 watch로 보내줘

    return res.render("watch", { pageTitle: `Watch ${video.title}`, video })
}

export const edit = (req, res) => {
    res.render("edit")
}
export const search = (req, res) => { res.send("search") }
export const upload = (req, res) => res.send("upload")
export const remove = (req, res) => {
    console.log(req.params)
    res.send("remove")
}


