import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const Header = ({ navs, user }) => (
  <div className='header'>
    <div className="header-content page-content">
      <h2>测试</h2>
      <div className="navs">
        {navs.map((nav, index) =>
          <NavLink key={index}
                exact={true}
                to={nav.path}
                activeClassName='active'> {nav.title} </NavLink>
        )}
      </div>
      <div className="user">
        <NavLink to='/admin'
                activeClassName='active'> {user.username || 'YoungStream'} </NavLink>
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

Header.propTypes = {
  navs: PropTypes.array.isRequired
}

export default Header
