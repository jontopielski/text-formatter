import React, { PropTypes } from 'react'
import axios from 'axios'
import SectionForm from '../components/SectionForm'
import DescriptionItemsContainer from './DescriptionItemsContainer'
import { space } from '../styles'

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

const SectionFormContainer = React.createClass({
  getInitialState () {
    return {
      primaryText: '',
      secondaryText: '',
      startDate: '',
      endDate: '',
      location: '',
      descriptionItems: ['']
    }
  },
  componentDidMount() {
    if (!!this.props.initialData && !isEmptyObject(this.props.initialData)) {
      this.setState({
        primaryText: this.props.initialData['primaryText'],
        secondaryText: this.props.initialData['secondaryText'],
        startDate: this.props.initialData['startDate'],
        endDate: this.props.initialData['endDate'],
        location: this.props.initialData['location'],
        descriptionItems: this.props.initialData['descriptionItems']
      }, () => (this.props.handleUpdateMultiContainerData(this.props.index, this.state)))
    }
  },
  handleUpdateInfo (e) {
    this.setState(
      { [e.target.name]: e.target.value }, () => (
      this.props.handleUpdateMultiContainerData(this.props.index, this.state))
    )
  },
  handleUpdateListData(listData) {
    this.setState({
      descriptionItems: listData
    }, () => (this.props.handleUpdateMultiContainerData(this.props.index, this.state)))
  },
  render () {
    return (
      <div>
        <div>
          <SectionForm
            onUpdateInfo={this.handleUpdateInfo}
            primaryText={this.state.primaryText}
            secondaryText={this.state.secondaryText}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            sectionName={this.props.sectionName}
            location={this.state.location} />
        </div>
        <div>
          <DescriptionItemsContainer
            handleUpdateListData={this.handleUpdateListData}
            initialListData={this.state.descriptionItems} />
        </div>
      </div>
    )
  }
});

SectionFormContainer.propTypes = {
  index: PropTypes.number.isRequired,
  handleUpdateMultiContainerData: PropTypes.func.isRequired,
  sectionName: PropTypes.string.isRequired,
  initialData: PropTypes.object
}

export default SectionFormContainer