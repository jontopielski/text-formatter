import React, { PropTypes } from 'react'
import axios from 'axios'
import HeaderForm from '../components/HeaderForm'
import { resume_bucket_url } from '../config/Globals'

const HeaderFormContainer = React.createClass({
  getInitialState () {
    return {
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
      website: ''
    }
  },
  componentDidMount() {
    axios.get(`${resume_bucket_url}/${this.props.resumeHashId}/resume.json`)
      .then((response) => {
        if (response.status === 200) {
          if (response.data['sections']) {
            const filtered_data = response.data['sections'].filter((entry) =>
              entry["sectionName"] == "header"
            )
            if (filtered_data.length == 1) {
              const header_data = filtered_data[0]
              this.setState({
                name: header_data['name'],
                email: header_data['email'],
                phoneNumber: header_data['phoneNumber'],
                address: header_data['address'],
                website: header_data['website']
              }, () => this.props.handleUpdateContainerData('header', this.state))
            }
          }
        }
      })
      .catch((err) =>
        console.log(err)
      )
  },
  handleUpdateInfo (e) {
    this.setState(
      { [e.target.name]: e.target.value }, () => (
      this.props.handleUpdateContainerData('header', this.state))
    )
  },
  render () {
    return (
      <HeaderForm
        onUpdateInfo={this.handleUpdateInfo}
        name={this.state.name}
        email={this.state.email}
        phoneNumber={this.state.phoneNumber}
        address={this.state.address}
        website={this.state.website} />
    )
  }
});

HeaderFormContainer.propTypes = {
  handleUpdateContainerData: PropTypes.func.isRequired,
  resumeHashId: PropTypes.string.isRequired,
}

export default HeaderFormContainer