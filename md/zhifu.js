import React from 'react';
import {hashHistory} from 'react-router';
import './../scss/zhifu.scss';



export default class Xiangqing extends React.Component {
    back(){
        window.history.go(-1)
    }
    home(){
        hashHistory.push({
        pathname:'/'
        })
    }
    componentWillMount(){
        console.log(localStorage.getItem('nwepoint'))
        if(localStorage.getItem('nwepoint')==null){
            setTimeout(function(){
                $('.bfdz').css('display','block')
            },100)
            setTimeout(function(){
                $('.bfdz').css('display','none')
                hashHistory.push({
                pathname:'/Newpoint'
                })
            },1100)
        }else{
            var obj=JSON.parse(localStorage.getItem('nwepoint'))
            console.log(obj)
            $('.bfdz').css('display','none')
            $('.afdz').css('display','block')
        }
    }
    render(){
        return(
            <div className='type'>
            <header id='header'>
                <div className='zfHeader'>
                    <b className='iconfont lt' onClick={this.back.bind(this)}>&#xe611;</b>
                    <div className='ctn'>结算</div>
                    <b className='iconfont rt' onClick={this.home.bind(this)}>&#xe630;</b>
                </div>
            </header>
            <div id='content'>
                <div className="bfdz">
                    请先完善个人信息，在进行结算.......
                </div>
                <div className="afdz">
                    <div className="zhifuhd">
                        <p className="zfp">收货信息</p>
                        <div className="zfxx">
                            <p>
                                <span>name</span>
                                <span>1333333333</span>
                            </p>
                            <p>的顶顶顶顶顶</p>
                        </div>
                    </div>
                    <div className="zfstyle">
                        <p className="zffs">支付方式</p>
                        <ul>
                            <li className='iconfont'>
                                <b>&#xe640;</b>
                                <b>&#xe695;</b>
                                支付宝网页版
                            </li>
                            <li className='iconfont'>
                                <b>&#xe640;</b>
                                <b>&#xe62d;</b>
                                微信支付
                            </li>
                            <li className='iconfont'>
                                <b>&#xe640;</b>
                                <b>&#xe652;</b>
                                银联卡支付
                            </li>
                        </ul>
                    </div>
                    <div className="zfter">
                        <ul>
                            <li>费用详情</li>
                            <li>商品金额：<span>￥<b>199</b>.00</span></li>
                            <li>乐蜂发货，运费：<span>￥<b>0</b>.00</span></li>
                            <li>活动优惠：<span>￥<b>-100</b>.00</span></li>
                        </ul>
                        <p className="fp">
                            开具发票
                            <span>不开发票></span>
                        </p>
                    </div>
                </div>
                <div className="zhifu">
                    <div className="zflet">总金额：<span>￥<b>99</b></span></div>
                    <div className="zfrit">支付</div>
                </div>
            </div>
        </div>
        )
    }
    componentWillUnmount(){
        
    }
}