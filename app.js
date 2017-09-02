import React from 'react';
import Reactdom from 'react-dom';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';


import './scss/main.scss';


import App from './md/App.js';
import Home from './md/Home.js';
import Kind from './md/Kind.js';
import Xiangqing from './md/xiangqing.js';
import User from './md/User.js';
import Login from './md/Login.js';
import Rejuster from './md/Rejuster.js';
import Findmm from './md/Findmm.js';
import Cart from './md/cart.js';
import Homexq from './md/Homexq.js';
import Zhifu from './md/zhifu.js';
import Newpoint from './md/newpoint.js';
/*import Cart from './md/Cart.js';
import More from './md/More.js';
import User from './md/User.js';*/

Reactdom.render((<Router history={hashHistory}>
				<Route path='/' component={App}>
				<IndexRoute component={Home}/>
				</Route>
				<Route path='Kind' component={Kind}/>
				<Route path='User' component={User}/>
				<Route path='Login' component={Login}/>
				<Route path='Rejuster' component={Rejuster}/>
				<Route path='Findmm' component={Findmm}/>
				<Route path='Cart' component={Cart}/>
				<Route path='Xiangqing' component={Xiangqing}/>
				<Route path='Homexq' component={Homexq}/>
				<Route path='Zhifu' component={Zhifu}/>
				<Route path='Newpoint' component={Newpoint}/>
		</Router>),document.getElementById("app"))
