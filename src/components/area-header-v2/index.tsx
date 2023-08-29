import React, { FC, memo } from 'react'
import PropTypes from 'prop-types'

import { HeaderV2Wrapper } from './style'

interface IProps {
    title?: string,
    moreText?: string,
    moreLink?: string
}

const AreaHeaderV2: FC<IProps> = memo((props) => {
    const { title = '默认标题', moreLink, moreText } = props
    return (
        <HeaderV2Wrapper>
            <h3 className='title'>{title}</h3>
            {moreText && moreLink && <a href={moreLink}>{moreText}</a>}
        </HeaderV2Wrapper>
    )
})

AreaHeaderV2.propTypes = {
    title:PropTypes.string,
    moreLink:PropTypes.string,
    moreText:PropTypes.string
}

export default AreaHeaderV2