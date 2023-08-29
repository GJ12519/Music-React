import React, { FC, memo } from 'react'
import { useAppSelector } from '@/store'

import { HotRecommendWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { shallowEqual } from 'react-redux'
import SongMenuItem from '@/components/song-menu-item'

const HotRecommend: FC = memo(() => {
    const { hotRecommends } = useAppSelector((state) => ({
        hotRecommends: state.recommend.hotrecommends
    }), shallowEqual)
    return (
        <HotRecommendWrapper>
            <AreaHeaderV1
                title="热门推荐"
                keywords={['华语', '流行', '摇滚', '民谣', '电子']}
                moreLink="/discover/songs"
            />
            <div className="recommend-list">
                {
                    hotRecommends.map((item) => {
                        return <SongMenuItem key={item.id} itemData={item} />
                    })
                }
            </div>
        </HotRecommendWrapper>
    )
})

export default HotRecommend