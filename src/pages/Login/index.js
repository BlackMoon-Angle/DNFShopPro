import React, { Component } from 'react';
//导航栏组件
import { NavBar, Icon } from 'antd-mobile';
class Login extends Component {
    render() {
        return (
            <div className="login_box">
                {/* 导航头 */}
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.push('/user') }}
                    rightContent={[
                        <div key="0" onClick={() => { this.props.history.push('/register') }}>注册</div>
                    ]}
                >登录</NavBar>
                <div></div>
            </div>
        )
    }
}

export default Login;