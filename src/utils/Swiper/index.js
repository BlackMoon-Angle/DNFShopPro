import React, { Component } from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
class Swiper extends React.Component {
  render() {
    return (
      <WingBlank>
        <Carousel
          autoplay={this.props.data.swiper_img.length ? true : false}
          infinite
          style={{ touchAction: 'none' }}
        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        // afterChange={index => console.log('slide to', index)}
        >
          {this.props.data.swiper_img.map((val, index) => (
            <a
              key={index}
              style={{ display: 'inline-block', width: '100%', height: this.props.data.swiperImg_height }}
            >
              <img
                src={val}
                alt=""
                style={{ width: '100%', verticalAlign: 'top', height: '100%' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: this.props.data.swiperImg_height });
                }}
              />
            </a>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}

export default Swiper;