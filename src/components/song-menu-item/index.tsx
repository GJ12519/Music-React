import React, { FC, memo } from 'react'
import PropTypes from 'prop-types'

import { MenuItemWrapper } from './style'
import { formatCount, getImageSize } from '@/utils/format'

interface IProps {
    itemData: any
}

const SongMenuItem: FC<IProps> = memo((props) => {

    const { itemData } = props

    return (
        <MenuItemWrapper>
            <div className="top">
                <img src={getImageSize(itemData.picUrl, 140)} alt="" />
                <div className="cover sprite_cover">
                    <div className="info sprite_cover">
                        <span>
                            <i className="sprite_icon headset"></i>
                            <span className="count">{formatCount(itemData.playCount)}</span>
                        </span>
                        <i className="sprite_icon play"></i>
                    </div>
                </div>
            </div>
            <div className="bottom">{itemData.name}</div>
        </MenuItemWrapper>
    )
})

SongMenuItem.propTypes = {
    itemData: PropTypes.any
}

export default SongMenuItem