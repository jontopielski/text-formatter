import React, { PropTypes } from 'react'
import axios from 'axios'
import SkillsListContainer from './SkillsListContainer'
import { resume_bucket_url } from '../config/Globals'
import { space } from '../styles'

const SkillsFormContainer = React.createClass({
  getInitialState () {
    return {
      sectionCount: 0,
      listItems: []
    }
  },
  componentDidMount() {
    axios.get(`${resume_bucket_url}/${this.props.resumeHashId}/resume.json`)
      .then((response) => {
        if (response.status === 200) {
          if (response.data['sections']) {
            const filtered_data = response.data['sections'].filter((entry) =>
              entry['sectionName'] == 'skills'
            )
            if (filtered_data.length == 1) {
              const data = filtered_data[0]
              this.setState({
                listItems: data['listItems'],
                sectionCount: data['listItems'].length
              }, () => this.props.handleUpdateContainerData('skills', this.state))
            }
          }
        }
      })
      .catch((err) =>
        console.log(err)
      )
  },
  handleAddSection(e) {
    const updatedListItems = this.state.listItems
    updatedListItems[this.state.sectionCount] = {
      listName: '',
      items: ''
    }
    this.setState({
      listItems: updatedListItems,
      sectionCount: this.state.sectionCount + 1
    }, () => this.props.handleUpdateContainerData('skills', this.state))
  },
  handleUpdateParentData(index, field, value) {
    const updatedListItems = this.state.listItems
    updatedListItems[index][field] = value
    this.setState({
      listItems: updatedListItems
    }, () => this.props.handleUpdateContainerData('skills', this.state))
  },
  handleRemoveSection(index) {
    if (confirm('Are you sure you want to delete section: skills?') == false) {
      return
    }
    const updatedListItems = this.state.listItems.filter((item, i) =>
      i != index
    )
    this.setState({
      listItems: updatedListItems,
      sectionCount: this.state.sectionCount - 1
    }, () => this.props.handleUpdateContainerData('skills', this.state))
  },
  render () {
    return (
      <div>
        <button
          className='btn btn-primary'
          type="submit"
          onClick={this.handleAddSection}>
            <i className='fa fa-plus' />{` Skills Section`}
        </button>
        {
          this.state.listItems.map((item, index) =>
            <div key={index}>
              <SkillsListContainer
                index={index}
                listName={this.state.listItems[index]['listName']}
                items={this.state.listItems[index]['items']}
                handleUpdateParentData={this.handleUpdateParentData} />
              <div className='col-sm-12'>
                <button
                  className='btn btn-danger'
                  style={space}
                  type="submit"
                  onClick={() => this.handleRemoveSection(index)}>
                    <i className="fa fa-trash-o"></i> Remove Section
                </button>
                <hr/>
              </div>
            </div>
        )}
      </div>
    )
  }
});

SkillsFormContainer.propTypes = {
  resumeHashId: PropTypes.string.isRequired,
  handleUpdateContainerData: PropTypes.func.isRequired
}

export default SkillsFormContainer