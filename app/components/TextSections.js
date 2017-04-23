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
  componentDidMount() {
  /* axios.get(`${resume_bucket_url}/${this.props.resumeHashId}/resume.json`)
      .then((response) => {
        if (response.status === 200) {
        }
      })
      .catch((err) =>
        console.log(err)
      ) */
  }
  handleUpdateText (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <div className='col-lg-8 col-lg-offset-2 bg-success'>
        <p>Text Sections</p>
        <TitleSection 
          titleText={this.state.titleText}
          handleChangeText={this.handleUpdateText} />
        <ParagraphSection 
          paragraphText={this.state.paragraphText}
          handleChangeText={this.handleUpdateText} />
        <MyEditor />
      </div>
    )
  }
}
