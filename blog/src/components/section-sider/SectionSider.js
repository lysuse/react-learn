import React from 'react'
import { NavLink } from 'react-router-dom'

export default const SectionSider = ({ sections }) => (
  <div className="section-sider">
    {sections.map((section, index) =>
      <NavLink key={section.id}
            to={`/article/${section.pId}/${section.id}`}
            activeClassName='active'
            onlyActiveOnIndex={true}> {section.name} </NavLink>
    )}
  </div>
)
