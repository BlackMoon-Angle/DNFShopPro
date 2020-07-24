import http from '../../utils/Http'

// 首页商品列表数据请求
export async function Home_data() {
    return await http.get('/good/homeGoods')
}
// 首页商品导航数据请求
export async function Home_Nav_data() {
    return await http.get('/good/homeNav')
}

// 列表页商品数据请求
export async function List_data() {
    return await http.get('/good/listGoods')
}

// 详细页商品数据请求
export async function Detail_data() {
    return await http.get('/good/detail')
}

// 购物车页商品数据请求
export async function Cart_data() {
    return await http.get('/good/cartData')
}

/*-------------------------------------购物车操作(未使用)------------------------------------- */
// 加入购物车
export async function Add_cart(id, data) {
    return await http.post('/good/addCart', {
        id: id,
        detailData: JSON.stringify(data)
    })
}
//点击后修改商品的复选框按钮的Boolean值
export async function Modify_cart(id, bol) {
    return await http.put('/good/modifycart', {
        id: id,
        id_bol: bol
    })
}
//点击后增加商品的购买数量
export async function add_num(id, num) {
    return await http.put('/good/add', {
        id: id,
        new_num: num
    })
}
//点击后减少商品的购买数量
export async function reduce_num(id, num) {
    return await http.put('/good/reduce', {
        id: id,
        new_num: num
    })
}

//点击后删除选定的商品
export async function delete_data() {
    return await http.put('/good/delete')
}

//点击后全选所有的商品
export async function all_checked_data() {
    return await http.put('/good/checked')
}

/*-------------------------------------后台商品操作------------------------------------- */
// // 商品列表数据请求
// export async function Home_data() {
//     return await http.get('/good/CMSData')
// }
// //点击后删除选定的商品
// export async function delete_data() {
//     return await http.put('/good/CMSdelete', {
//         id: id,
//     })
// }