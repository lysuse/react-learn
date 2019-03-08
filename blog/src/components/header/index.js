import React from 'react'
import { NavLink } from 'react-router-dom'

const navs = [
  {path:'/', title: '首页'},
  {path: '/articles/technology', title: '技术笔记'},
  {path: '/articles/lifeNote', title: '生活随笔'},
  {path: '/about', title: '关于'}
]

const Header = ({ user, config }) => (
  <div className='header'>
    <div className="header-content page-content">
      <h2>YoungStream</h2>
      <div className="navs">
        {navs.map((nav, index) =>
          <NavLink key={'nav_'+index}
                exact={nav.path === '/'}
                to={nav.path}
                activeClassName='active'> {nav.title} </NavLink>
        )}
      </div>
      <div className="user">
        <NavLink to={(user && user.logged) ? '/admin' : '/login'}
                activeClassName='active'> {(user && user.logged) ? 'YoungStream' : '登录'} </NavLink>
        <ul className="menus">
          {config.menuCodes.map((menuCode, index) => (
            <li key={'head_menu_' + menuCode}>
              <NavLink to={`/admin/${menuCode}`} activeClassName='active'> {config.menus[index]} </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)

export default Header
