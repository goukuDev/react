import React from 'react';
import './../scss/homexq.scss';
import {hashHistory} from 'react-router';
import Myajax from './Myajax.js';


export default class Xiangqing extends React.Component {
  constructor(props) {
    super(props),
    this.state=({
      baner:[],
      title:[],
      p:[],
      Hbox:[],
      num:1,
      brandStoreName:[],
      productName:[],
      verticalImage:[],
      nowpice:[],
      timer:[],
      timper:true,
      goodsnum:true,
      sxbox:[]
    })
  }
  //回到顶部
	backtp(){
		$('.type').scrollTop(0)
  }
  //下拉刷新列表
  scrolltop(ev){
    var that=this
    var top=$('.type').scrollTop()
    var h=parseInt($('#content').css('height'))
    var num=that.state.num
    if((h-top)<=700){
      num++
      that.setState({
        num:num
      })
      var gid=this.props.location.query.gid
      var url1='http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId='+gid+'&start='+num
      Myajax.fetch(url1,function(data){
        var arr=that.state.Hbox
        arr=arr.concat(data.data)
          that.setState({
            Hbox:arr
          })
      },function(err){
        console.log(err)
      })
    }
    if(top>=300){
      $('.backtop').css('display','block')
    }else{
      $('.backtop').css('display','none')
    }
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
  back(){
    window.history.go(-1)
  }
  home(){
    hashHistory.push({
      pathname:'/'
    })
  }
  cart(){
    hashHistory.push({
      pathname:'/Cart'
    })
  }
  jrcart(ev){
    var that=this
    var goods=localStorage.getItem('goodsnum')
    console.log(goods)
    var loginname=localStorage.getItem('name')
    var gid=this.props.location.query.gid
    var id=ev.target.getAttribute('data-id')
    var url='http://w.lefeng.com/api/neptune/goods/detail_with_stock/v1?needBrandInfo=true&gid='+id+'&brandId='+gid
    Myajax.fetch(url,function(data){
      var np=data.data.goods.vipshopPrice
      var brandStoreName=data.data.goods.brandStoreName
      var productName=data.data.goods.productName
      var verticalImage=data.data.goods.verticalImage
      var obj={
        gid:id,
        brandStoreName:brandStoreName,
        productName:productName,
        img:verticalImage,
        np:np
      }
      if(loginname==null){
        hashHistory.push({
          pathname:'/Login',
        })
      }else{
          if( goods != null){
                var oldgood=JSON.parse(goods)
                var isfleg=that.istext(obj,oldgood)
                if(isfleg){
                  isfleg.num++
                }else{
                  obj.num=1
                  oldgood.push(obj)
                }
                var oldgoodstr=JSON.stringify(oldgood);
                localStorage.setItem('goodsnum',oldgoodstr)
          }else{
            var goodsnum=[]
            obj.num=1
            goodsnum.push(obj)
            var goodsnumstr=JSON.stringify(goodsnum)
            localStorage.setItem('goodsnum',goodsnumstr)
          }
      }
    },function(err){
      console.log(err)
    })
    
    $('#content').append('<div class="goodsnum">1</div>')
    $('.goodsnum').css('display','block')
    $('.goodsnum').addClass('goodsnumam')
    var timer=setTimeout(function(){
      $('.goodsnum').removeClass('goodsnumam')
      $('.goodsnum').css('display','none')
      $('.goodsnum').remove()
    },2000)
    ev.stopPropagation()
    this.setState({
      timer:timer
    })
  }
  istext(nwe,old){
    for(var i=0;i<old.length;i++){
          if(nwe.gid==old[i].gid){
            return old[i]
          }
    }
        return false;
  }
  
  price(price){
    var that=this
    var timper=this.state.timper
    console.log(timper)
    if(timper){
      localStorage.setItem('homeprice','small')
      timper=false
      this.setState({
        timper:timper
      })
    }else{
      localStorage.setItem('homeprice','big')
      timper=true
      this.setState({
        timper:timper
      })
    }
    var homeprice=localStorage.getItem('homeprice')
    console.log(homeprice)
    var gid=this.props.location.query.gid
    if(homeprice==null){
      var url1='http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId='+gid+'&start=1'
    }else if(homeprice=='small'){
      var url1='http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId='+gid+'&start=1&sort=%7B%22'+price+'%22%3A%22asc%22%7D'
    }else if(homeprice=='big'){
      var url1='http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId='+gid+'&start=1&sort=%7B%22'+price+'%22%3A%22desc%22%7D'
    }
    console.log(url1)
    Myajax.fetch(url1,function(data){
      console.log(data.data)
        that.setState({
          Hbox:data.data,
        })
    },function(err){
      console.log(err)
    })
  }
  saixuan(){
    var that=this
    $('.saixuan').animate({'right':'0'})
    // console.log(this.props.location.query.gid)
    var gid=this.props.location.query.gid
    var url='http://w.lefeng.com/api/neptune/goods/get_thirdcat_size/v1?brandId='+gid
    // console.log(url)
      Myajax.fetch(url,function(data){
        // console.log(data)
          that.setState({
            sxbox:data.data,
          })
      },function(err){
        console.log(err)
      })
  }
  qux(ev){
    $('.saixuan').animate({'right':'-100%'})
    ev.stopPropagation()
  }
  sxname(name,ev){
    localStorage.setItem('sxname',name)
   var index=ev.target.getAttribute('data-index')
   console.log(ev.target)
   console.log(index)
   $('.saixuan .sxbox span').eq(index).addClass('active').siblings().removeClass('active')
  }
  sxbtn(ev){
    var that=this
    var name=localStorage.getItem('sxname')
    var gid=this.props.location.query.gid
//  var url='http://w.lefeng.com/api/neptune/goods/get_thirdcat_size/v1?brandId='+gid
    console.log(name)
    if(name=='全部'||name==null){
      var url='http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId='+gid+'&start=1&catName3'
      Myajax.fetch(url,function(data){
        console.log(data.data)
        that.setState({
          Hbox:data.data,
        })
      },function(err){
        console.log(err)
      })
    }else{
      var url='http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId='+gid+'&start=1&catName3='+name
      Myajax.fetch(url,function(data){
        console.log(data)
        that.setState({
          Hbox:data.data,
        })
      },function(err){
        console.log(err)
      })
    }
    console.log(url)
    localStorage.removeItem('sxname')
    $('.saixuan').animate({'right':'-100%'})
    ev.stopPropagation()
  }
  componentWillMount(){
    localStorage.removeItem('homeprice')
    var that=this
    console.log(this.props.location.query.gid)
    var gid=this.props.location.query.gid
    var url='http://w.lefeng.com/api/neptune/brand/details/v1?brandId='+gid
    Myajax.fetch(url,function(data){
      console.log(data.data)
      that.setState({
        baner:data.data.brandImage,
        title:data.data.name,
        // p:data.data.pmsList[0].msg
      })
    },function(err){
      console.log(err)
    })
    var url1='http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId='+gid+'&start=1'
    Myajax.fetch(url1,function(data){
      console.log(data.data)
        that.setState({
          Hbox:data.data,
        })
    },function(err){
      console.log(err)
    })
  }
  render(){
    var baner=this.state.baner
    var br=[]
    br.push(baner)
    var title=this.state.title
    var te=[]
    te.push(title)
    var p=this.state.p
    if(p!=undefined){
      var pp=[]
      pp.push(p)
    }
    var Hbox=this.state.Hbox
    var hb=[]
		for(var i=0;i<Hbox.length;i++){
    hb.push(<div className="div" key={i} onClick={this.buy.bind(this,Hbox[i].goods.brandId,Hbox[i].goods.gid)}>
          <img src={Hbox[i].goods.image} alt=""/>
          <p>
            <span className="s1">{Hbox[i].goods.brandStoreName}</span>
            <span className="s2">{Hbox[i].goods.productName}</span>
          </p>
          <div>
            <span className='st'><b>￥</b>{Hbox[i].goods.vipshopPrice}</span>
            <span className='sc'>￥{Hbox[i].goods.marketPrice}</span>
            <span className='iconfont sm' onClick={this.jrcart.bind(this)} data-id={Hbox[i].goods.gid}>&#xe62e;</span>
          </div>
          </div>)}
   
    var sxbox=this.state.sxbox
    var saixuan=[]
    for(var i in sxbox){
      saixuan.push(<span key={i} data-index={i*1+1} onClick={this.sxname.bind(this,sxbox[i].thirdCatName)}>{sxbox[i].thirdCatName}</span>)
    }
    
    return(
    	<div className='type' onScroll={this.scrolltop.bind(this)}>
    		<header id='header'>
            <div className='hmxqHeader'>
                <b className='iconfont lt' onClick={this.back.bind(this)}>&#xe611;</b>
                <div className='ctn'>{te}</div>
                <b className='iconfont rt' onClick={this.home.bind(this)}>&#xe630;</b>
            </div>
        </header>
    		<div id='content'>
          <div className="imgtop">
              <img src={baner} alt=""/>
              <p>{pp}</p>
          </div>
          <div className="tp">
            <a href="javascript:;" onClick={this.price.bind(this,'vipshopPrice')}>价格</a>
            <a href="javascript:;" onClick={this.price.bind(this,'sale')}>销量</a>
            <a href="javascript:;" onClick={this.saixuan.bind(this)}>筛选</a>
          </div>
          <div className="Hbox">
            {hb}
          </div>
          <div className="hmxqcart iconfont" onClick={this.cart.bind(this)}>
            &#xe62e;
            <span>1</span>
          </div>
          <div className="backtop" onClick={this.backtp.bind(this)}>
            <b className="iconfont">&#xe64e;</b>
            顶部
          </div>
          <div className="kconbox"></div>
        </div>
        <div className="saixuan" onClick={this.saixuan.bind(this)}>
          <div className="sxheader">
            <div className="qux" onClick={this.qux.bind(this)}>取消</div>
            <div className="cnt">筛选</div>
            <div className="white"></div>
          </div>
          <div className="sxbox">
            <div className="fenkei">分类</div>
            <span className='active' data-index='0' onClick={this.sxname.bind(this,'全部')}>全部</span>
            {saixuan}
            {/* <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span> */}
          </div>
          <div className="sxfooter">
            <input type="button" className='sxbtn'value='确定' onClick={this.sxbtn.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
  componentWillUnmount(){
    var timer=this.state.timer
    clearInterval(timer)
  }
}