import React from 'react'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('NavBar')
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top" style={{position: 'inherit'}}>
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">
                <i className="fa fa-paragraph" aria-hidden="true" />
              </a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><a href="#">Host <span className="sr-only">(current)</span></a></li>
                <li><a href="#">Night Mode</a></li>
                <li><a href="#"><i className="fa fa-github" aria-hidden="true"/> Source</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">By Jon Topielski</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}