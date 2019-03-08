import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminLeft = props => {
  const { menus, menuCodes } = props;
  return (
    <div className="left-menus">
      <ul>
        {menus.map((menu, index) => (
          <li key={index}>
            <NavLink activeClassName='active' to={`/admin/${menuCodes[index]}`}>{menu}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminLeft;