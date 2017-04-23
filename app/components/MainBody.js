import React from 'react'
import TextSections from './TextSections'
import SideBarBody from './SideBarBody'
import MyEditor from './MyEditor'

class MainBody extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('MainBody')
    return (
      <div className='container-fluid bg-warning'>
        <p>Main Body</p>
        <TextSections />
        <SideBarBody />
      </div>
    )
  }
}

export default MainBody