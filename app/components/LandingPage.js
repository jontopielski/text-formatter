import React from 'react'
import MainBody from './MainBody'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { server_url } from '../config/Globals'
import { mainBodyStyles } from '../styles/main_body'

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hashId: ''
    }
  }
  componentDidMount() {
    axios.get(`${server_url}/hash`)
      .then((response) => {
        console.log(response.data)
        if (response.status === 200) {
          this.setState({
            hashId: response.data
          })
        }
      })
      .catch((err) =>
        console.log(err)
      )
  }
  render() {
    console.log('Landing Page')
    return (
      <div>
        <MainBody />
        <div className='text-center'>
          <Link to={`/pages/${this.state.hashId}`}>
            <button type='button' className='btn btn-lg btn-primary' style={mainBodyStyles.buttonStyling}>
              Get Started
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default LandingPage