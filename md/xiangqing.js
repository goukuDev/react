import React from 'react';
import './../scss/xiangqing.scss';
import {hashHistory} from 'react-router';
import Myajax from './Myajax.js';


export default class Xiangqing extends React.Component {
  constructor(props) {
    super(props),
    this.state={
      title:[],
      img:[],
      nowpice:[],
      didpice:[],
      mj:[],
      lists:[],
      num:[],
      nums:[],
      words:[],
      image:[],
      pj:[],
      list:[],
      brandStoreName:[],
      productName:[],
      verticalImage:[],
      goodnum:0
    }
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
  //点击加入购物车
  jrcart(ev){
    var that=this
    var goods=localStorage.getItem('goodsnum')
    console.log(goods)
    var loginname=localStorage.getItem('name')
    var gid=this.props.location.query.gid
    var brandId=this.props.location.query.brandId
    var title=this.state.title
    var np=this.state.nowpice
    var productName=this.state.productName
    var brandStoreName=this.state.brandStoreName
    var verticalImage=this.state.verticalImage
    var obj={
      gid:gid,
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
              console.log(oldgood)
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
    ev.stopPropagation()
  }

  istext(nwe,old){
    for(var i=0;i<old.length;i++){
          if(nwe.gid==old[i].gid){
            return old[i]
          }
    }
        return false;
  }

  //切换购物说明和商品详情
  tablel(){
    $('.tatpl').addClass('active')
    $('.tatpr').removeClass('active')
    $('.tabox1').addClass('tactive')
    $('.tabox2').removeClass('tactive')
  }
  tabler(){
    $('.tatpr').addClass('active')
    $('.tatpl').removeClass('active')
    $('.tabox2').addClass('tactive')
    $('.tabox1').removeClass('tactive')
  }
  //点击加载更多
  tabox1p(){
    $('.tabox1p').css('display','none')
    $('.taboximg').css('display','block')
    var that=this
    var gid=this.props.location.query.gid
    var brandId=this.props.location.query.brandId
    if(gid && brandId){
      var url='http://w.lefeng.com/api/neptune/goods/detail_with_stock/v1?needBrandInfo=true&gid='+gid+'&brandId='+brandId
      Myajax.fetch(url,function(data){
        // console.log(data.data)
        that.setState({
          image:data.data.goods.detailImage
        })
        // console.log(that.state.img)
      },function(err){
        console.log(err)
      })
    }else{
      var url='http://w.lefeng.com/api/neptune/goods/detail_with_stock/v1?needBrandInfo=true&gid='+gid
      Myajax.fetch(url,function(data){
        // console.log(data.data)
        that.setState({
          image:data.data.goods.detailImage
        })
        // console.log(that.state.img)
      },function(err){
        console.log(err)
      })
    }
  }


  componentWillMount(){
    var that=this
    var gid=this.props.location.query.gid
    var brandId=this.props.location.query.brandId
    if(gid && brandId){
      var url='http://w.lefeng.com/api/neptune/goods/detail_with_stock/v1?needBrandInfo=true&gid='+gid+'&brandId='+brandId
      Myajax.fetch(url,function(data){
        console.log(data.data.goods)
        that.setState({
          title:data.data.goods.name,
          img:data.data.goods.allImages[2],
          nowpice:data.data.goods.vipshopPrice,
          didpice:data.data.goods.marketPrice,
          lists:data.data.goods.pmsList,
          nums:data.data.goods.obtainPollen,
          words:data.data.goods.descriptions,
          brandStoreName:data.data.goods.brandStoreName,
          productName:data.data.goods.productName,
          verticalImage:data.data.goods.verticalImage
        })
      },function(err){
        console.log(err)
      })
      
      //评价头
      var url1='http://w.lefeng.com/api/neptune/appraise/count/v1?spuId=310543397199863815'
      Myajax.fetch(url1,function(data){
        // console.log(data.data)
        that.setState({
          pj:data.data.greatScale,
          num:data.data.totalCount
        })
      },function(err){
        console.log(err)
      })
      
      //评价内容
      var url2='http://w.lefeng.com/api/neptune/appraise/get_appraise_list/v1?page=1&pageSize=3&scoreLevel=0&spuId=310543397199863815'
      Myajax.fetch(url2,function(data){
        that.setState({
          list:data.data
        })
        // console.log(data.data)
      },function(err){
        console.log(err)
      })
  
    }else{
      var url='http://w.lefeng.com/api/neptune/goods/detail_with_stock/v1?needBrandInfo=true&gid='+gid
      Myajax.fetch(url,function(data){
        console.log(data.data)
        that.setState({
          title:data.data.goods.name,
          img:data.data.goods.largeImage[0],
          nowpice:data.data.goods.vipshopPrice,
          didpice:data.data.goods.marketPrice,
          lists:data.data.goods.pmsList,
          nums:data.data.goods.obtainPollen,
          words:data.data.goods.descriptions,
          brandStoreName:data.data.goods.brandStoreName,
          productName:data.data.goods.productName,
          verticalImage:data.data.goods.verticalImage
        })
      },function(err){
        console.log(err)
      })
      //评价头
      var url1='http://w.lefeng.com/api/neptune/appraise/count/v1?spuId=7208087579139878913'
        Myajax.fetch(url1,function(data){
          that.setState({
            pj:data.data.greatScale,
            num:data.data.totalCount
          })
          // console.log(data.data)
        },function(err){
          console.log(err)
        })
        
        //评价内容
        var url2='http://w.lefeng.com/api/neptune/appraise/get_appraise_list/v1?page=1&pageSize=3&scoreLevel=0&spuId=7208087579139878913'
        Myajax.fetch(url2,function(data){
          // console.log(data.data)
          that.setState({
            list:data.data
          })
          console.log(data.data)
        },function(err){
          console.log(err)
        })
      
      }

    }
  render(){
      //详情页
      var img=this.state.img
      var image=[]
      image.push(img)

      var title=this.state.title
      var tie=[]
      tie.push(title)

      var nowpice=this.state.nowpice
      var np=[]
      np.push(nowpice)

      var didpice=this.state.didpice
      var dp=[]
      dp.push(didpice)

      var lists=this.state.lists
      var list=[]
      if(lists){
        for(var i=0; i<lists.length;i++){
          list.push(<p key={i}>
                  <span>{lists[i].type}</span>
                  {lists[i].msg}
                </p>)
        }
      }else{
        $('.xqcnt').css('display','none')
      }

      var nums=this.state.nums
      var ns=[]
      ns.push(nums)

      var words=this.state.words
      var wd=[]
      for(var i=0; i<words.length;i++){
        wd.push(<tr key={i}>
                  <th>{words[i].name}</th>
                  <td>{words[i].value}</td>
                </tr>)
      }

      var pimg=this.state.image
      var pimage=[]
      for(var i=0; i<pimg.length;i++){
        pimage.push(<img src={pimg[i]} alt="" key={i}/>)
      }

      //评价头
      var pj=this.state.pj
      var pjt=[]
      pjt.push(pj)

      var num=this.state.num
      var nm=[]
      nm.push(num)

      //评价内容
      var lt=this.state.list
      var pllist=[]
      for(var i=0; i<lt.length;i++){
        pllist.push(<div className='psd' key={i}>
                <p className="pt">
                  <span className="prs iconfont">&#xe64f;满意</span>
                  <span className="pls">{lt[i].authorName}</span>
                </p>
                <p className='pm'>{lt[i].content}</p>
              </div>)
      }
    return(
    	<div className='type'>
    		<header id='header'>
            <div className='xqHeader'>
                <b className='iconfont lt' onClick={this.back.bind(this)}>&#xe611;</b>
                <div className='ctn'>{tie}</div>
                <b className='iconfont rt' onClick={this.home.bind(this)}>&#xe630;</b>
            </div>
        </header>
    		<div id='content'>
          <div className="bottom">
            <div className="blt iconfont" onClick={this.cart.bind(this)}>&#xe651;<span>1</span></div>
            <div className="brt" onClick={this.jrcart.bind(this)}>加入购物车</div>
          </div>
          <div className="pdtp">
             <img src={image} alt=""/> 
          </div>
          <div className="pirce">
            <p className='title'>
              {tie}
              <b className="iconfont" onClick={this.cart.bind(this)}>&#xe64c;</b>
            </p>
            <div className="price">
              <span className='xsl'>￥<b>{np}</b></span>
              <span className='xsr'>￥{dp}</span>
            </div>
          </div>
          <div className="xqcnt">
            {list}
          </div>
          <div className="pingkjia">
            <div className='psp'>
              <span>商品评价（<b>{nm}</b>）</span>
              <span><b>{pjt}</b>好评</span>
            </div>
            {pllist}
          </div>
          <div className="huafen">
            <span>花粉</span>
            购买最多可获得<b>{ns}</b>个花粉
          </div>
          <div className="tabe">
            <div className="tatp">
              <div className='tatpl active' onClick={this.tablel.bind(this)}>商品详情</div>
              <div className='tatpr' onClick={this.tabler.bind(this)}>购物说明</div>
            </div>
            <div className="tabox1 tactive">
              <div className="tabox">
                <table>
                  <tbody>
                    {wd}
                  </tbody>
                </table>
              </div>
              <p className="tabox1p" onClick={this.tabox1p.bind(this)}>点击查看图文详情</p>
              <div className="taboximg">
               {pimage}
              </div>
            </div>
            <div className="tabox2">
              <h2>关于商品</h2>
              <p>乐蜂网上所售卖的商品均经过品牌授权，确保正品，并由中国太平洋财产保险股份有限公司为您购买的每一件商品进行承保。</p>
              
              <h2>商品价格说明</h2>
              <p>乐蜂展示的中间未划横线价格（显示如¥799）为乐蜂销售价，该价格是交易成交价，是您最终决定是否购买商品的依据。</p>
              <p>乐蜂展示的中间划横线价格（显示如￥1399）为参考价，采集自品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价可能会与您购物时展示的不一致。该价格仅供您参考。
              折扣比为乐蜂销售价与参考价的对比（该值四舍五入后采用小数点后1位，如¥799/¥2899=0.2756=2.8折），该对比值仅供您参考，不作为结算基数。</p>
              
              <h2>售后说明</h2>
              <p className='taboxp'>在您签收商品之日起的7天之内，乐蜂为您提供七天无理由放心退服务，但以下情形将不能退货：</p>
              <ol type='1'>
                <li>1、非乐蜂销售的商品，或有明显使用痕迹影响二次销售的商品；</li>
                <li>2、法律明确规定不适用七天无理由退货的商品；</li>
                <li>3、基于安全及健康的考虑，已拆封的食品、药品、保健品、化妆品、贴身用品等；</li>
                <li>4、已经激活的手机、电脑、数码产品等；</li>
                <li>5、已在线交付的充值类商品；</li>
                <li>6、未经授权的维修、误用、碰撞、疏忽、滥用、进液、事故、改动、不正确的安装所造成的商品质量问题，或撕毁、涂改标贴、机器序号、防伪标记；</li>
                <li>7、无法提供商品的发票（如已索要发票）、保修卡等三包凭证或者三包凭证信息与商品不符及被涂改的；</li>
                <li>8、礼包或套装中的商品不可以部分退换货。上述退货规则，客户一经购买，视为认可。</li>
              </ol>
            </div>
          </div>
          <h2 className='llp'>浏览本商品的用户还买了</h2>
          <div className="llbox"></div>
          <div className="kconbox"></div>
        </div>
    	</div>
    )
  }
}