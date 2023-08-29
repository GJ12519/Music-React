import React, { FC, memo } from 'react'
import { RankingWrapper } from './style'
import { useAppSelector } from '@/store'

import AreaHeaderV1 from '@/components/area-header-v1'
import TopRankingItem from '@/components/top-ranking-item'
import { shallowEqual } from 'react-redux'

const TopRanking: FC = memo(() => {
    const { PlaylistDetail = [] } = useAppSelector((state) => ({
        PlaylistDetail: state.recommend.PlaylistDetail
    }),shallowEqual)
    return (
        <RankingWrapper>
            <AreaHeaderV1 title='榜单' moreLink="/discover/ranking" />
            <div className='content'>
                {
                    PlaylistDetail.map(item => {
                        return <TopRankingItem key={item.id} itemData={item} />
                    })
                }
            </div>
        </RankingWrapper>
    )
})

export default TopRanking