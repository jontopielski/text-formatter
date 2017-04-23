import React, { PropTypes } from 'react'
import FormItem from './FormItem'
import { transparentBg } from '../styles'

function HeaderForm ({name, email, phoneNumber, address, website, onUpdateInfo}) {
  return (
    <div style={transparentBg}>
      <div className="col-sm-12">
        <form>
          <FormItem
            onUpdateField={onUpdateInfo}
            value={name}
            name={'name'}
            label={'Name*'}
            placeholder={'John Doe'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={email}
            name={'email'}
            label={'Email*'}
            placeholder={'johndoe@example.com'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={phoneNumber}
            name={'phoneNumber'}
            label={'Phone Number*'}
            placeholder={'1234567890 (only numbers)'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={address}
            name={'address'}
            label={'Address'}
            placeholder={'123 Park Street, San Francisco, CA'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={website}
            name={'website'}
            label={'Website'}
            placeholder={'github.com/johndoe'} />
        </form>
      </div>
    </div>
  )
}

HeaderForm.propTypes = {
  onUpdateInfo: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired
}

export default HeaderForm