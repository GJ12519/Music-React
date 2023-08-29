import React, { FC, memo } from 'react'

import { SingerWrapper } from './style'
import AreaHeaderV2 from '@/components/area-header-v2'
import { getImageSize } from '@/utils/format'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SettltSinger: FC = memo(() => {
    const navigate = useNavigate()

    const { settleSingers } = useAppSelector((state) => ({
        settleSingers: state.recommend.settleSingers
    }), shallowEqual)

    function ToSongsDetail() {
        navigate('/discover/artists')
    }

    return (
        <SingerWrapper>
            <AreaHeaderV2 title='入驻歌手' moreLink='/discover/artist' moreText='查看全部 &gt;' />
            <div className="artists">
                {settleSingers.map((item) => {
                    return (
                        <div onClick={ToSongsDetail} className="item" key={item.id}>
                            <img src={getImageSize(item.picUrl, 80)} alt="" />
                            <div className="info">
                                <div className="name">{item.name}</div>
                                <div className="alia">{item.alias.join(' ')}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="apply-for">
                <a href="https://music.163.com/st/musician">申请成为网易音乐人</a>
            </div>
        </SingerWrapper>
    )
})

export default SettltSinger