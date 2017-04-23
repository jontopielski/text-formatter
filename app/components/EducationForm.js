import React, { PropTypes } from 'react'
import FormItem from './FormItem'
import { transparentBg, space } from '../styles'

function EducationForm ({school, graduationDate, degreeType, gpa, maxGpa, isMajorGpa, onUpdateInfo, onUpdateCheckbox}) {
    return (
    <div style={transparentBg}>
      <div className="col-sm-12">
        <form>
          <FormItem
            onUpdateField={onUpdateInfo}
            value={school}
            name={'school'}
            label={'School'}
            placeholder={'University'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={graduationDate}
            name={'graduationDate'}
            label={'Graduation Date'}
            placeholder={'Graduation date'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={degreeType}
            name={'degreeType'}
            label={'Degree Title'}
            placeholder={'(ex: "B.S. in Physics")'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={gpa}
            name={'gpa'}
            label={'GPA'}
            placeholder={'Grade point average'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={maxGpa}
            name={'maxGpa'}
            label={'Max GPA'}
            placeholder={'What is your GPA out of?'} />
          <FormItem
            onUpdateField={onUpdateCheckbox}
            value={isMajorGpa}
            name={'isMajorGpa'}
            label={'Major GPA'}
            type={'checkbox'}
            placeholder={'Major Gpa?'} />
        </form>
      </div>
    </div>
  )
}

EducationForm.propTypes = {
  onUpdateInfo: PropTypes.func.isRequired,
  onUpdateCheckbox: PropTypes.func.isRequired,
  school: PropTypes.string.isRequired,
  graduationDate: PropTypes.string.isRequired,
  degreeType: PropTypes.string.isRequired,
  gpa: PropTypes.string.isRequired,
  maxGpa: PropTypes.string.isRequired,
  isMajorGpa: PropTypes.bool.isRequired
}

export default EducationForm