import React from 'react'
import PropTypes from 'prop-types'
import ContentEditable from 'react-contenteditable'

function ParagraphSection ({ paragraphText, handleChangeText }) {
    return (
      <ContentEditable
        html={paragraphText}
        disabled={false}
        onChange={handleChangeText}
      />
    )
}

ParagraphSection.propTypes = {
  paragraphText: PropTypes.string.isRequired,
  handleChangeText: PropTypes.func.isRequired
}

export default ParagraphSection