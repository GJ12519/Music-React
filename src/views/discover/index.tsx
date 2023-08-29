import React, { FC, memo, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import NavBar from './c-cpns/nav-bar'

const Discover: FC = memo(() => {
    return (
        <div>
            <NavBar />
            <Suspense fallback="loding...">
                <Outlet />
            </Suspense>
        </div>
    )
})

export default Discover