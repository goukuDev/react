import React from 'react';
import {hashHistory} from 'react-router';
import './../scss/newpoint.scss';
import Myajax from './Myajax.js';


export default class Xiangqing extends React.Component {
    constructor(props) {
        super(props),
        this.state=({
            Province:[],
            city:[],
            county:[],
            Township:[]
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
    btn(){
        var name=$('.npname').val()
        var call=$('.npcall').val()
        var xxdz=$('.npxxdz').val()
        var reg=/^1[34578]\d{9}$/
        var obj={
            username:name,
            call:call,
            xxdz:xxdz
        }
        var objstr=JSON.stringify(obj)
        if(name!='' && xxdz!='' && (reg.test(call))==true){
            setTimeout(function() {
                $('.npcavans').css('display','block')
                $('.kconbox').html('信息正确')
            }, 200);
            setTimeout(function(){
                $('.npcavans').css('display','none')
                hashHistory.push({
                    pathname:'/Zhifu'
                })
                localStorage.setItem('nwepoint',objstr)
            },1200)
        }else{
            if(name==''){
                setTimeout(function() {
                $('.npcavans').css('display','block')
                $('.kconbox').html('请填写姓名')
                }, 200);
                setTimeout(function(){
                    $('.npcavans').css('display','none')
                },1200)
            }
            if(call==''){
                setTimeout(function() {
                $('.npcavans').css('display','block')
                $('.kconbox').html('请填写收货人手机号码')
                }, 200);
                setTimeout(function(){
                    $('.npcavans').css('display','none')
                },1200)
            }else if((reg.test(call))==false){
                setTimeout(function() {
                $('.npcavans').css('display','block')
                $('.kconbox').html('请填写正确手机号码格式')
                }, 200);
                setTimeout(function(){
                    $('.npcavans').css('display','none')
                },1200)
            }
            if(xxdz==''){
                setTimeout(function() {
                $('.npcavans').css('display','block')
                $('.kconbox').html('请填写详细地址')
                }, 200);
                setTimeout(function(){
                    $('.npcavans').css('display','none')
                },1200)
            }
        }
        
    }
    Province(){
        var that=this
        var options=$("#Province option:selected"); //获取选中的项 
        var val=options.val()
        console.log(val)
        var url='https://w-ssl.lefeng.com/api/neptune/address/getAddressFullInfoByCode/v1?areaId='+val
        Myajax.fetch(url,function(data){
            // console.log(data.data)
            that.setState({
                city:data.data.list              
            })
        },function(err){
            console.log(err)
        })
    }
    city(){
        var that=this
        var options=$("#city option:selected"); //获取选中的项 
        var val=options.val()
        console.log(val)
        var url='https://w-ssl.lefeng.com/api/neptune/address/getAddressFullInfoByCode/v1?areaId='+val
        Myajax.fetch(url,function(data){
            // console.log(data.data.list)
            that.setState({
                county:data.data.list              
            })
        },function(err){
            console.log(err)
        })
    }
    county(){
        var that=this
        var options=$("#county option:selected"); //获取选中的项 
        var val=options.val()
        console.log(val)
        var url='https://w-ssl.lefeng.com/api/neptune/address/getAddressFullInfoByCode/v1?areaId='+val
        Myajax.fetch(url,function(data){
            console.log(data.data.list)
            that.setState({
                county:data.data.list              
            })
        },function(err){
            console.log(err)
        })
    }
    Township(){
        var that=this
        var options=$("#Township option:selected"); //获取选中的项 
        var val=options.val()
        console.log(val)
        var url='https://w-ssl.lefeng.com/api/neptune/address/getAddressFullInfoByCode/v1?areaId='+val
        Myajax.fetch(url,function(data){
            console.log(data.data.list)
            that.setState({
                Township:data.data.list              
            })
        },function(err){
            console.log(err)
        })
    }
    sf(ev){

    }
    componentWillMount(){
        var that=this
        var url='https://w-ssl.lefeng.com/api/neptune/address/getAddressFullInfoByCode/v1'
        Myajax.fetch(url,function(data){
            // console.log(data.data.list)
            that.setState({
                Province:data.data.list              
            })
        },function(err){
            console.log(err)
        })
        var url='https://w-ssl.lefeng.com/api/neptune/address/getAddressFullInfoByCode/v1?areaId=101101'
        Myajax.fetch(url,function(data){
            // console.log(data.data)
            that.setState({
                city:data.data.list              
            })
        },function(err){
            console.log(err)
        })
        var url='https://w-ssl.lefeng.com/api/neptune/address/getAddressFullInfoByCode/v1?areaId=101101101101'
        Myajax.fetch(url,function(data){
            // console.log(data.data.list)
            that.setState({
                county:data.data.list              
            })
        },function(err){
            console.log(err)
        })
        var url='https://w-ssl.lefeng.com/api/neptune/address/getAddressFullInfoByCode/v1?areaId=911101101101'
        Myajax.fetch(url,function(data){
            // console.log(data.data)
            that.setState({
                Township:data.data.list              
            })
        },function(err){
            console.log(err)
        })
    }
    render(){
        var Province=this.state.Province
        // console.log(Province)
        var pro=[]
        for(var i in Province){
            pro.push(<option  key={i} value={Province[i].id}>{Province[i].name}</option>)
        }

        var city=this.state.city
        // console.log(city)
        var ct=[]
        for(var i in city){
            ct.push(<option  key={i} value={city[i].id}>{city[i].name}</option>)
        }
        

        var county=this.state.county
        // console.log(county)
        var ctry=[]
        for(var i in county){
            ctry.push(<option  key={i} value={county[i].id}>{county[i].name}</option>)
        }

        var Township=this.state.Township
        // console.log(Township)
        var Tp=[]
        for(var i in Township){
            Tp.push(<option  key={i} value={Township[i].id}>{Township[i].name}</option>)
        }





        return(
            <div className='type'>
            <header id='header'>
                <div className='NpHeader'>
                    <b className='iconfont lt' onClick={this.back.bind(this)}>&#xe611;</b>
                    <div className='ctn'>新增地址</div>
                    <b className='iconfont rt' onClick={this.home.bind(this)}>&#xe630;</b>
                </div>
            </header>
            <div id='content'>
                <div className="nptop">
                    <ul>
                        <li>
                            <div className="nplet">收货人</div>
                            <input type='text' className="nprit npname"/>
                        </li>
                        <li>
                            <div className="nplet">身份证</div>
                            <input type='text' className="nprit"/>
                            {/* <span className='npletp'>当购买海淘商品时，需填写收货人身份证信息</span> */}
                        </li>
                        <li>
                            <div className="nplet">手机号</div>
                            <input type='text' className="nprit npcall"/>
                        </li>
                        <li>
                            <div className="nplet">收货时间</div>
                            <select type='text' className="nprit">
                                 <option>收货时间不限</option>
                                 <option>周六日/节假日收货</option>
                                 <option>周一至周五收货</option>
                            </select>
                        </li>
                    </ul>
                </div>
                <div className="npbtm">
                    <ul>
                        <li>
                            <div className="nplet">省份</div>
                            <select type='text' className="nprit"  id='Province' onClick={this.Province.bind(this)}>
                                {pro}
                            </select>
                        </li>
                        <li>
                            <div className="nplet">城市</div>
                            <select type='text' className="nprit"  id='city' onClick={this.city.bind(this)}>
                                 {ct} 
                            </select>
                        </li>
                        <li>
                            <div className="nplet">县/区</div>
                            <select type='text' className="nprit" id='county' onClick={this.county.bind(this)}>
                                {ctry}
                            </select>
                        </li>
                        <li>
                            <div className="nplet">街道</div>
                            <select type='text' className="nprit" id='Township' onClick={this.Township.bind(this)}>
                                {Tp}
                            </select>
                        </li>
                        <li>
                            <div className="nplet">详细地址</div>
                            <input type='text' className="nprit npxxdz"/>
                        </li>
                    </ul>
                </div>
                <input type="button" value='保存' className='npbutton' onClick={this.btn.bind(this)}/>
            </div>
            <div className="npcavans">
                <div className="kconbox"></div>
            </div>
        </div>
        )
    }
}