import React, { PropTypes } from 'react'
import { mediumSpace } from '../styles'

const DescriptionItem = React.createClass({
  onUpdateField(e) {
    this.props.handleUpdateListContainerData(this.props.index, e.target.value)
  },
  render() {
    console.log('Rendering DescriptionItem')
    return (
      <div className="form-group">
        <div className=''>
          <label>{this.props.label}</label>
          <input
            className='form-control'
            onChange={this.onUpdateField}
            placeholder={this.props.placeholder ? this.props.placeholder : this.props.name}
            name={this.props.name}
            type={'text'}
            maxLength={150}
            value={this.props.value} />
        </div>
      </div>
    )
  }
})

DescriptionItem.propTypes = {
  handleUpdateListContainerData: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  placeholder: PropTypes.string
}

export default DescriptionItem