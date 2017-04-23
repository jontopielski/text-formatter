import React from 'react'
import TitleSection from './TitleSection'
import ParagraphSection from './ParagraphSection'

const TextSections = React.createClass({
  render() {
    return (
      <div className='col-lg-8 col-lg-offset-2 bg-success'>
        <p>Text Sections</p>
        <TitleSection />
        <ParagraphSection />

      </div>
    )
  }
})

export default TextSections