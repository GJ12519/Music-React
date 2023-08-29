import React, { FC, memo, useRef, ElementRef } from 'react'
import { Carousel } from 'antd'

import { AlbumWrapper } from './style'
import NewAlbumItem from '@/components/new-album-item'
import AreaHeaderV1 from '@/components/area-header-v1'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'

const NewAlbum: FC = memo(() => {
    /* 内部数据 */
    const bannerRef = useRef<ElementRef<typeof Carousel>>(null)
    /* 获取store的数据 */
    const { newalbums } = useAppSelector((state) => ({
        newalbums: state.recommend.newalbums
    }),shallowEqual)

    function handlePrevClick() {
        bannerRef.current?.prev()
    }

    function handleNextClick() {
        // console.log(bannerRef.current);
        bannerRef.current?.next()
    }

    return (
        <AlbumWrapper>
            <AreaHeaderV1 title="新碟上架" moreLink="/discover/album" />
            <div className='content'>
                <button className='sprite_02 arrow arrow-left' onClick={handlePrevClick}></button>
                <div className='banner'>
                    <Carousel
                        ref={bannerRef}
                        dots={false}
                        speed={1500}
                    >
                        {
                            [0, 1].map(item => {
                                return <div key={item}>
                                    <div className="album-list">
                                        {newalbums.slice(item * 5, (item + 1) * 5).map((album) => {
                                            return <NewAlbumItem key={album.id} itemData={album} />
                                        })}
                                    </div>
                                </div>
                            })
                        }
                    </Carousel>
                </div>
                <button className='sprite_02 arrow arrow-right' onClick={handleNextClick}></button>
            </div>
        </AlbumWrapper>
    )
})

export default NewAlbum