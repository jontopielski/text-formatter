import React from 'react'
import MainBody from './MainBody'

class EditSection extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('EditSection')
    return (
      <div>
        <MainBody />
      </div>
    )
  }
}

export default EditSection