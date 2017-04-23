import React from 'react'
import TextSections from './TextSections'
import SideBarBody from './SideBarBody'

const MainBody = React.createClass({
  render() {
    return (
      <div className='container-fluid bg-warning'>
        <p>Main Body</p>
        <TextSections />
        <SideBarBody />
      </div>
    )
  }
})

export default MainBody