import React from 'react'
import { maxHeight } from '../styles'
import NavBar from './NavBar'

export default class Root extends React.Component {
  constructor(props) {
    super(props)
  }
	render() {
    console.log('Root')
    return (
      <div style={{fontFamily: "openSans"}}>
        <NavBar />
        {this.props.children}
      </div>
    )
	}
}
