import React, { PropTypes } from 'react'
import { mediumSpace } from '../styles'

function FormItem ({ onUpdateField, name, value, label, placeholder, type }) {
  return type === 'checkbox' ? 
    <div className='form-group'>
      <div className='col-sm-12'>
        <label className='' style={mediumSpace}>
          <input
            onChange={onUpdateField}
            placeholder={placeholder ? placeholder : name}
            name={name}
            type={type ? type : 'text'}
            value={value} />
          {' ' + label}
        </label>
        
      </div>
    </div>
  : (
    <div className='form-group'>
      <div className='col-sm-12'>
        <label style={mediumSpace}>{label}</label>
        <input
          className='form-control'
          onChange={onUpdateField}
          placeholder={placeholder ? placeholder : name}
          name={name}
          type={type ? type : 'text'}
          maxLength={150}
          value={value} />
      </div>
    </div>
  )
}

FormItem.propTypes = {
  onUpdateField: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
}

export default FormItem