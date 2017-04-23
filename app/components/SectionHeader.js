import React, { PropTypes } from 'react'
import { bottomSpace } from '../styles'

function SectionHeader ({ sectionName, children }) {
  return (
    <div className='col-sm-12' style={bottomSpace}>
      <h2>{sectionName}</h2>
      <hr/>
        {children}
    </div>
  )
}

SectionHeader.propTypes = {
  sectionName: PropTypes.string.isRequired
}

export default SectionHeader