import React, { Component } from 'react';
import { Carousel, WingBlank } from 'antd-mobile';

class Swiper extends React.Component {
    state = {
        data: ['54', '52'],
        imgHeight: 176,
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: ['54', '52'],
            });
        }, 1000);
    }
    render() {
        return (
            <WingBlank>
                <Carousel
                    autoplay={true}
                    infinite
                    style={{touchAction:'none'}}
                    // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    // afterChange={index => console.log('slide to', index)}
                >
                    {this.state.data.map(val => (
                        <a
                            key={val}
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={` https://img.dnfcity.qq.com/goodsImages/xiaocx/${'bann' + val}.jpg`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
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