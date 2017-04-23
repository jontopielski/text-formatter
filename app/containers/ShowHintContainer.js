import React, { PropTypes } from 'react'

function ShowHintContainer({ showHint, sectionName, handleToggleHint, children }) {
  return showHint ? 
  (
    <div style={{marginBottom: '1em'}}>
      <button
        className='btn list-group-item-info'
        type="submit"
        onClick={() => handleToggleHint(sectionName)}>
          <i className='fa fa-info-circle' /> {'Close Tips'}
      </button>
      {children}
    </div>
  ) :
  (
    <div style={{marginBottom: '1em'}}>
      <button
        className='btn list-group-item-info'
        type="submit"
        onClick={() => handleToggleHint(sectionName)}>
          <i className='fa fa-info-circle' /> {'Show Tips'}
      </button>
    </div>
  )
}

ShowHintContainer.propTypes = {
  sectionName: PropTypes.string.isRequired,
  showHint: PropTypes.bool.isRequired,
  handleToggleHint: PropTypes.func.isRequired
}

export default ShowHintContainer