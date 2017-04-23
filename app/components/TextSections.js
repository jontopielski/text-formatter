import React from 'react'
import TitleSection from './TitleSection'
import ParagraphSection from './ParagraphSection'
import MyEditor from './MyEditor'

const TextSections = React.createClass({
  getInitialState () {
    return {
      titleText: 'Name your masterpiece..',
      paragraphText: 'Tell your story..'
    }
  },
  componentDidMount() {
  /* axios.get(`${resume_bucket_url}/${this.props.resumeHashId}/resume.json`)
      .then((response) => {
        if (response.status === 200) {
        }
      })
      .catch((err) =>
        console.log(err)
      ) */
  },
  handleUpdateText (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  },
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
})

export default TextSections