import React from 'react'
import TitleSection from './TitleSection'
import ParagraphSection from './ParagraphSection'
import MyEditor from './MyEditor'

export default class TextSections extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      titleText: 'Name your masterpiece..',
      paragraphText: 'Tell your story..'
    }
    this.handleUpdateText = this.handleUpdateText.bind(this)
  }
  handleUpdateText (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <div className='col-lg-8 col-lg-offset-2'>
        <ParagraphSection />
      </div>
    )
  }
}
