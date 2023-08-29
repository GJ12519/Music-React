import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { IRootState } from '@/store'
import { ILyric, parseLyric } from "@/utils/parse-lyric"
import { getSongDetail, getSongLyric } from "../service/player"

interface IThunkState {
    state: IRootState
}

export const fetchSongDetailAction = createAsyncThunk<
    void,
    number,
    IThunkState
>('Songs', (id: number, { dispatch, getState }) => {
    // 1.从列表尝试是否可以获取到这首歌
    const playSongList = getState().player.playSongList
    const findIndex = playSongList.findIndex((item) => item.id === id)
    if (findIndex === -1) {
        /* 获取歌曲信息 */
        getSongDetail(id).then(res => {
            if (!res.data.songs.length) return
            const song = res.data.songs[0]

            const newPlaySongList = [...playSongList]
            newPlaySongList.push(song)

            dispatch(changeCurrentSongAction(song))
            dispatch(changePlaySongListAction(newPlaySongList))
            dispatch(changePlaySongIndexAction(newPlaySongList.length - 1))
        })
    } else {
        const song = playSongList[findIndex]
        dispatch(changeCurrentSongAction(song))
        dispatch(changePlaySongIndexAction(findIndex))
    }

    /* 获取歌词数据 */
    getSongLyric(id).then(res => {
        const lyricString = res.data.lrc.lyric
        // console.log(lyricString);
        /* 对拿到的歌词进行解析 */
        const lyric = parseLyric(lyricString)
        dispatch(changeLyricsAction(lyric))
    })
})

export const changeMusicAction = createAsyncThunk<
    void,
    boolean,
    IThunkState
>('changemusic', (isNext, { dispatch, getState }) => {
    const player = getState().player
    const playMode = player.playMode
    const songIndex = player.playSongIndex
    const songList = player.playSongList

    let newIndex = songIndex
    if (playMode === 1) {
        // 随机播放
        newIndex = Math.floor(Math.random() * songList.length)
    }
    else {
        newIndex = isNext ? songIndex + 1 : songIndex - 1
        // 下一首
        if (newIndex > songList.length - 1) newIndex = 0
        // 上一首
        if (newIndex < 0) newIndex = songList.length - 1
    }
    /* 拿到目前的歌曲，更改下标 */
    const song = songList[newIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(newIndex))

    /* 获取新歌曲的歌词 */
    getSongLyric(song.id).then(res => {
        const lyricString = res.data.lrc.lyric
        const lyrics = parseLyric(lyricString)
        dispatch(changeLyricsAction(lyrics))
        console.log(lyrics);

    })

})

interface IPlayerState {
    currentSong: any
    lyrics: ILyric[]
    lyricIndex: number
    playSongList: any[]
    playSongIndex: number
    playMode: number
}

const initialState: IPlayerState = {
    /* 歌曲详情 */
    currentSong: {},
    /* 歌词 */
    lyrics: [],
    /* 当前歌词下标 */
    lyricIndex: -1,
    /* 歌曲详情列表 */
    playSongList: [],
    /* 当前歌曲下标 */
    playSongIndex: -1,
    /* 0:顺序播放 1:随机播放 2:单曲循环 */
    playMode: 0
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        changeCurrentSongAction(state, { payload }) {
            state.currentSong = payload
        },
        changeLyricsAction(state, { payload }) {
            state.lyrics = payload
        },
        changeLyricIndexAction(state, { payload }) {
            state.lyricIndex = payload
        },
        changePlaySongIndexAction(state, { payload }) {
            state.playSongIndex = payload
        },
        changePlaySongListAction(state, { payload }) {
            state.playSongList = payload
        },
        changePlayModeAction(state, { payload }) {
            state.playMode = payload
        }
    }
})

export const {
    changeCurrentSongAction,
    changeLyricsAction,
    changeLyricIndexAction,
    changePlaySongIndexAction,
    changePlaySongListAction,
    changePlayModeAction
} = playerSlice.actions
export default playerSlice.reducer