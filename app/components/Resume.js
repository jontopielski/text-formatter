import React, { PropTypes } from 'react'
import { uploaded_resume_url, resume_bucket_url } from '../config/Globals'
import { transparentBg, resumeStyle } from '../styles'

function Resume ({ isLoading, resumeHashId, randNumRefresh }) {
  console.log('Rendering the resume..')
  console.log(randNumRefresh)
  return isLoading ?
  (
    <div style={{textAlign: 'center', marginTop: '3em', height: '10%'}}>
      <i className="fa fa-spinner fa-spin fa-5x fa-fw"></i>
    </div>
  ) :
  (
    <div style={ resumeStyle }>
      <embed src={resume_bucket_url + `/${resumeHashId}/resume.pdf`} width="100%" height="100%" id={randNumRefresh} />
    </div>
  )
}

Resume.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  resumeHashId: PropTypes.string.isRequired,
  randNumRefresh: PropTypes.number.isRequired
}

export default Resume