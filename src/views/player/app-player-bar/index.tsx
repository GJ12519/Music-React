import React, { FC, memo, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Slider, message } from 'antd'

import { PlayerBarWrapper, BarControl, BarPlayerInfo, BarOperator } from './style'
import { useAppDispatch, useAppSelector } from '@/store'
import { getImageSize, formatTime } from '@/utils/format'
import { shallowEqual } from 'react-redux'
import { getSongPlayUrl } from '@/utils/handle-player'
import {
    changeMusicAction,
    changeLyricIndexAction,
    changePlayModeAction
} from '../store/player'

const AppPlayerBar: FC = memo(() => {

    /** 组件内部定义的数据 */
    const [isPlaying, setIsPlaying] = useState(false)  /* 播放状态 */
    const [progress, setProgress] = useState(0)         /* 播放进度占比 */
    const [duration, setDuration] = useState(0)         /* 歌曲的总时长 */
    const [currentTime, setCurrentTime] = useState(0)   /* 播放的进度时长 */
    const [isSliding, setIsSliding] = useState(false)   /* 拖拽状态还是点击状态 */
    const audioRef = useRef<HTMLAudioElement>(null)       /* audio的实例 */

    /* 发送网络请求 */
    const dispatch = useAppDispatch()

    /* 拿数据 */
    const { currentSong, lyrics, lyricIndex, playMode } = useAppSelector(state => ({
        currentSong: state.player.currentSong,
        lyrics: state.player.lyrics,
        lyricIndex: state.player.lyricIndex,
        playMode: state.player.playMode
    }), shallowEqual)

    /** 组件内的副作用操作 */
    useEffect(() => {
        // 1.播放音乐
        audioRef.current!.src = getSongPlayUrl(currentSong.id)
        audioRef.current
            ?.play()
            .then(() => {
                setIsPlaying(true)
                console.log('歌曲播放成功')
            })
            .catch((err) => {
                setIsPlaying(false)
                console.log('歌曲播放失败:', err)
            })

        // // 2.获取音乐的总时长
        setDuration(currentSong.dt)
    }, [currentSong])

    /** 组件内部的事件处理 */
    function handlePlayBtnClick() {
        // 1.控制播放器的播放/暂停
        isPlaying ?
            audioRef.current?.pause() :
            audioRef.current?.play().
                catch(() => setIsPlaying(false))

        // 2.改变isPlaying的状态
        setIsPlaying(!isPlaying)
        // console.log('播放状态', isPlaying);
    }

    /* 上一首下一首 */
    function handleChangeMusic(isNext = true) {
        dispatch(changeMusicAction(isNext))
    }

    /* 播放顺序切换 */
    function handleChangePlayMode() {
        let newPlayMode = playMode + 1
        if (newPlayMode > 2) newPlayMode = 0
        dispatch(changePlayModeAction(newPlayMode))
      }

    // 播放结束
    function handleTimeEnded() {
        if (playMode === 2) {
            audioRef.current!.currentTime = 0
            audioRef.current?.play()
        } else {
            handleChangeMusic(true)
        }
    }

    /* 进度条 */
    function handleTimeUpdate() {
        /* 当前的播放时间 */
        // 1.获取当前的播放时间
        const currentTime = audioRef.current!.currentTime * 1000

        // 2.计算当前歌曲进度
        if (!isSliding) {
            const progress = (currentTime / duration) * 100
            setProgress(progress)
            setCurrentTime(currentTime)
        }
        // 3.根据当前时间获取当前的歌词        
        let index = lyrics.length - 1;
        for (let i = 0; i < lyrics.length; i++) {
            const lyric = lyrics[i]
            if (lyric.time > currentTime) {
                index = i - 1
                break;
            }
        }
        // 4.匹配上对应的歌词的index
        if (lyricIndex === index || index === -1) return
        dispatch(changeLyricIndexAction(index))

        // 5.展示对应的歌词
        message.open({
            content: lyrics[index].text,
            key: 'lyric',
            duration: 0
        })
    }

    /* 点击更改进度条位置 */
    function handleSliderChanged(value: number) {
        // 1.获取点击位置的时间
        const currentTime = (value / 100) * duration

        // 2.设置当前播放的时间
        audioRef.current!.currentTime = currentTime / 1000

        setCurrentTime(currentTime)
        setProgress(value)
        setIsSliding(false)
    }

    /* 拖拽更改进度条 */
    function handleSliderChanging(value: number) {
        // 目前是处于拖拽状态
        setIsSliding(true)

        // 设置progress
        setProgress(value)

        // 获取value对应位置的时间
        const currentTime = (value / 100) * duration
        setCurrentTime(currentTime)
    }

    return (
        <PlayerBarWrapper className="sprite_playbar">
            <div className='content wrap-v2'>
                <BarControl isPlaying={isPlaying}>
                    <button
                        className="btn sprite_playbar prev"
                        onClick={() => handleChangeMusic(false)}
                    ></button>
                    <button
                        className="btn sprite_playbar play"
                        onClick={handlePlayBtnClick}
                    ></button>
                    <button
                        className="btn sprite_playbar next"
                        onClick={() => handleChangeMusic()}
                    ></button>
                </BarControl>
                <BarPlayerInfo>
                    <Link to={"/player"}>
                        <img className='image'
                            src={currentSong?.al?.picUrl ? getImageSize(currentSong?.al?.picUrl, 50) : 'https://s4.music.126.net/style/web2/img/default/default_album.jpg'}
                            alt=""
                        />
                    </Link>
                    <div className='info'>
                        <div className='song'>
                            <span className='song-name'>{currentSong?.name}</span>
                            <span className='singer-name'>{currentSong?.ar?.name}</span>
                        </div>
                        <div className='progress'>
                            <Slider
                                step={0.5}
                                value={progress}
                                tooltip={{ formatter: null }}
                                onChange={handleSliderChanging}
                                onAfterChange={handleSliderChanged}
                            />
                            <div className='time'>
                                <span className='current'>{formatTime(currentTime)}</span>
                                <span className='divider'>/</span>
                                <span className='duration'>{formatTime(duration)}</span>
                            </div>
                        </div>
                    </div>
                </BarPlayerInfo>
                <BarOperator playMode={playMode}>
                    <div className='left'>
                        <button className="btn pip"></button>
                        <button className="btn sprite_playbar favor"></button>
                        <button className="btn sprite_playbar share"></button>
                    </div>
                    <div className='right sprite_playbar'>
                        <button className="btn sprite_playbar volume"></button>
                        <button
                            className="btn sprite_playbar loop"
                        onClick={handleChangePlayMode}
                        ></button>
                        <button className="btn sprite_playbar playlist"></button>
                    </div>
                </BarOperator>
            </div>
            <audio
                ref={audioRef}
                /* 目前播放位置更改触发 */
                onTimeUpdate={handleTimeUpdate}
                /* 结束时触发 */
                onEnded={handleTimeEnded}
            />
        </PlayerBarWrapper>
    )
})

export default AppPlayerBar