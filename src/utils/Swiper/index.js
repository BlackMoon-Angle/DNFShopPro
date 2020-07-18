import React, { Component } from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
class Swiper extends React.Component {
  state = {
    data: [],//父组件传来的值——轮播图需要的图片
    imgHeight: ''//父组件传来的值——轮播图的高度
  }
  componentWillMount(){
    // console.log(this.props.data)
    this.setState({
      data: this.props.data.swiper_img,
      imgHeight: this.props.data.swiperImg_height
    });
  }
  componentDidMount() {
    // simulate img loading
    // setTimeout(() => {
    //   this.setState({
    //     data: this.props.data.swiper_img,
    //     imgHeight: this.props.data.swiperImg_height
    //   });
    // }, 100);
    // console.log(this.props.data)
    // this.setState({
    //   data: this.props.data.swiper_img,
    //   imgHeight: this.props.data.swiperImg_height
    // });
  }
  render() {
    return (
      <WingBlank>
        <Carousel
          autoplay={true}
          infinite
          style={{ touchAction: 'none' }}
        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        // afterChange={index => console.log('slide to', index)}
        >
          {this.state.data.map(val => (
            <a
              key={val}
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={val}
                alt=""
                style={{ width: '100%', verticalAlign: 'top', height: '100%' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
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