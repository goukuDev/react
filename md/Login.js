import React from 'react';
import {hashHistory} from 'react-router';
import './../scss/login.scss';



export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      temp:true,
      mdl:true
    }
  }
  back(){
    window.history.go(-1)
  }
  backhome(){
    hashHistory.push({
      pathname:'/'
    })
  }
  zc(){
    hashHistory.push({
      pathname:'/Rejuster'
    })
  }
  forget(){
    hashHistory.push({
      pathname:'/Findmm'
    })
  }
  eyes(){
    var temp=this.state.temp
    if(temp){
      $('.lpwd').attr('type','text')
      $('.eyes').html('&#xe642;')
      temp=false
      this.setState({
        temp:temp
      })
    }else{
      $('.lpwd').attr('type','password')
      $('.eyes').html('&#xe641;')
      temp=true
      this.setState({
        temp:temp
      })
    }
    
  }
    mdl(){
      var mdl=this.state.mdl
      if(mdl){
        $('.bmdl').css('color','red')
        mdl=false
        this.setState({
          mdl:mdl
        })
      }else{
        $('.bmdl').css('color','black')
        mdl=true
        this.setState({
          mdl:mdl
        })
      }
    }
    denglu(i){
      var that=this
      var name=$('.lname').val()
      var pwd=$('.lpwd').val()
      var username=localStorage.getItem(name)
      if(name=='' || pwd==''){
        setTimeout(function(){
          $('.conbox').html('请输入正确手机号码')
          $('.conbox').css('display','block')
        },200)
        setTimeout(function(){
          $('.conbox').css('display','none')
        },2200)
      }else{
        if(username==null){
          setTimeout(function(){
            $('.conbox').html('号码不存在，请先注册')
            $('.conbox').css('display','block')
          },200)
          setTimeout(function(){
            $('.lname').val('')
            $('.lpwd').val('')
            $('.conbox').css('display','none')
          },2200)
        }else{
          if(JSON.parse(username).pwd != pwd){
            setTimeout(function(){
              $('.conbox').html('密码错误')
              $('.conbox').css('display','block')
            },200)
            setTimeout(function(){
              $('.lpwd').val('')
              $('.conbox').css('display','none')
            },2200)
          }else{
            setTimeout(function(){
              $('.conbox').html('登录成功')
              $('.conbox').css('display','block')
              localStorage.setItem('name',name)
            },200)
            setTimeout(function(){
              $('.lname').val('')
              $('.lpwd').val('')
              $('.conbox').css('display','none')
              console.log(that.props)
              if(that.props.location.query.i=='kind'){
                hashHistory.push({
                  pathname:'/Kind'
                })
              }else{
                hashHistory.push({
                  pathname:'/User'
                })
              }
              // if(that.props.location.query.i=='rejuster'){
              //   hashHistory.push({
              //     pathname:'/User'
              //   })
              // }
              // window.history.go(-1)
            },2200)
          }
        }
      }

    }
  render(){
    return(
    	<div id='container'>
        <div className='type'>
          <header id='header'>
              <div className='loginHeader'>
                  <b className='iconfont lt' onClick={this.back.bind(this)}>&#xe611;</b>
                  <div className='ctn'>登录</div>
                  <b className='iconfont rt' onClick={this.backhome.bind(this)}>&#xe630;</b>
              </div>
    	    </header>
          <div id='content'>
            <div className="lrl">
              <input type="text" className='lname' placeholder='请输入已注册的手机号码'/>
              <input type="password" className='lpwd' placeholder='密码'/>
              <b className="iconfont eyes" onClick={this.eyes.bind(this)}>&#xe641;</b>
            </div>
            <div className='mdl' onClick={this.mdl.bind(this)}>
              <b className="iconfont bmdl">&#xe640;</b>一个月内免登录
            </div>
            <input type="button"  value='登录' className='btn' onClick={this.denglu.bind(this,'你好')}/>
            <div className="zc">
              <span onClick={this.zc.bind(this)}>立即注册</span>
              <span onClick={this.forget.bind(this)}>忘记密码</span>
            </div>
            <div className="conbox"></div>
          </div>
        </div>
      </div>
    )
  }
}
