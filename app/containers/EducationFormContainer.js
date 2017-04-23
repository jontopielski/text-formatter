import React, { PropTypes } from 'react'
import axios from 'axios'
import EducationForm from '../components/EducationForm'
import { resume_bucket_url } from '../config/Globals'

const EducationFormContainer = React.createClass({
  getInitialState () {
    return {
      school: '',
      graduationDate: '',
      degreeType: '',
      gpa: '',
      maxGpa: '',
      isMajorGpa: false
    }
  },
  componentDidMount() {
    axios.get(`${resume_bucket_url}/${this.props.resumeHashId}/resume.json`)
      .then((response) => {
        if (response.status === 200) {
          if (response.data['sections']) {
            const filtered_data = response.data['sections'].filter((entry) =>
              entry["sectionName"] == "education"
            )
            if (filtered_data.length == 1) {
              const education_data = filtered_data[0]
              this.setState({
                school: education_data['school'],
                graduationDate: education_data['graduationDate'],
                degreeType: education_data['degreeType'],
                gpa: education_data['gpa'],
                maxGpa: education_data['maxGpa'],
                isMajorGpa: education_data['isMajorGpa']
              }, () => this.props.handleUpdateContainerData('education', this.state))
            }
          }
        }
      })
      .catch((err) =>
        console.log(err)
      )
  },
  handleUpdateInfo (e) {
    this.setState({ [e.target.name]: e.target.value }, () => 
      this.props.handleUpdateContainerData('education', this.state))
  },
  handleUpdateCheckbox(e) {
    const value = e.target.checked;
    this.setState({
      isMajorGpa: value
    }, () => this.props.handleUpdateContainerData('education', this.state));
  },
  render () {
    return (
      <EducationForm
        onUpdateInfo={this.handleUpdateInfo}
        onUpdateCheckbox={this.handleUpdateCheckbox}
        school={this.state.school}
        graduationDate={this.state.graduationDate}
        degreeType={this.state.degreeType}
        gpa={this.state.gpa}
        maxGpa={this.state.maxGpa}
        isMajorGpa={this.state.isMajorGpa} />
    )
  }
});

EducationFormContainer.propTypes = {
  handleUpdateContainerData: PropTypes.func.isRequired,
  resumeHashId: PropTypes.string.isRequired,
}

export default EducationFormContainer