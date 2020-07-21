import http from '../../utils/Http'

// 登录接口
export async function login(username, password) {
    return await http.get('/user/login', {
        username: username,
        password: password
    })
}

//注册接口
export async function register(username, password) {
    return await http.post('/user/register', {
        username: username,
        password: password
    })
}

//修改密码接口
export async function modify(username, password, new_password) {
    return await http.put('/user/modify', {
        username: username,
        password: password,
        new_passsword: new_password
    })
}