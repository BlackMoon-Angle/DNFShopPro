import React, { Component } from 'react';
//导航栏组件
import { NavBar, Icon } from 'antd-mobile';
//表单组件
import { List, InputItem } from 'antd-mobile';
//表单事件接口
import { register } from '../../api/UserApi'
//对话框组件
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
const alert = Modal.alert;
class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
        this.registerBtn = this.registerBtn.bind(this)
    }
    async registerBtn() {
        let uPattern = /^[a-zA-Z0-9]{4,16}$/;
        let username = this.state.username
        let password = this.state.password
        if (username != '' && password != '') {
            if (uPattern.test(username) && uPattern.test(password)) {
                const data = await register(username, password)
                if (data.flag) {
                    alert('注册提示', <div>注册成功！</div>, [
                        { text: '确定', onPress: () => this.props.history.push('/login') },
                    ])
                }
                else {
                    alert('注册提示', <div>注册失败，用户名已存在！</div>, [
                        { text: '确定', onPress: () => this.setState({ password: '' }) },
                    ])
                }
            } else {
                alert('注册提示', <div>用户名或密码输入格式不正确！</div>, [
                    { text: '确定', onPress: () => this.setState({ username: '', password: '' }) },
                ])
            }
        }
        else {
            alert('注册提示', <div>用户名或密码不能为空！</div>, [
                { text: '确定' },
            ])
        }
    }
    render() {
        return (
            <div className="register_box">
                {/* 导航头 */}
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.push('/login') }}
                >注册</NavBar>
                {/* 表单 */}
                <List renderHeader={() => ''}>
                    <InputItem
                        clear
                        placeholder="4到16位(字母,数字）"
                        value={this.state.username}
                        onChange={(val) => { this.setState({ username: val }) }}
                    >用户名</InputItem>
                    <InputItem
                        clear
                        placeholder="4到16位(字母,数字）"
                        value={this.state.password}
                        type={'password'}
                        onChange={(val) => { this.setState({ password: val }) }}
                    >密码</InputItem>
                    <List.Item>
                        <div
                            style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                            onClick={this.registerBtn}
                        >注册</div>
                    </List.Item>
                </List>
            </div>
        )
    }
}

export default Register;