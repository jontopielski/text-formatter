import React, { PropTypes } from 'react'
import axios from 'axios'
import FormItem from '../components/FormItem'
import DescriptionItemsContainer from './DescriptionItemsContainer'
import { space } from '../styles'

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

const SkillsListContainer = React.createClass({
  handleUpdateInfo(e) {
    this.props.handleUpdateParentData(this.props.index, e.target.name, e.target.value)
  },
  render () {
    return (
      <div>
        <FormItem
          onUpdateField={this.handleUpdateInfo}
          name={'listName'}
          value={this.props.listName}
          label={'Skill Section Name'}
          placeholder={'The name of the skill section'} />
        <FormItem
          onUpdateField={this.handleUpdateInfo}
          name={'items'}
          value={this.props.items}
          label={'Skills List'}
          placeholder={'List each skill comma-separated'} />
      </div>
    )
  }
});

SkillsListContainer.propTypes = {
  index: PropTypes.number.isRequired,
  handleUpdateParentData: PropTypes.func.isRequired,
  listName: PropTypes.string.isRequired,
  items: PropTypes.string.isRequired,
}

export default SkillsListContainer