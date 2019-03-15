import React from 'react'
import './index.scss'

const About = props => {
  return (
    <div className="about-younsgtream">
      <h2>关于我</h2>
      <p>
        我是一个软件开发人员； 专职前端，擅长Vue技术栈和React技术栈，也做过Java(了解Spring Boot、Spring Cloud)，
        对软件架构比较感兴趣，一直保持着对技术的高度热情；对新技术保持高度关注。
      </p>
      <h2>联系我</h2>
      <p>
        <span className="contact-item">邮箱: </span><a href="mailto:ly1216045316@126.com">ly1216045316@126.com</a>
      </p>
      <p>
        <span className="contact-item">Github: </span><a href="https://github.com/lysuse/" target="_blank">https://github.com/lysuse</a>
      </p>
      <p>
        <span className="contact-item">微博: </span><a href="https://weibo.com/3122190364" target="_blank">youngStream</a>
      </p>
      <p>
        <span className="contact-item">微信: </span><img width={120} src="https://raw.githubusercontent.com/lysuse/open_images/master/weixin.jpg" alt="YoungStreamForward" />
      </p>
    </div>
  )
}

export default About
