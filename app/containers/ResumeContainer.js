import React, { PropTypes } from 'react'
import axios from 'axios'
import Resume from '../components/Resume'
import { uploaded_resume_url, server_url, current_version, resume_bucket_url } from '../config/Globals'
import { space, maxHeight } from '../styles'

const ResumeContainer = React.createClass({
  getInitialState() {
    return {
      isLoading: true,
      randNumRefresh: 0
    }
  },
  componentDidMount() {
    axios.get(uploaded_resume_url)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoading: false
          })
        }
      })
      .catch((err) => console.log(err))
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateResume) {
      this.setState({
        isLoading: true
      })
    } else {
      this.setState({
        isLoading: false
      })
    }
  },
  // ${resume_bucket_url}/${this.resumeHashId}/resume.pdf
  handleSubmit(e) {
    // Create a random number to force resume to update
    const randNum = Math.floor(Math.random() * 10000);
    e.preventDefault()
    this.setState({ // Prompt re-rendering of resume
      isLoading: true,
      randNumRefresh: randNum
    })
    axios({
      method: 'post',
      url: `${server_url}/generate?hashId=${this.props.resumeHashId}`,
      data: formatJsonData(this.props.resumeData)
    })
    .then((response) => {
      this.setState({ // Prompt re-rendering of resume
        isLoading: false
      })
    })
    .catch((err) => console.log(err))
  },
  render() {
    return (
      <div style={{height: '90%'}}>
        <div style={{margin: '1em 1em 1em 1em'}}>
          <div style={{display: 'inline'}}>
            <button
              className='btn btn-success'
              type="submit"
              onClick={this.handleSubmit}>
                Update Resume
            </button>
          </div>
          <div style={{display: 'inline', float: 'right'}}>
            <a
              target='_blank'
              className='btn btn-default'
              href={'https://goo.gl/forms/KwlhgrfYLV8FdKm63'}>
              <i className='fa fa-commenting-o' /> Leave Feedback
            </a>
          </div>
          <div style={{display: 'inline', float: 'right', marginRight: '1.5em'  }}>
            <a
              target='_blank'
              className='btn btn-default'
              href={'https://goo.gl/forms/nMxwyXShk6d43E7w1'}>
              <i className='fa fa-bug' /> Report Bug
            </a>
          </div>
          <div style={{display: 'inline', float: 'right', marginRight: '1.5em'}}>
            <a
              className='btn btn-primary'
              href={`${resume_bucket_url}/${this.props.resumeHashId}/resume.pdf`}
              download='resume.pdf'>
                <i className='fa fa-download' /> Download .pdf
            </a>
          </div>
        </div>
        <div style={maxHeight}>
          <Resume
            isLoading={this.state.isLoading}
            resumeHashId={this.props.resumeHashId}
            randNumRefresh={this.state.randNumRefresh} />
        </div>
      </div>
    )
  }
})

ResumeContainer.propTypes = {
  shouldUpdateResume: PropTypes.bool.isRequired,
  resumeHashId: PropTypes.string.isRequired,
  resumeData: PropTypes.object.isRequired
}

function formatJsonData(data) {
  const json_data = {}

  json_data['version'] = current_version
  json_data['sections'] = []

  let index = 0

  if (data['header']) {
    json_data['sections'][index] = data['header']
    json_data['sections'][index]['sectionName'] = 'header'
    index++
  }

  if (data['education']) {
    json_data['sections'][index] = data['education']
    json_data['sections'][index]['sectionName'] = 'education'
    index++
  }

  if (data['experience']) {
    json_data['sections'][index] = data['experience']
    json_data['sections'][index]['sectionName'] = 'experience'
    index++
  }

  if (data['projects']) {
    json_data['sections'][index] = data['projects']
    json_data['sections'][index]['sectionName'] = 'projects'
    index++
  }

  if (data['coursework']) {
    json_data['sections'][index] = data['coursework']
    json_data['sections'][index]['sectionName'] = 'coursework'
    index++
  }

  if (data['skills']) {
    json_data['sections'][index] = data['skills']
    json_data['sections'][index]['sectionName'] = 'skills'
    index++
  }


  return json_data
}

export default ResumeContainer
