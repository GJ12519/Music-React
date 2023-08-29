import React, { FC, memo } from 'react'
import { NavWrapper } from './style'
import { NavLink } from 'react-router-dom'

import { discoverMenu } from '@/assets/data/local_data'

const NavBar: FC = memo(() => {
    return (
        <NavWrapper>
            <div className='nav wrap-v1'>
                {
                    discoverMenu.map(item => {
                        return (
                            <div className='item' key={item.link}>
                                <NavLink to={item.link}>{item.title}</NavLink>
                            </div>
                        )
                    })
                }
            </div>
        </NavWrapper>
    )
})

export default NavBar