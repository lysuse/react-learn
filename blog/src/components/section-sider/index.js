import React from 'react'
import { NavLink } from 'react-router-dom'
import './sider.scss'

const SectionSider = ({ sections, title }) => (
  <div className="section-sider">
    <h2>{title}</h2>
    <div className="section-list">
      {sections.map((section, index) =>
        <NavLink key={'sider_'+index}
              to={`/article/${section.pId}/${section.id}`}
              activeClassName='active'
              onlyActiveOnIndex={true}>
              <i className={'rank-'+index}>{index + 1}</i>
              <span>{section.name}</span>
              <span className="right">{section.time}</span>
         </NavLink>
      )}
    </div>
  </div>
)
export default SectionSider
