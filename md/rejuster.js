import React from 'react';
import {hashHistory} from 'react-router';
import './../scss/rejuster.scss';


export default class Rejuster extends React.Component {
  constructor(props) {
    super(props)
  }
  back(){
    window.history.go(-1)
  }
  //点击注册事件
  btn(){
    var reg=/^1[34578]\d{9}$/
    var name=$('.name').val()
    var pwd=$('.pwd').val()
    var obj={
      name:name,
      pwd:pwd
    }
    var objstr=JSON.stringify(obj)
    if(name =='' || pwd =='' || (reg.test(name))==false){
      setTimeout(function(){
        $('.conbox').html('请输入正确手机号码')
        $('.conbox').css('display','block')
      },200)
      setTimeout(function(){
        $('.conbox').css('display','none')
      },2200)
    }else{
     var username=localStorage.getItem(name)
     if(username==null){
        localStorage.setItem(name,objstr)
        setTimeout(function(){
          $('.conbox').html('注册成功')
          $('.conbox').css('display','block')
        },200)
        setTimeout(function(){
          $('.name').val('')
          $('.pwd').val('')
          $('.conbox').css('display','none')
          hashHistory.push({
            pathname:'/Login',
            query:{
              i:'rejuster'
            }
          })
        },2200)
     }else{
        setTimeout(function(){
          $('.conbox').html('该号码已经注册过')
          $('.conbox').css('display','block')
        },200)
        setTimeout(function(){
          $('.conbox').css('display','none')
        },2200)
     }

    }
  }

  render(){
    return(
      <div id='container'>
        <div className='type'>
          <header id='header'>
            <div className='rejusterHeader'>
                <b className='iconfont lt' onClick={this.back.bind(this)}>&#xe611;</b>
                <div className='ctn'>注册</div>
                <b className='iconfont rt'></b>
            </div>
          </header>
          <div id='content'>
            <div className="rejusterbox">
              <input type="text" placeholder='手机号' className='name'/>
              <input type="password" placeholder='输入密码' className='pwd'/>

            </div>
              <input type="button" className='rebtn' value='注册' onClick={this.btn.bind(this)}/>
              <div className="conbox"></div>
          </div>
        </div>
      </div>
    )
  }
}