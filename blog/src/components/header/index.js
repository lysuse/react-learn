import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const navs = [
  {path:'/', title: '首页'},
  {path: '/technology', title: '技术笔记'},
  {path: '/lifeNote', title: '生活随笔'},
  {path: '/about', title: '关于'},
  {path: '/tags', title: '标签'}
]

const Header = ({ user }) => (
  <div className='header'>
    <div className="header-content page-content">
      <h2>YoungForward</h2>
      <div className="navs">
        {navs.map((nav, index) =>
          <NavLink key={'nav_'+index}
                exact={nav.path === '/'}
                to={nav.path}
                activeClassName='active'> {nav.title} </NavLink>
        )}
      </div>
      <div className="user">
        <NavLink to='/admin'
                activeClassName='active'> {user && user.username ? user.username : 'YoungStream'} </NavLink>
        <ul className="menus">
          <li>
            <NavLink to='/admin'
                    activeClassName='active'> 个人资料 </NavLink>
          </li>
          <li><NavLink to='/admin'
                  activeClassName='active'> 栏目管理 </NavLink>
          </li>
          <li><NavLink to='/admin'
                  activeClassName='active'> 文章管理 </NavLink>
          </li>
          <li><NavLink to='/admin'
                  activeClassName='active'> 标签管理 </NavLink></li>
        </ul>
      </div>
    </div>
  </div>
)

export default Header
