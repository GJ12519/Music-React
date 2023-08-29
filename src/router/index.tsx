import React from 'react'
import { RouteObject, Navigate } from 'react-router-dom'
const Discover = React.lazy(() => import('@/views/discover'))
const Mine = React.lazy(() => import('@/views/mine'))
const Focus = React.lazy(() => import('@/views/focus'))
const Download = React.lazy(() => import('@/views/download'))
const Recommend = React.lazy(() => import('@/views/discover/c-views/recommend'))
const Album = React.lazy(() => import('@/views/discover/c-views/album'))
const Artist = React.lazy(() => import('@/views/discover/c-views/artist'))
const Ranking = React.lazy(() => import('@/views/discover/c-views/ranking'))
const Songs = React.lazy(() => import('@/views/discover/c-views/songs'))
const Djradio = React.lazy(() => import('@/views/discover/c-views/djradio'))

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to="/discover" />
    },
    {
        path: '/discover',
        element: <Discover />,
        children: [
            {
                path: '/discover',
                element: <Navigate to="/discover/recommend" />
            },
            {
                path: '/discover/recommend',
                element: <Recommend />
            }, {
                path: '/discover/songs',
                element: <Songs />
            }, {
                path: '/discover/album',
                element: <Album />
            }, {
                path: '/discover/artist',
                element: <Artist />
            }, {
                path: '/discover/ranking',
                element: <Ranking />
            },
            {
                path: '/discover/djradio',
                element: <Djradio />
            },
        ]
    },
    {
        path: '/mine',
        element: <Mine />
    },
    {
        path: '/focus',
        element: <Focus />
    }, {
        path: '/download',
        element: <Download />
    },
]

export default routes