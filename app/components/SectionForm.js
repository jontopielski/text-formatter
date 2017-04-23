import React, { PropTypes } from 'react'
import FormItem from './FormItem'
import { transparentBg } from '../styles'

function getNamingObject(sectionName) {
  switch (sectionName.toLowerCase()) {
    case 'experience':
      return {
        primaryText: {
          label: 'Company',
          placeholder: 'Company name'
        },
        secondaryText: {
          label: 'Position',
          placeholder: 'Position title'
        }
      }
    case 'projects':
      return {
        primaryText: {
          label: 'Project',
          placeholder: 'Project name'
        },
        secondaryText: {
          label: 'Position',
          placeholder: 'Developer, project manager, etc'
        }
      }
    case 'coursework':
      return {
        primaryText: {
          label: 'Class',
          placeholder: 'The project or course you took'
        },
        secondaryText: {
          label: 'Supporting Text',
          placeholder: 'Feel free to add more details here'
        }
      }
    default:
      return {
        primaryText: {
          label: 'Primary Text',
          placeholder: 'The title text for this section'
        },
        secondaryText: {
          label: 'Secondary Text',
          placeholder: 'The secondary text for this section'
        }
      }
    }
}

function SectionForm ({index, primaryText, secondaryText, startDate, endDate, location, sectionName, onUpdateInfo}) {
  const namingMap = getNamingObject(sectionName)
  return (
    <div style={transparentBg}>
        <FormItem
            onUpdateField={onUpdateInfo}
            name={'primaryText'}
            value={primaryText}
            label={namingMap['primaryText']['label']}
            placeholder={namingMap['primaryText']['placeholder']} />
          <FormItem
            onUpdateField={onUpdateInfo}
            name={'secondaryText'}
            value={secondaryText}
            label={namingMap['secondaryText']['label']}
            placeholder={namingMap['secondaryText']['placeholder']} />
          <FormItem
            onUpdateField={onUpdateInfo}
            name={'startDate'}
            value={startDate}
            label={'Start Date'}
            placeholder={'Start date'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            name={'endDate'}
            value={endDate}
            label={'End Date'}
            placeholder={'End date'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            name={'location'}
            value={location}
            label={'Location'}
            placeholder={'Location'} />
      <hr/>
    </div>
  )
}

SectionForm.propTypes = {
  onUpdateInfo: PropTypes.func.isRequired,
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired
}

export default SectionForm