import React from 'react'
import axios from 'axios'
import EditResumeContainer from '../containers/EditResumeContainer'
import ResumeContainer from '../containers/ResumeContainer'
import { transparentBg, floatLeft, floatRight, space, resumePageStyle } from '../styles'
import { server_url, resume_bucket_url } from '../config/Globals'

const ResumePage = React.createClass({
  getInitialState() {
    const resumeHash = this.props.params.hashId
    return {
      resumeData: {},
      updateResume: false,
      hashId: resumeHash
    }
  },
  handleUpdateResumeData(sectionName, updatedData) {
    const updatedResumeData = this.state.resumeData
    updatedResumeData[sectionName] = updatedData
    this.setState({
      resumeData: updatedResumeData
    })
  },
  // shouldUpdate is a boolean
  setUpdateResume(shouldUpdate) {
    this.setState({
      updateResume: shouldUpdate
    })
  },
  componentDidMount() {
    axios({
      method: 'post',
      url: `${server_url}/initialize?hashId=${this.state.hashId}`
    })
    .then((response) => {
      this.setState({
        updateResume: true
      }, () => this.setUpdateResume(false))
    })
    .catch((err) => console.log(err))
  },
  render() {
    return (
      <div className="fa col-xs-12" style={resumePageStyle}>
        <div style={floatLeft}>
          <EditResumeContainer
            resumeData={this.state.resumeData}
            updateMainResumeData={this.handleUpdateResumeData}
            resumeHashId={this.state.hashId} />
        </div>
        <div style={floatRight}>
          <ResumeContainer
            shouldUpdateResume={this.state.updateResume}
            resumeHashId={this.state.hashId}
            resumeData={this.state.resumeData} />
        </div>
      </div>
    )
  }
})

export default ResumePage