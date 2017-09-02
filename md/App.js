import React from 'react';
import {IndexLink,Link} from 'react-router';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <div id='container'>
		      	{this.props.children}
			</div>
    )
  }
}
