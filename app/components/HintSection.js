import React, { PropTypes } from 'react'

function HintSection ({ sectionName, hintList }) {
  return (
    <div className='panel panel-info' style={{marginTop: '1em'}}>
      <div className='panel-heading'>
        <h3 className='panel-title'><strong>{sectionName} Tips</strong></h3>
      </div>
      <div className='panel-body'>
        <ul className='list'>
          {
            hintList.map((hint, i) =>
              <li key={i}>
                <p className='lead' style={{fontSize: '16px'}}>
                  {hint}
                </p>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

HintSection.propTypes = {
  sectionName: PropTypes.string.isRequired,
  hintList: PropTypes.array.isRequired
}

export default HintSection