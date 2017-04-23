import React from 'react'
import PropTypes from 'prop-types'
import ContentEditable from 'react-contenteditable'


function TitleSection ({ titleText, handleChangeText }) {
    return (
      <ContentEditable
        html={titleText}
        disabled={false}
        onChange={handleChangeText}
      />
    )
}

TitleSection.propTypes = {
  titleText: PropTypes.string.isRequired,
  handleChangeText: PropTypes.func.isRequired
}

export default TitleSection