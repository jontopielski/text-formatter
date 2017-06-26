import React from 'react'
import { maxHeight } from '../styles'
import NavBar from './NavBar'

export default class Root extends React.Component {
  constructor(props) {
    super(props)
  }
	render() {
    return (
      <div className='container-fluid' style={{fontFamily: "openSans"}}>
        <NavBar />
        {this.props.children}
      </div>
    )
	}
}
