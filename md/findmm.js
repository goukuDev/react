import React from 'react';
import {hashHistory} from 'react-router';
import './../scss/findmm.scss';


export default class Findmm extends React.Component {
  constructor(props) {
    super(props)
  }
  back(){
    window.history.go(-1)
  }
  fbtn(){
    var name=$('.fphone').val();
    var pwd=$('.newpwd').val();
    var surepwd=$('.surepwd').val();
    var username=localStorage.getItem(name)
    if(name==''|| pwd==''|| surepwd==''){
        setTimeout(function(){
          $('.conbox').html('请完整输入信息')
          $('.conbox').css('display','block')
        },200)
        setTimeout(function(){
          $('.conbox').css('display','none')
        },2200)
      }else{
        if(username==null){
          setTimeout(function(){
            $('.conbox').html('账号不存在，请先注册')
            $('.conbox').css('display','block')
          },200)
          setTimeout(function(){
            $('.newpwd').val('')
            $('.surepwd').val('')
            $('.fphone').val('')
            $('.conbox').css('display','none')
          },2200)
        }else{
          if(pwd!=surepwd){
            setTimeout(function(){
              $('.conbox').html('两次密码不一致，请重新输入')
              $('.conbox').css('display','block')
            },200)
            setTimeout(function(){
              $('.newpwd').val('')
              $('.surepwd').val('')
              $('.conbox').css('display','none')
            },2200)
          }else{
            setTimeout(function(){
              $('.conbox').html('修改成功，请记住新密码')
              $('.conbox').css('display','block')
              hashHistory.push({
                pathname:'/Login',
                query:{
                  i:'findmm'
                }
              })
            },200)
            setTimeout(function(){
              $('.newpwd').val('')
              $('.surepwd').val('')
              $('.fphone').val('')
              $('.conbox').css('display','none')
              localStorage.removeItem(name)
              var obj={
                name:name,
                pwd:pwd,
              }
              var objstr=JSON.stringify(obj)
              localStorage.setItem(name,objstr)
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
            <div className='findmmHeader'>
                <b className='iconfont lt' onClick={this.back.bind(this)}>&#xe611;</b>
                <div className='ctn'>找回密码</div>
                <b className='iconfont rt'></b>
            </div>
          </header>
          <div id='content'>
            <div className="findmmbox">
              <input type="text" placeholder='手机号' className='fphone'/>
              <input type="password" placeholder='新密码' className='newpwd'/>
              <input type="password" placeholder='确认密码' className='surepwd'/>
            </div>
            <input type="button" value='确定' className='fbtn' onClick={this.fbtn.bind(this)}/> 
            <div className="conbox"></div>
          </div>
        </div>
      </div>
    )
  }
}