import React, { Component } from 'react';
//导航栏组件
import { NavBar, Icon } from 'antd-mobile';
//表单组件
import { List, InputItem } from 'antd-mobile';
//表单事件接口
import { login } from '../../api/UserApi'
//对话框组件
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
const alert = Modal.alert;

let LoginInfo = {
    getData() {
        //获取数据
        let list = localStorage.getItem("LoginToken");
        if (list) {
            return JSON.parse(list);
        } else {
            return [];
        }
    },
    setData(data) {
        //保存数据
        localStorage.setItem("LoginToken", JSON.stringify(data));
    }
};
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
        this.loginBtn = this.loginBtn.bind(this)
    }
    //登录
    async loginBtn() {
        let username = this.state.username
        let password = this.state.password
        if (username != '' && password != '') {
            const data = await login(username, password)
            //返回数据判断返回的flag的布尔值
            if (data.flag) {
                //将返回的token保存到前端
                LoginInfo.setData(data.data.token)
                alert('登录提示', <div>登录成功！</div>, [
                    { text: '确定', onPress: () => this.props.history.push('/home') },
                ])
            }
            else {
                alert('登录提示', <div>登录失败,用户名或密码错误！</div>, [
                    { text: '确定', onPress: () => this.setState({ username: '', password: '' }) },
                ])
            }
        }
        else {
            alert('登录提示', <div>用户名或密码为空</div>, [
                { text: '确定' },
            ])
        }
    }
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
                {/* 表单 */}
                <List renderHeader={() => ''}>
                    <InputItem
                        clear
                        placeholder="请输入用户名"
                        value={this.state.username}
                        onChange={(val) => { this.setState({ username: val }) }}
                    >用户名</InputItem>
                    <InputItem
                        clear
                        placeholder="请输入密码"
                        type={'password'}
                        value={this.state.password}
                        onChange={(val) => { this.setState({ password: val }) }}
                    >密码</InputItem>
                    <List.Item>
                        <div
                            style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                            onClick={this.loginBtn}
                        >登录</div>
                    </List.Item>
                    <List.Item>
                        <div
                            style={{ width: '100%', color: '#108ee9', textAlign: 'right' }}
                            onClick={() => { this.props.history.push('/modify') }}
                        >修改密码</div>
                    </List.Item>
                </List>
            </div>
        )
    }
}

export default Login;