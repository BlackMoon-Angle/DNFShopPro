import React, { Component } from 'react';
//导航栏组件
import { NavBar, Icon } from 'antd-mobile';
class Register extends Component {
    render() {
        return (
            <div className="register_box">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.push('/login') }}
                >注册</NavBar>
            </div>
        )
    }
}

export default Register;