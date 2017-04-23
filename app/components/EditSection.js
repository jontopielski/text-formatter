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
      // editorState: EditorState.createEmpty()
    }
  }
  // componentDidMount() {
  //   console.log('Checking for existing hashId..')
  //   axios.get(`${pages_url}/${this.state.hashId}/editor_state.json`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log('Found existing data!')
  //         console.log(response.data)
  //         this.editorState = response.data
  //       }
  //     })
  //     .catch((err) =>
  //       console.log(err)
  //     )
  //   }
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