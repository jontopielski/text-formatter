import React from 'react'
import SideBar from './SideBar'

export default class SideBarBody extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='col-lg-2 bg-info'>
        <p>Side Bar Body</p>
        <SideBar />
      </div>
    )
  }
}
