import React from 'react'
import TextSections from './TextSections'
import SideBarBody from './SideBarBody'
import { mainBodyStyles } from '../styles/main_body'

class MainBody extends React.Component {
  constructor(props) {
    super(props)
    // let hashId = '';
    // // console.log(this.props)
    // if (!(typeof this.props.params === 'undefined') && !(typeof this.props.params.hashId === 'undefined')) {
    //   hashId = this.props.params.hashId;
    // }
    // console.log('hashId:' + hashId);
    // this.state = {
    //   hashId: hashId
    // };
  }
  render() {
    console.log('MainBody')
    return (
      <div style={mainBodyStyles.headerStyling}>
        <h1 style={mainBodyStyles.primaryText}>Paraform</h1>
        <p style={mainBodyStyles.descriptionText}>Tell your story..</p>
      </div>
    )
  }
}

export default MainBody