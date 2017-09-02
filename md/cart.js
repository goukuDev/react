import React from 'react';
import {hashHistory} from 'react-router';
import './../scss/cart.scss';


export default class Cart extends React.Component {
  constructor(props) {
    super(props),
    this.state={
      arr:[],
      num:[],
    }
  }
  home(){
    hashHistory.push({
      pathname:'/'
    })
  }
  back(){
    window.history.go(-1)
  }
  down(num,gid){
    var goodnum=localStorage.getItem('goodsnum')
    var arrgood=JSON.parse(goodnum)
    console.log(arrgood)
    for(var i=0;i<arrgood.length;i++){
      if(arrgood[i].gid==gid){
        arrgood[i].num--
        arrgood.splice(i,1,arrgood[i])
        var arrstr=JSON.stringify(arrgood)
        localStorage.setItem('goodsnum',arrstr)
        var obj=this.state.arr
        this.setState({
          arr:arrgood
        })
        if(arrgood[i].num==0){
          arrgood.splice(i,1)
          var arrstr=JSON.stringify(arrgood)
          localStorage.setItem('goodsnum',arrstr)
          var obj=this.state.arr
          this.setState({
            arr:arrgood
          })
          if(arrgood.length==0){
            localStorage.removeItem('goodsnum')
          }
        }
      }
    }
  }
  plus(num,gid){
      var goodnum=localStorage.getItem('goodsnum')
      var arrgood=JSON.parse(goodnum)
      console.log(arrgood)
      for(var i=0;i<arrgood.length;i++){
        if(arrgood[i].gid==gid){
          arrgood[i].num++
          arrgood.splice(i,1,arrgood[i])
          var arrstr=JSON.stringify(arrgood)
          localStorage.setItem('goodsnum',arrstr)
          var obj=this.state.arr
          this.setState({
            arr:arrgood
          })
        }
      }
  }
  delete(gid){
    var goodnum=localStorage.getItem('goodsnum')
    var arrgood=JSON.parse(goodnum)
    console.log(arrgood)
    for(var i=0;i<arrgood.length;i++){
      if(arrgood[i].gid==gid){
        arrgood.splice(i,1)
        var arrstr=JSON.stringify(arrgood)
        localStorage.setItem('goodsnum',arrstr)
        var obj=this.state.arr
        this.setState({
          arr:arrgood
        })
      }
    }
    console.log(arrgood.length)
    if(arrgood.length==0){
      localStorage.removeItem('goodsnum')
    }
  }
  ZFB(){
    console.log('zhb')
    hashHistory.push({
      pathname:'/Zhifu'
    })
  }
  componentWillMount(){
    var that=this
    var goodnum=localStorage.getItem('goodsnum')
    var arrgood=JSON.parse(goodnum)
    that.setState({
      arr:arrgood
    })
  }
  render(){
    console.log(this.state.arr)
    var ar=this.state.arr
    var goodnum=localStorage.getItem('goodsnum')
    var arr=[]
    var ard=[]
    var money=[]
    var Money=0
    var many=[]
    if(goodnum != null){
      for(var i=0;i<ar.length;i++){
        Money+=((ar[i].np)*(ar[i].num))
       ard.push(<div className="cartgoods" key={i}>
                    <img src={ar[i].img} alt=""/>
                    <div className="cartright">
                      <div className="carttp">
                        <span>{ar[i].brandStoreName}</span>
                        <span>{ar[i].productName}</span>
                      </div>
                      <div className="money">￥{ar[i].np}</div>
                      <div className="cartbtm">
                        <div className='cartlt'>
                          <b onClick={this.down.bind(this,ar[i].num,ar[i].gid)}>-</b>
                          <span className="input">{ar[i].num}</span>
                          <b onClick={this.plus.bind(this,ar[i].num,ar[i].gid)}>+</b>
                        </div>
                          <b className="cartrit iconfont" data-index={i} onClick={this.delete.bind(this,ar[i].gid)}>&#xe72a;</b>
                      </div>
                    </div>
                  </div>)
      }
      arr.push(<div className="goodbox" key={'1'}>
                  <div className="title">
                    乐蜂
                  </div>
                  {ard}
                  <div className="cartbottom">
                    <p><b>待支付：</b><span>￥{Money}</span></p>
                    <div onClick={this.ZFB.bind(this)}>结算</div>
                  </div>
                  <div className="btmqg">
                    <p className="btmp">
                      还有抢购机会
                    </p>
                    <ul>
                      <li>1</li>
                      <li>2</li>
                      <li>3</li>
                      <li>4</li>
                      <li>5</li>
                      <li>6</li>
                      <li>7</li>
                      <li>8</li>
                    </ul>
                  </div>
            </div>)
    }else{
      arr.push(
          <div className="nobox" key={'1'}>
                <div className="cartbox">
                  <b className="iconfont">&#xe62e;</b>
                </div>
                <p className='cartp'>购物车为空哦~</p>
                <p className='bm'>赶紧抢点东西犒劳自己吧~</p>
                <input type="button" onClick={this.home.bind(this)} value='去首页逛逛'className='bton'/>
            </div>
      )
    }
    return(
      <div id='container'>
        <div className='type'>
          <header id='header'>
            <div className='cartHeader'>
                <b className='iconfont lt' onClick={this.back.bind(this)}>&#xe611;</b>
                <div className='ctn'>购物车</div>
                <b className='iconfont rt'></b>
            </div>
          </header>
          <div id='content'>
            {arr}
          </div>
        </div>
      </div>
    )
  }
}