import React from 'react'

export default class SideBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div style={{paddingLeft: '3.65em'}}>
        <ul className="fa-ul">
          <li><a className="btn btn-primary" aria-label="Settings">
            <i className="fa fa-twitter" aria-hidden="true"></i>
          </a></li>
          <li><br /></li>
          <li><a className="btn btn-primary" aria-label="Settings">
            <i className="fa fa-facebook-official" aria-hidden="true"></i>
          </a></li>
          <li><br /></li>
          <li><a className="btn btn-primary" aria-label="Settings">
            <i className="fa fa-lg fa-bookmark" aria-hidden="true"></i>
          </a></li>
        </ul>
      </div>
    )
  }
}