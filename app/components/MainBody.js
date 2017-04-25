import React from 'react'
import TextSections from './TextSections'
import SideBarBody from './SideBarBody'
import { mainBodyStyles } from '../styles/main_body'

class MainBody extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div style={mainBodyStyles.headerStyling}>
        <h1 style={mainBodyStyles.primaryText}>Paraform</h1>
        <p style={mainBodyStyles.descriptionText}>Instantly start writing, editing, and collaborating on documents.</p>
      </div>
    )
  }
}

export default MainBody