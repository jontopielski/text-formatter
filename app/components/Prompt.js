import React, { PropTypes } from 'react'
import styles from '../styles'
import classNames from 'classnames'

function Prompt (props) {
  const formClass = classNames({
    'form-group': true
  })
  return (
    <div className="jumbotron text-center" style={{background: 'transparent'}}>
      <div className="col-sm-12">
        <form onSubmit={props.onSubmitData}>
          <div className={formClass}>
            <input
              className="form-control"
              placeholder="Enter resume data"
              onChange={props.onUpdateData}
              type="text"/>
          </div>
          <div className="form-group col-sm-4 col-sm-offset-4">
            <button
              className="btn btn-block btn-success"
              type="submit">
                Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

Prompt.propTypes = {
  onSubmitData: PropTypes.func.isRequired,
  onUpdateData: PropTypes.func.isRequired
}

module.exports = Prompt;