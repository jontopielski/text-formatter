import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { space, transparentBg } from '../styles'

function ErrorPage() {
  return (
    <div className="jumbotron col-sm-6 col-sm-offset-3" style={transparentBg}>
      <h1 className='text-center' style={space}>{`The servers are currently down`}</h1>
      <h2 className='text-center' style={space}>{`Please try again in a few minutes :(`}</h2>
      <div className='col-sm-4 col-sm-offset-5' style={space}>
        <Link to='/'>
          <button className='btn btn-danger' type='submit'>
            Go Back
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage