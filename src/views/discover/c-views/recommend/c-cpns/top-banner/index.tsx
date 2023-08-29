import { useAppSelector } from '@/store'
import React, { FC, memo, useState, useRef, ElementRef } from 'react'
import { Carousel } from 'antd'
import classNames from 'classnames'

import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from './style'
import { shallowEqual } from 'react-redux'

const TopBanner: FC = memo(() => {

    /** 定义内部的数据 */
    const [currentIndex, setCurrentIndex] = useState(0)
    const bannerRef = useRef<ElementRef<typeof Carousel>>(null)

    /* 获取数据 */
    const { banners } = useAppSelector(
        (state) => ({
            banners: state.recommend.banners
        }), shallowEqual
    )
    /** 事件处理函数 */
    function handleBeforeChange() {
        // setCurrentIndex(-1)
    }
    function handleAfterChange(current: number) {
        setCurrentIndex(current)
    }

    function handlePrevClick() {
        bannerRef.current?.prev()
    }
    function handleNextClick() {
        bannerRef.current?.next()
    }

    /** 获取背景图片 */
    let bgImageUrl
    if (currentIndex >= 0 && banners.length > 0) {
        bgImageUrl = banners[currentIndex].imageUrl + '?imageView&blur=40x20'
    }

    return (
        <BannerWrapper
            style={{
                background: `url('${bgImageUrl}') center center / 6000px`
            }}
        >
            <div className='banner wrap-v2'>
                <BannerLeft>
                    <Carousel
                        autoplay
                        dots={false}
                        autoplaySpeed={3500}
                        effect="fade"
                        ref={bannerRef}
                        beforeChange={handleBeforeChange}
                        afterChange={handleAfterChange}
                    >
                        {banners?.map(item => {
                            return (
                                <div className='banner-item' key={item.imageUrl}>
                                    <img className='image' src={item.imageUrl} alt={item.typeTitle} />
                                </div>
                            )
                        })}
                    </Carousel>
                    <ul className='dots'>
                        {banners.map((item, index) => {
                            return (
                                <li key={item.imageUrl}>
                                    <span className={classNames('item', { active: index === currentIndex })}></span>
                                </li>
                            )
                        })}
                    </ul>
                </BannerLeft>
                <BannerRight />
                <BannerControl>
                    <button className="btn left" onClick={handlePrevClick}></button>
                    <button className="btn right" onClick={handleNextClick}></button>
                </BannerControl>
            </div>
        </BannerWrapper>
    )
})

export default TopBanner