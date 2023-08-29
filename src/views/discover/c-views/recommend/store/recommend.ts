import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHotRecommend, getNewAlbum, getbanners, getPlaylistDetail, getArtistList } from "../service";

export const fetchBannerDataActions = createAsyncThunk('banner', (payload, { dispatch }) => {
    getbanners().then(res => {
        // console.log(res.data);
        dispatch(changeRecommendInfoAction(res.data.banners))
    })
    getHotRecommend(8).then(res => {
        // console.log(res.data);
        dispatch(changeHotRecommendInfoAction(res.data.result))
    })

    getNewAlbum().then(res => {
        // console.log(res);
        dispatch(changeNewAlbumInfoAction(res.data.albums))
    })

    getArtistList(5).then(res => {
        // console.log(res.data);
        dispatch(changeArtistListInfoAction(res.data.artists))
    })
})

const rankingIds = [19723756, 3779629, 2884035]
export const fetchRankingDataAction = createAsyncThunk('rankingData', (_, { dispatch }) => {
    /* 一个个获取，有可能导致数据顺序混乱 */
    // for (const id of rankingIds) {
    //     getPlaylistDetail(id).then(res => {
    //         // console.log(res.data.playlist);
    //         dispatch(changePlaylistDetailInfoAction(res.data))
    //     })
    // }

    const promises: Promise<any>[] = []
    for (const id of rankingIds) {
        promises.push(getPlaylistDetail(id))
    }

    Promise.all(promises).then((res) => {
        const playlists = res
            .filter((item) => item.data.playlist)
            .map((item) => item.data.playlist)
        console.log(playlists);

        dispatch(changePlaylistDetailInfoAction(playlists))
    })
})

interface IRecommendSlice {
    banners: any[],
    hotrecommends: any[],
    newalbums: any[],
    PlaylistDetail: any[],
    settleSingers: any[]
}

const initialState: IRecommendSlice = {
    banners: [],
    hotrecommends: [],
    newalbums: [],
    PlaylistDetail: [],
    settleSingers: []
}

const recommendSlice = createSlice({
    name: 'recommend',
    initialState,
    reducers: {
        changeRecommendInfoAction(state, { payload }) {
            state.banners = payload
        },
        changeHotRecommendInfoAction(state, { payload }) {
            state.hotrecommends = payload
        },
        changeNewAlbumInfoAction(state, { payload }) {
            state.newalbums = payload
        },
        changePlaylistDetailInfoAction(state, { payload }) {
            // const PlaylistDetails = state.PlaylistDetail   
            state.PlaylistDetail = payload
            // console.log(payload.playlist);
        },
        changeArtistListInfoAction(state, { payload }) {
            state.settleSingers = payload
        }
    }
})

export const { changeRecommendInfoAction, changeHotRecommendInfoAction, changeNewAlbumInfoAction, changePlaylistDetailInfoAction, changeArtistListInfoAction } = recommendSlice.actions
export default recommendSlice.reducer