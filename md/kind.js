import React from 'react';
import './../scss/kind.scss';
import {hashHistory,IndexRoute} from 'react-router';
import Myajax from './Myajax.js';


export default class Kind extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      list:[],
      ad:[],
      plus:[],
      num:1,
      goodnum:0,
      timper:true
    }
  }
  //进入购物车
	cart(){
		hashHistory.push({
			pathname:'/Cart'
		})
  }
  //登录
	login(ev){
		hashHistory.push({
      pathname:'/Login',
      query:{
        pathname:'/kind'
      }
    })
    var ev=window.event||ev
    ev.stopPropagation();
	}
	//回到顶部
	backtp(){
      $('.type').scrollTop(0)
	}
  quxiao(){
    $('.kindcart').css('display','none')
    if($('.contbm').css("display") == 'none'){
      $('.contbm').css("display","block")
      $('#content .Box').css("display","none")
    }else{
      hashHistory.push({
            pathname:"/",	
      })
    }
    $('.kindHeader .find').removeAttr('disabled')
  }
  //下拉刷新列表
  scrolltop(ev){
    var that=this
    var top=$('.type').scrollTop()
    var h=parseInt($('#content').css('height'))
    var num=that.state.num
    var i=localStorage.getItem('kindgoodsname')
    num++
    that.setState({
      num:num
    })
    if(top>=300){
      $('.backtop').css('display','block')
    }else{
      $('.backtop').css('display','none')
    }
    console.log(h-top)
    if(h-top<=800){
      console.log(111)
      var url='http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword='+i+'&page='+num
      Myajax.fetch(url,function(data){
        var arr=that.state.plus
        arr=arr.concat(data.data)
        that.setState({
          plus:arr
        })
        console.log(that.state.plus)
      },function(err){
        console.log(err)
      })
    }
  }
  //点击进入检索内容详情列表
  lint(i){

    setTimeout(function(){
        $('.kindcart').css('display','block')
    },500)
    var that=this
    $('#content .Box').innerHTML=''
    $('#content .Box').css("display","block")
    $('.contbm').css("display","none")
    $('.kindHeader .find').val('')
    $('.kindHeader ul').css({"display":"none"})
    $('.kindHeader .find').attr('disabled','disabled')
    var url='http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword='+i+'&page=1'
    Myajax.fetch(url,function(data){
      that.setState({
        plus:data.data
      })
    },function(err){
      console.log(err)
    })
    localStorage.setItem('kindgoodsname',i)
  }
 price(price){
   
  var that=this
  var timper=this.state.timper
  console.log(timper)
  if(timper){
    localStorage.setItem('kindprice','small')
    timper=false
    this.setState({
      timper:timper
    })
  }else{
    localStorage.setItem('kindprice','big')
    timper=true;
    this.setState({
      timper:timper
    })
  }
  var i=localStorage.getItem('kindgoodsname')
  var kindprice=localStorage.getItem('kindprice')
  console.log('kindgoodsname')
  console.log(kindprice)
  if(kindprice==null){
    var url1='http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword='+i+'&page=1'
  }else if(kindprice=='small'){
    var url1='http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword='+i+'&sort=%7B%'+price+'%22%3A%22asc%22%7D&page=1'
  }else if(kindprice=='big'){
    var url1='http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword='+i+'&sort=%7B%22'+price+'%22%3A%22desc%22%7D&page=1'
  }
  console.log(url1)
  Myajax.fetch(url1,function(data){
    that.setState({
      plus:data.data
    })
  },function(err){
    console.log(err)
  })
}
  saixuan(){
    console.log('saixuan')
  }
  //获取热搜链接
  componentWillMount(){
    localStorage.removeItem('kindprice')
    localStorage.removeItem('kindgoodsname')
    var url='http://w.lefeng.com/api/neptune/search/hot_keywords/v1?count=10&highlight=1'
    var that=this
    Myajax.fetch(url,function(data){
         that.setState({
           list:data.data
         })
    },function(err){
        console.log(err)
    })
  }
  //购买商品
  buy(brandId,gid){
    hashHistory.push({
      pathname:'/Xiangqing',
      query:{
        brandId:brandId,
        gid:gid
      }
    })
  }
  jrcart(ev){
    var goodnum=this.state.goodnum
    console.log(localStorage.getItem('name'))
    if(localStorage.getItem('name')==null){
      hashHistory.push({
        pathname:'/Login',
        query:{
          i:'kind'
        }
      })
    }else{
      goodnum++
      this.setState({
        goodnum:goodnum
      })
      $('#content .kindcart span').css('display','block')
      $('#content .kindcart span').html(goodnum)
      if(goodnum>=10){
        setTimeout(function(){
          $('.kconbox').html('最多添加10件商品')
          $('.kconbox').css('display','block')
        },200)
        setTimeout(function(){
          $('.kconbox').css('display','none')
        },1200)
        $('#content .kindcart span').html('10')
      }
    }
    ev.stopPropagation()
  }
  render(){
    var that=this
    var obj=this.state.list
    var arr=[]
    for(var i=1;i<obj.length;i++){
        arr.push(<span key={i} data-ishighlight={obj[i].ishighlight} onClick={that.lint.bind(that,obj[i].word)}>{obj[i].word }</span>)
    }

    var olis=this.state.ad
    var add=[]
    for(var i=0;i<olis.length;i++){
      add.push(<li key={i} onClick={this.lint.bind(this,olis[i])}>{olis[i]}</li>)
    }
    
    var hot=this.state.plus
    var ahot=[]
    for(var i=0;i<hot.length;i++){
        ahot.push(<li key={i} onClick={this.buy.bind(this,hot[i].goods.brandId,hot[i].goods.gid)}>
                  <div className="lt">
                    <img src={hot[i].goods.image} alt=""/>
                  </div><div className="rt">
                    <h2>{hot[i].goods.brandStoreName}</h2>
                    <h3>{hot[i].goods.productName}</h3>
                    <p><span>{hot[i].goodsStock.saled}</span>人购买</p>
                    <div>
                      <span className='s1'>￥{hot[i].goods.vipshopPrice}</span>
                      <span className='s2'>￥{hot[i].goods.marketPrice}</span>
                      <b className='iconfont' onClick={this.jrcart.bind(this)}>&#xe62e;</b>
                    </div>
                  </div>
                </li>)
    }

    return(
    	<div id='container' onScroll={this.scrolltop.bind(this)}>
	    	<div className='type'>
	    		<header id='header'>
              <div className='kindHeader'>
                  <input type='text' placeholder='搜索商品' className='find' />
                  <div className='back' onClick={this.quxiao.bind(this)}>取消</div>
                  <b className='iconfont user'  onClick={this.quxiao.bind(this)}>&#xe630;</b>
                  <ul>
                    {add}
                  </ul>
              </div>
          </header>
	    		<div id='content'>
            <div className="kindcart iconfont" onClick={this.cart.bind(this)}>
              <span>1</span>
              &#xe62e;
            </div>
            <div className="backtop" onClick={this.backtp.bind(this)}>
              <b className="iconfont">&#xe64e;</b>
              回到顶部
            </div>
            <div className="Box">
              <div className="tp">
                <a href="javascript:;" onClick={this.price.bind(this,'vipshopPrice')}>价格</a>
                <a href="javascript:;" onClick={this.price.bind(this,'sale')}>销量</a>
                <a href="javascript:;" onClick={this.saixuan.bind(this)}>筛选</a>
              </div>
              <ul>
                {ahot}
              </ul>
            </div>
            <div className='contbm'>
              <p className='iconfont ss'>&#xe889;大家都在搜</p>
              <div className="box">
                {arr}
              </div>
            </div>
            <div className="kconbox"></div>
          </div>
	    	</div>
    	</div>
    )
  }
  componentDidUpdate(){
      //遍历热搜后加上颜色
      for(var i=0;i<$('.box span').length;i++){
          if($('.box span')[i].getAttribute("data-ishighlight")=='1'){
                $('.box span')[i].setAttribute('class','span')
          }
      }
        
  }
  componentDidMount(){
    
      //ajax请求输入框产生列表的数据
     var that=this 
     $('.kindHeader .find').on('input',function(){ 
      var int=$('.kindHeader .find').val()
      var url='http://w.lefeng.com/api/neptune/search/suggestion/v1?keyword='+int+'&count=15'
      Myajax.fetch(url,function(data){
          that.setState({
            ad:data.data
          })
          console.log(data.data)
          console.log(int)
      },function(err){
          console.log(err)
      }) 
      if(int != ''){
        $('.kindHeader ul').css("display","block")
        $('.contbm').css("display","none")
      }else{
        $('.kindHeader ul').css("display","none")
        $('.contbm').css("display","block")
      }
    })
  }

  
}