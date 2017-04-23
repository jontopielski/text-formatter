import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { server_url } from '../config/Globals'
import { landingPageStyles } from '../styles/landing_page'

const LandingPage = React.createClass({
  getInitialState() {
    return {
      hashId: ''
    }
  },
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
  },
  render () {
    return (
      <div className='fa' style={landingPageStyles.maxHeightWidth}>
        <div style={landingPageStyles.headerStyling}>
          <h1 style={landingPageStyles.primaryText}>Basic CS Resume</h1>
          <p style={landingPageStyles.descriptionText}>Easily build a professional looking resume</p>
          <Link to={`/edit/${this.state.hashId}`}>
            <button type='button' className='btn btn-lg btn-primary' style={landingPageStyles.buttonStyling}>
              Get Started
            </button>
          </Link>
        </div>

        <div className='container' style={{height: '30%', position: 'relative'}}>
          <div className='row'>
            <div className='col-xs-12 col-sm-6 col-md-3' style={landingPageStyles.verticalCenterLg}>
              <div className='card' style={landingPageStyles.cardStyling}>
                <i className='fa fa-thumbs-o-up fa-4x' />
                <h2 style={landingPageStyles.secondaryText}>Easy</h2>
                <p style={landingPageStyles.cardText}> Create a resume instantly, no LaTeX knowledge required</p>
              </div>
            </div>
            <div className='col-xs-12 col-sm-6 col-md-3' style={landingPageStyles.verticalCenterLg}>
              <div className='card' style={landingPageStyles.cardStyling}>
                <i className='fa fa-file fa-4x' />
                <h2 style={landingPageStyles.secondaryText}>Beautiful</h2>
                <p style={landingPageStyles.cardText}>Uses LaTeX, a language built for formatting</p>
              </div>
            </div>
            <div className='col-xs-12 col-sm-6 col-md-3' style={landingPageStyles.verticalCenterLg}>
              <div className='card' style={landingPageStyles.cardStyling}>
                <i className='fa fa-bar-chart-o fa-4x' />
                <h2 style={landingPageStyles.secondaryText}>Effective</h2>
                <p style={landingPageStyles.cardText}>A better resume means better employer responses</p>
              </div>
            </div>
            <div className='col-xs-12 col-sm-6 col-md-3' style={landingPageStyles.verticalCenterLg}>
              <div className='card' style={landingPageStyles.cardStyling}>
                <i className='fa fa-cloud fa-4x' />
                <h2 style={landingPageStyles.secondaryText}>Cloud</h2>
                <p style={landingPageStyles.cardText}>Cloud-based hosting ensures reliability and reusability</p>
              </div>
            </div>
          </div>
        </div>

        <div style={landingPageStyles.footerStyling}>
          <ul className='list-inline' stlye={{position: 'absolute'}}>
            <li>
              <div style={landingPageStyles.verticalCenter}>
                <p style={landingPageStyles.contactText}>
                  Questions? Feel free to contact me at <a href='mailto:jontopielski@gmail.com'>jontopielski@gmail.com</a>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
})

export default LandingPage