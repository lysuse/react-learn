import React from 'react'
import { NavLink } from 'react-router-dom'
import './sider.scss'

const SectionSider = ({ sections, title }) => (
  <div className="section-sider">
    <h2>{title}</h2>
    <div className="section-list">
      {sections.map((section, index) =>
        <NavLink key={'sider_'+index}
          to={`/article/${section.rootSectionId}/${section.secondSectionId}/${section.id}`}
          activeClassName='active'>
          <span className="content" title={section.title}><i className={'rank-' + index}>{index + 1}</i>{section.title}</span>
          <span className="right">{section.createDate}</span>
         </NavLink>
      )}
      {sections.length <= 0 && <div className="no-data">暂无相关文章</div>}
    </div>
  </div>
)
export default SectionSider
