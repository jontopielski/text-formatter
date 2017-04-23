import React from 'react'
import { maxHeight } from '../styles'
import LandingPage from './LandingPage'
import NavBar from './NavBar'

const Root = React.createClass({
	render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    )
	}
})

export default Root