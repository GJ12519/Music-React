import React, { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { HeaderWrapper, HeaderLeft, HeaderRight } from './style'

import headerTitles from '@/assets/data/header_titles.json'

/* 导航展示逻辑 */
function showItem(item: any) {
    if (item.type === 'path') {
      return (
        <NavLink
          to={item.link}
          className={({ isActive }) => {
            return isActive ? 'active' : undefined
          }}
        >
          {item.title}
          {/* 小箭头 */}
          <i className="icon sprite_01"></i>
        </NavLink>
      )
    } else {
      return (
        <a href={item.link} rel="noreferrer" target="_blank">
          {item.title}
        </a>
      )
    }
  }


const AppHeader: FC = memo(() => {
    return (
        <HeaderWrapper>
            <div className="content wrap-V1">
                <HeaderLeft>
                    <a href="/" className='logo sprite_01'>网易云音乐</a>
                    <div className="title-list">
                        {headerTitles.map((item) => {
                            return (
                                <div className="item" key={item.title}>
                                    {showItem(item)}
                                </div>
                            )  
                        })}
                    </div>
                </HeaderLeft>
                <HeaderRight>
                    <Input
                        className="search"
                        placeholder="音乐/视频/电台/用户"
                        prefix={<SearchOutlined />}
                    />
                    <span className="center">创作者中心</span>
                    <span className="login">登录</span>
                </HeaderRight>
            </div>
            <div className="divider"></div>
        </HeaderWrapper>
    )
})

export default AppHeader