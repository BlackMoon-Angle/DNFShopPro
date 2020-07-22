import React from 'react';
//加载动态图
import LoadGif from '../../../public/img/load/loading.gif'
import './index.scss'

function loading() {
    return <div className="load_box"><img src={LoadGif}></img></div>
}
export default loading;