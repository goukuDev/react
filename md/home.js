import React from 'react';
import Myajax from './Myajax.js';
import {hashHistory,IndexRoute} from 'react-router';


export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state={
		lists:[],
		ad:[],
		lieb:[],
		num:1,
		jx:[],
		jxnum:1
	}
  }
  //首页
  home(){
	hashHistory.push({
			pathname:'/'
	})
  }
  //购物车
	cart(i){
		hashHistory.push({
			pathname:'/Cart'
		})
	}
	//登录
	flogin(){
		hashHistory.push({
			pathname:'/Login'
		})
	}
	//注册
	zc(){
		hashHistory.push({
			pathname:'/Rejuster'
		})
	}
	//回到顶部
	backtp(){
		$('.type').scrollTop(0)
	}
  //下拉刷新
  scroll(event){
	var top=$('.type').scrollTop()
	if(top>=800){
		$('.backtop').css('display','block')
		$('#header').addClass('Header')
	}else{
		$('.backtop').css('display','none')
		$('#header').removeClass('Header')
	}
	var h=parseInt($('#content').css('height'))
	var num=this.state.num
	if((h-top)<=4000){
	var that=this
	//商品列表详情
	num++;
	this.setState({
		num:num
	});
	var url2='http://w.lefeng.com/api/neptune/special_brands/v3?page='+num+'&labelType=1'
	Myajax.fetch(url2,function(data){
		var arr=that.state.lieb
		var arr=arr.concat(data.data)
			that.setState({
				lieb:arr
			})
				var swiper = new Swiper('.ber', {
					slidesPerView:4,
					paginationClickable: true,
					spaceBetween:10,
					freeMode: true
			});
	},function(err){
		console.log(err)
	})

	//每日精选
	var url3='http://w.lefeng.com/api/neptune/handpick_list/v1?start='+num
	Myajax.fetch(url3,function(data){
		var jxarr=that.state.jx
		jxarr=jxarr.concat(data.data)
			that.setState({
				jx:jxarr
			})
			// console.log(that.state.jx)
	},function(err){
		console.log(err)
	})
	}

	
  }

  buy(adlink){
    hashHistory.push({
      pathname:'/Xiangqing',
      query:{
        gid:adlink,
      }
    })
  }
  componentWillMount(){
			//轮播图
			var that=this
			var url='http://w.lefeng.com/api/neptune/brand/ad/v3?zoneId=943%2C478%2C496%2C693%2C724%2C725%2C726%2C727%2C728&resolution=320x568&appName=lefeng_android&version=4.1.1'
			Myajax.fetch(url,function(data){
				that.setState({
					lists:data.data
				})
				var mySwiper = new Swiper ('#banner1', {
					loop: true,
					pagination: '.swiper-pagination',
					autoplay:2700,
					autoplayDisableOnInteraction:false
				})  
					
				var swiper = new Swiper('#banner2', {
						scrollbar: '.swiper-scrollbar',
						slidesPerView:2.8,
						paginationClickable: true,
						spaceBetween:10,
						freeMode: true
				})

				var swiper = new Swiper('#banner3', {
						pagination: '.swiper-pagination',
						paginationClickable: true,
						loop: true,
				});
			},function(err){
				console.log(err)
			})
			//搜索框
			var url1='http://w.lefeng.com/api/neptune/search/hot_keywords/v1?count=10&highlight=1'
			Myajax.fetch(url1,function(data){
						that.setState({
							ad:data.data[0].word
						})
				},function(err){
					console.log(err)
				})

			//商品列表详情
			var url2='http://w.lefeng.com/api/neptune/special_brands/v3?page=1&labelType=1'
			Myajax.fetch(url2,function(data){
					that.setState({
						lieb:data.data
					})
						var swiper = new Swiper('.ber', {
							slidesPerView:4,
							paginationClickable: true,
							spaceBetween:10,
							freeMode: true
					});
			},function(err){
				console.log(err)
			})
			//每日精选
			var url3='http://w.lefeng.com/api/neptune/handpick_list/v1?start=1'
			Myajax.fetch(url3,function(data){
					that.setState({
						jx:data.data
					})
			},function(err){
				console.log(err)
			})
		}
	//点击跳转到搜索页面
  change(){
  	hashHistory.push({
  			pathname:"/Kind",	
  	})
  }

  //登录用户中心页面
  login(){
	 hashHistory.push({
  			pathname:"/User",	
  	}) 
  }
  //进入商品列表详情
  b4list(gid){
	console.log(gid)
	hashHistory.push({
		pathname:"/Homexq",	
		query:{
			gid:gid,
		}  
  	}) 
  }
  render(){
		//banner图
  	var that=this
  	var data=this.state.lists[478]
	var arr=[]
	console.log(data)
  	if(data!=undefined){
  		for(let i=0;i<data.length;i++){
				var obj=data[i].adlink.split('=')
				// console.log(obj[1])
				var gid=obj[1]*1+4
				// console.log(gid)
	  		arr.push(<div className="swiper-slide" key={i} onClick={this.b4list.bind(this,gid)}><img src={data[i].sfilename}/></div>)
	  	}
	}
		
		//生日快乐
		var happy=this.state.lists[496]
		// console.log(happy)
		var hy=[]
		if(happy!=undefined){
  		for(var i=0;i<happy.length;i++){
	  		hy.push(<div key={i}><a href='javascript:void(0)'><img src={happy[i].imgFullPath} alt=""/></a></div>)
	  	}
		}

		//九宫格
		var banner2=this.state.lists[724]
		// console.log(banner2)
		var ba2=[]
		if(banner2!=undefined){
  		for(var i=0;i<banner2.length;i++){
	  		ba2.push(<div className="swiper-slide" key={i}><img src={banner2[i].imgFullPath} alt=""/></div>)
	  	}
		}

		//蜂购全球
		var banner3=this.state.lists[728]
		var ban1=[]
		var ban2=[]
		var ban3=[]
		if(banner3!=undefined){
			for(var i=0;i<banner3.length;i++){
					if(0<=i&&i<5){
						ban1.push(<img src={banner3[i].filename} alt="" key={i} onClick={this.buy.bind(this,banner3[i].adlink)}/>)
					}else if(5<=i&&i<10){
						ban2.push(<img src={banner3[i].filename} alt="" key={i} onClick={this.buy.bind(this,banner3[i].adlink)}/>)
					}else if(10<=i&&i<15){
						ban3.push(<img src={banner3[i].filename} alt="" key={i} onClick={this.buy.bind(this,banner3[i].adlink)}/>)
					}
			}
		}

		//商品详情列表
		var banner4=this.state.lieb
		var ber1=[]
		for(var i=0;i<banner4.length;i++){
		if(banner4[i].starProductList){
			var ber3=[]

			for(var k=0;k<banner4[i].starProductList.length;k++){
					ber3.push(<div className="swiper-slide" key={k} onClick={this.buy.bind(this,banner4[i].starProductList[k].gid)}>
								<img src={banner4[i].starProductList[k].image} alt=""/>
								<span>￥{banner4[i].starProductList[k].vipshopPrice}</span>
							</div>)
			}
			
		
			ber1.push(<div className="lists" key={i}>
								<img src={banner4[i].brandImage} alt="" className='limg' onClick={this.b4list.bind(this,banner4[i].bid)}/>
								<div className="swiper-container  ber">
								<div className="swiper-wrapper">
									{ber3}
									<div className="swiper-slide">
										<div className="listsmore" onClick={this.b4list.bind(this,banner4[i].bid)}>加载更多</div>
									</div>
								</div>
								</div>
							</div>)
			}else{
				ber1.push(<div className="lists" key={i} onClick={this.b4list.bind(this,banner4[i].bid,banner4[i].brandId)}>
						<img src={banner4[i].brandImage} alt="" className="limg"/>
						<p>
							<span>{banner4[i].agio}</span>
							{banner4[i].name}
						</p>
					</div>)
			}

		}

		//每日精选
		var banner5=this.state.jx
		var b4=[]
		for(var i=0;i<banner5.length;i++){
			if(banner5[i].goods.saleOut==true){
				$('.canver').css('display','block')
			}else{
				$('.canver').css('display','none')
			}
			b4.push(<div className="div" key={i} data-bid={banner5[i].goods.gid}>
						<div className="canver">
							已抢光
						</div>
						<img src={banner5[i].goods.image} alt=""/>
						<p>
							<span className="s1">{banner5[i].goods.brandStoreName}</span>
							<span className="s2">{banner5[i].goods.productName}</span>
						</p>
						<div>
							<span className='st'><b>￥</b>{banner5[i].goods.vipshopPrice}</span>
							<span className='sc'>￥{banner5[i].goods.marketPrice}</span>
							<span className='iconfont sm' onClick={this.cart.bind(this)}>&#xe62e;</span>
						</div>
					</div>)}
    return(
    	<div className='type' onScroll={this.scroll.bind(this)}>
    		<header id='header'>
	    		<div className='commonHeader'>
	    			<b className='back'>乐蜂</b>
	    			<div className='title' onClick={this.change.bind(this)}>
	    				<div className='find'><b className='iconfont'>&#xe67f;</b>{that.state.ad}</div>
	    			</div>
	    			<b className='iconfont moreInfo' onClick={this.login.bind(this)}>&#xe635;</b>
	    		</div>
    		</header>
    		<div id='content'>
					<div className="cart iconfont" onClick={this.cart.bind(this)}>
						&#xe62e;
					</div>
					<div className="backtop" onClick={this.backtp.bind(this)}>
						<b className="iconfont">&#xe64e;</b>
						顶部
					</div>
    				<div className="swiper-container" id='banner1'>
					    <div className="swiper-wrapper">
					    		{arr}
					    </div>
					    <div className="swiper-pagination"></div>
						</div>
						<div className='happy'> 
							{hy}
						</div>
						<div className='hb'>
							<img src="http://b.appsimg.com/2017/07/24/2212/02ca1977901017cf58e883938bd94474.jpg" alt="" className='img1'/>
							<img src="http://b.appsimg.com/2017/08/04/6083/d4291c68d6f29d18931a2c5d2fd5c661.jpg" alt="" className='img2'/>
							<img src="http://b.appsimg.com/2017/08/04/2783/e7e34007ce6a3dc4b4934324f182d7c6.jpg" alt="" className='img3'/>
						</div>
						<div className="jiugongge">
								<img src="http://b.appsimg.com/2017/08/05/2145/304599597bddd978d41c976f2b6240d9.jpg" alt=""/>
								<img src="http://b.appsimg.com/2017/08/05/6711/304599597bddd978d41c976f2b6240d9.jpg" alt=""/>
								<img src="http://b.appsimg.com/2017/08/05/2747/304599597bddd978d41c976f2b6240d9.jpg" alt=""/>
								<img src="http://b.appsimg.com/2017/08/05/3426/304599597bddd978d41c976f2b6240d9.jpg" alt=""/>
						</div>
						<div className="swiper-container" id="banner2">
								<div className="swiper-wrapper">
										{ba2}
								</div>
								<div className="swiper-scrollbar"></div>
						</div>
						<div className="htfj">
							<img src="http://b.appsimg.com/2017/07/29/5410/15013408740.jpg" alt=""/>
						</div>
						<div className="fengou">
							<h2>蜂购全球</h2>
							<img src="http://b.appsimg.com/2016/07/18/7676/146882918395.jpg" alt="" className="tp"/>
							 	<div className="swiper-container" id="banner3">
										<div className="swiper-wrapper">
												<div className="swiper-slide">
													{ban1}
												</div>
												<div className="swiper-slide">
													{ban2}
												</div>
												<div className="swiper-slide">
													{ban3}	
												</div>  
										</div>
										<div className="swiper-pagination"></div>
								</div>
						</div>
						<div className="pingpg">
							<div className='p'>品牌专场</div>
							{ber1}
						</div>
						<div className="jingxuan">
							<div className='jx'>每日精选</div>
							<div className="jxbox">
								{b4}
							</div>
						</div>
						<div className="homefooter">
							<div className='hlet' onClick={this.home.bind(this)}>首页</div>
							<div className='hcnt' onClick={this.cart.bind(this)}>购物车</div>
							<div className='hrit'>客户端</div>
							<div className='homelogin' onClick={this.flogin.bind(this)}>登录</div>
							<div className='homezc' onClick={this.zc.bind(this)}>注册</div>
						</div>
						<div className="hcall">
							联系客服<span>400-000-1818</span>
						</div>
						<div className="hend">Copyright © 2008-2017 Lefeng.com All Rights Reserved</div>
				</div>
    	</div>
    )
  }
}