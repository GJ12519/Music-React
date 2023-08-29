import React, { FC, memo } from 'react'

import { FooterWrapper } from './style'
// import classnames from 'classnames'

const AppFooter: FC = memo(() => {
    return (
        <FooterWrapper>
            <div className='content'>
                <div className='all'>
                </div>
            </div>
        </FooterWrapper>
    )
})

export default AppFooter