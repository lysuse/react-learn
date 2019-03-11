import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = ({ user, config, sections = [], activePath }) => {
  const navs = [
    { path: '/', title: '首页' },
    ...sections,
    { path: '/about', title: '关于' }
  ]

  return (
    <div className='header'>
      <div className="header-content page-content">
        <h2>YoungStream</h2>
        <div className="navs">
          {navs.map((nav, index) =>
            <NavLink key={'nav_' + index}
              exact={nav.path === '/'}
              to={nav.path}
              className={(nav.path !== '/' && activePath.indexOf(nav.path) > -1) ? 'active' : ''}
              activeClassName='active'> {nav.title} </NavLink>
          )}
        </div>
        <div className="user">
          <NavLink to={(user && user.logged) ? '/admin' : '/login'}
            activeClassName='active'> {(user && user.logged) ? 'YoungStream' : '登录'} </NavLink>
          <ul className="menus">
            {(user && user.logged) && config.menuCodes.map((menuCode, index) => (
              <li key={'head_menu_' + menuCode}>
                <NavLink to={`/admin/${menuCode}`} activeClassName='active'> {config.menus[index]} </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
