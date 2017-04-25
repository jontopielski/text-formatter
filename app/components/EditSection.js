import React from 'react'
import axios from 'axios'
import MainBody from './MainBody'
import SideBarBody from './SideBarBody'
import ParagraphSection from './ParagraphSection'
import { pages_url } from '../config/Globals'
import { EditorState } from 'draft-js'

class EditSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hashId: this.props.match.params.hashId
    }
  }
  render() {
    console.log('EditSection')
    console.log(this.props.match.params.hashId)
    console.log(this.state.editorState)
    return (
      <div>
        <MainBody />
        <div className='col-lg-8 col-lg-offset-2'>
          <ParagraphSection
            hashId={this.state.hashId}
          />
        </div>
        <SideBarBody />
      </div>
    )
  }
}

export default EditSection