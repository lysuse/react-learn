import React, { Component } from 'react'
import './banner.scss'
export default class BlogBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  switchActiveIndex(index) {
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.setState({
      activeIndex: index
    })
    setTimeout(()=>{
      this.startTimer()
    },100)
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.switchActiveIndex((this.state.activeIndex + 1) % this.props.banners.length)
    }, 3000)
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
  render() {
    return (
      <div className="blog-banner">
        <div className="banner-list">
          {this.props.banners.map((banner, index) => (
            <div key={index} className={'banner-item ' + (this.state.activeIndex === index ? '' : 'fade')} style={{display: this.state.activeIndex === index ? 'block' : 'none'}}>
              <img src={banner.imageUrl} alt={banner.title}/>
              <h2>
                <a href={banner.targetUrl} target={banner.newPage ? '_blank' : ''}>{banner.title}</a>
              </h2>
            </div>
          ))}
          <div className="indicators">
          {this.props.banners.map((banner, index) => (
            <span key={'indicator_'+index} onClick={() => {this.switchActiveIndex(index)}} className={this.state.activeIndex === index ? 'active' : ''}></span>
          ))}
          </div>
        </div>
        <div className="blog-sign">
          <div className="content">
            <p className="sign-content">
              {this.props.quote.content}
            </p>
            <p className="author">--- {this.props.quote.author}</p>
            <span className="book-tag"></span>
          </div>
        </div>
      </div>
    )
  }
}
