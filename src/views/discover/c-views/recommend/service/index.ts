import hyRequest from "@/service"

export const getbanners = () => {
    return hyRequest.get({
        url: "/banner"
    })
}

export const getHotRecommend = (limit = 20) => {
    return hyRequest.get({
        url: "/personalized",
        params: {
            limit
        }
    })
}

export function getNewAlbum() {
    return hyRequest.get({
        url: '/album/newest'
    })
}

export function getPlaylistDetail(id: number) {
    return hyRequest.get({
        url: '/playlist/detail',
        params: {
            id
        }
    })
}

export function getArtistList(limit = 30) {
    return hyRequest.get({
        url: '/artist/list',
        params: {
            limit
        }
    })
}
