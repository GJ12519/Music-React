import React, { FC, memo } from 'react'
import PropTypes from 'prop-types'
import { getImageSize } from '@/utils/format'


import { AlbumWrapper } from './style'

interface IProps {
    itemData: any
}

const NewAlbumItem: FC<IProps> = memo((props) => {
    const { itemData } = props
    return (
        <AlbumWrapper>
            <div className="top">
                <img src={getImageSize(itemData.picUrl, 100)} alt="" />
                <a href="" className="cover sprite_cover"></a>
            </div>
            <div className="bottom">
                <div className="name">{itemData.name}</div>
                <div className="artist">{itemData.artist.name}</div>
            </div>
        </AlbumWrapper>
    )
})

NewAlbumItem.propTypes = {
    itemData: PropTypes.any
}

export default NewAlbumItem