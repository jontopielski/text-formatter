import React from 'react'
import TextSections from './TextSections'
import SideBarBody from './SideBarBody'
import { mainBodyStyles } from '../styles/main_body'

class MainBody extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('MainBody')
    return (
      <div className='container-fluid'>
        <div style={mainBodyStyles.headerStyling}>
          <h1 style={mainBodyStyles.primaryText}>Paraform</h1>
          <p style={mainBodyStyles.descriptionText}>Tell your story..</p>
        </div>
        <div>
          <TextSections />
          <SideBarBody />
        </div>
      </div>
    )
  }
}

export default MainBody