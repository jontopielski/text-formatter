import React from 'react'
import SideBar from './SideBar'

const SideBarBody = React.createClass({
  render() {
    return (
      <div className='col-lg-2 bg-info'>
        <p>Side Bar Body</p>
        <SideBar />
      </div>
    )
  }
})

export default SideBarBody