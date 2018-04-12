import React, { Component } from 'react'
import './banner.scss'
export default class BlogBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
      banners: [
        {
          img: 'https://picjumbo.com/wp-content/uploads/aerial-and-symmetric-view-of-a-road-in-the-woods_free_stock_photos_picjumbo_DCIM100MEDIADJI_0044.JPG-1080x720.jpg',
          title: '这是滚图标题1'
        },
        {
          img: 'https://picjumbo.com/wp-content/uploads/young-woman-enjoying-beautiful-scenery-of-lago-di-braies-italy_free_stock_photos_picjumbo_DSC02235-1570x1047.jpg',
          title: '这是滚图标题2'
        },
        {
          img: 'https://picjumbo.com/wp-content/uploads/office-building-skyscrapers-with-room-for-text_free_stock_photos_picjumbo_DSC01136-1080x720.jpg',
          title: '这是滚图标题3'
        },
        {
          img: 'https://picjumbo.com/wp-content/uploads/poppy-seed-field-on-sunset_free_stock_photos_picjumbo_DSC00051-1080x720.jpg',
          title: '这是滚图标题4'
        },
      ]
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
      this.switchActiveIndex((this.state.activeIndex + 1) % this.state.banners.length)
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
          {this.state.banners.map((banner, index) => (
            <div key={index} className={'banner-item ' + (this.state.activeIndex === index ? '' : 'fade')} style={{display: this.state.activeIndex === index ? 'block' : 'none'}}>
              <img src={banner.img} alt={banner.title}/>
              <h2>
                <a href="">{banner.title}</a>
              </h2>
            </div>
          ))}
          <div className="indicators">
          {this.state.banners.map((banner, index) => (
            <span key={'indicator_'+index} onClick={() => {this.switchActiveIndex(index)}} className={this.state.activeIndex === index ? 'active' : ''}></span>
          ))}
          </div>
        </div>
        <div className="blog-sign">
          <div className="content">
            <p>
              从个体的角度来看，能够在一开始就不进入这样的困境，是一个很难做到的聪明选择。
            </p>
            <p className="author">--- 李翔</p>
            <span className="book-tag"></span>
          </div>
        </div>
      </div>
    )
  }
}
