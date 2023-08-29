import { useAppDispatch } from '@/store'
import React, { FC, memo, useEffect } from 'react'

import { fetchBannerDataActions,fetchRankingDataAction } from './store/recommend'
import TopBanner from "./c-cpns/top-banner"
import { RecommendWrapper } from './style'
import HotRecommend from './c-cpns/hot-recommend'
import NewAlbum from './c-cpns/new-album'
import TopRanking from './c-cpns/top-ranking'
import UserLogin from './c-cpns/user-login'
import SettleSinger from './c-cpns/settle-singer'
import HotAnchor from './c-cpns/hot-anchor'

const Recommend: FC = memo(() => {

    /* 发送网络请求 */
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchBannerDataActions())
        dispatch(fetchRankingDataAction())
    }, [dispatch])

    return (
        <RecommendWrapper>
            <TopBanner />
            <div className='content wrap-v2'>
                <div className='left'>
                    <HotRecommend />
                    <NewAlbum />
                    <TopRanking />
                </div>
                <div className='right'>
                    <UserLogin />
                    <SettleSinger />
                    <HotAnchor />
                </div>
            </div>
        </RecommendWrapper>
    )
})

export default Recommend    