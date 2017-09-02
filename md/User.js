import React from 'react';
import {hashHistory} from 'react-router';
import './../scss/User.scss';

export default class User extends React.Component {
  constructor(props) {
    super(props),
    this.state=({
      didlogin:[]
    })
  }
  back(){
    hashHistory.push({
      pathname:'/',
    })
  }
  login(){
    hashHistory.push({
      pathname:'/Login'
    })
  }
  home(){
    hashHistory.push({
      pathname:'/'
    })
  }
  //登录购物车
	cart(){
		hashHistory.push({
      pathname:'/Cart',
      
		})
  }
  do(){
    var name=localStorage.getItem('name')
    console.log(name)
    if(name != null){
      $('.didlogin').css('display','block')
      $('#content .lr .p').html(name)
    }else{
      hashHistory.push({
        pathname:'/Login'
      })
    }
  }
  didlogin(){
    localStorage.removeItem('name')
    var name=localStorage.getItem('name')
    console.log(name)
    if(name != null){
      $('.didlogin').css('display','block')
      $('#content .lr .p').html(name)
    }else{
       $('.didlogin').css('display','none')
      $('#content .lr .p').html('登录/注册')
    }
  }
  componentWillMount(){
    var name=localStorage.getItem('name')
    console.log(name)
    if(name != null){
      $('.didlogin').css('display','block')
      $('#content .lr .p').html(name)
    }else{
      hashHistory.push({
        pathname:'/Login'
      })
    }
    this.setState({
      didlogin:name
    })
    console.log(this.state.didlogin)
  }
  render(){
    return(
      <div id='container'>
          <div className='type'>
              <header id='header'>
                  <div className='UserHeader'>
                      <b className='iconfont lt' onClick={this.back.bind(this)}>&#xe611;</b>
                      <div className='ctn'>我的蜂巢</div>
                      <b className='iconfont rt' onClick={this.back.bind(this)}>&#xe630;</b>
                  </div>
              </header>
              <div id='content'>
                <div className="lr">
                  <div className="iconfont bg" onClick={this.login.bind(this)}>&#xe635;</div>
                  <p className='p' onClick={this.login.bind(this)}>
                    登录/注册
                  </p>
                </div>
                <div className="goods">
                  <div className='do' onClick={this.do.bind(this)}>
                    <span>我的订单</span>
                    <span>全部订单
                      <b className="iconfont">&#xe610;</b>
                    </span>
                  </div>
                  <div className='three'>
                    <div>
                      <b className="iconfont">&#xe632;</b>
                      <span>待支付</span>
                    </div>
                    <div>
                      <b className="iconfont">&#xe889;</b>
                      <span>待收货</span>
                    </div>
                    <div>
                      <b className="iconfont">&#xe618;</b>
                      <span>待评价</span>
                    </div>
                  </div>
                  <div className='same dizi'>
                    <span className="left">
                      <b className="iconfont">&#xe644;</b>
                      收货地址
                    </span>
                    <span className="rt">
                      河南
                      <b className="iconfont">&#xe610;</b>
                    </span>
                  </div>
                  <div className='same'>
                    <span className="left">
                      <b className="iconfont">&#xe643;</b>
                      我的优惠券
                    </span>
                    <span className="rt">
                      <b className="iconfont">&#xe610;</b>
                    </span>
                  </div>
                  <div className='same huafeng'>
                    <span className="left">
                      <b className="iconfont">&#xe649;</b>
                      我的花粉
                    </span>
                    <span className="rt">
                      <b className="iconfont">&#xe610;</b>
                    </span>
                  </div>
                  <div className='same'>
                    <span className="left">
                      <b className="iconfont">&#xe64c;</b>
                      我的收藏
                    </span>
                    <span className="rt">
                      <b className="iconfont">&#xe610;</b>
                    </span>
                  </div>
                  <div className='same history'>
                    <span className="left">
                      <b className="iconfont">&#xe642;</b>
                      浏览记录
                    </span>
                    <span className="rt">
                      <b className="iconfont">&#xe610;</b>
                    </span>
                  </div>
                  <div className='same'>
                    <span className="left">
                      <b className="iconfont">&#xe64a;</b>
                      意见反馈
                    </span>
                    <span className="rt">
                      <b className="iconfont">&#xe610;</b>
                    </span>
                  </div>
                  <div className='same'>
                    <span className="left">
                      <b className="iconfont">&#xe61f;</b>
                      在线客服
                    </span>
                    <span className="rt">
                      <b className="iconfont">&#xe610;</b>
                    </span>
                  </div>
                  <div className='same'>
                    <span className="left">
                      <b className="iconfont">&#xe64d;</b>
                      关于乐蜂
                    </span>
                    <span className="rt">
                      <b className="iconfont">&#xe610;</b>
                    </span>
                  </div>
                </div>
                <div className="didlogin" onClick={this.didlogin.bind(this)}>
                  退出登录
                </div>
                <div className="footer">
                  <div className='let' onClick={this.home.bind(this)}>首页</div>
                  <div className='cnt' onClick={this.cart.bind(this)}>购物车</div>
                  <div className='rit'>客户端</div>
                </div>
                <div className="call">
                  联系客服<span>400-000-1818</span>
                </div>
                <div className="end">Copyright © 2008-2017 Lefeng.com All Rights Reserved</div>
              </div>
          </div>
      </div>
    )
  }
}