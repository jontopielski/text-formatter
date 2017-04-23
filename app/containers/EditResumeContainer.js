import React, { PropTypes } from 'react'
import axios from 'axios'
import HeaderFormContainer from './HeaderFormContainer'
import EducationFormContainer from './EducationFormContainer'
import SkillsFormContainer from './SkillsFormContainer'
import MultiFormContainer from './MultiFormContainer'
import ShowHintContainer from './ShowHintContainer'
import SectionHeader from '../components/SectionHeader'
import HintSection from '../components/HintSection'
import { space } from '../styles'

function getSectionHintList(sectionName) {
  switch (sectionName) {
    case 'header':
      return [
        'Some people choose to just list their name, phone number, and email address (omitting physical address). Some people like to have a phone number and email address that they use solely for job hunting. These are all fine choices, just make sure your name and a contact method are clearly shown.',
        'Feel free to include a Github and/or LinkedIn link in the \'Website\' section.'
      ]
    case 'education':
      return [
        'If you are still in school, put "Expected" before the graduate date.',
        'Do not include GPA if it is under 3.0.',
        'If your major GPA is higher than your regular GPA, use your major GPA.'
      ]
    case 'experience':
      return [
        'Include a good description of what is it that you worked on or created, what you did specifically/what you contributed technically, the languages used to create the program/app/software.',
        'Try to avoid really long bullets. Paragraphs are a lot harder to skim than resumes and that\'s very important when a recruiter has only 20 seconds to read your resume',
        'Don\'t include just a list of languages; find a way to incorporate them into your descriptions.',
        'Don\'t write generic and vague sentences like "created an app" -- find a way to make them personal and interesting.'
      ]
    case 'projects':
      return [
        'Include a good description of what is it that you worked on or created, what you did specifically/what you contributed technically, the languages used to create the program/app/software.',
        'Try to avoid really long bullets. Paragraphs are a lot harder to skim than resumes and that\'s very important when a recruiter has only 20 seconds to read your resume',
        'Don\'t include just a list of languages; find a way to incorporate them into your descriptions.',
        'Don\'t write generic and vague sentences like "created an app" -- find a way to make them personal and interesting.'
      ]
    case 'coursework':
      return [
        'In general, relevant coursework should only be included if you do not have as much experience/personal projects.',
        'Rather than writing the classes you\'ve taken in a list, pick a few interesting classes and describe specifically what you did in those classes.',
        'Example: Data Structures and Algorithms',
        'Created a hashtable using Java and utilized hash chaining to deal with hashing collisions',
        'Implemented quicksort and merge sort algorithms and analyzed their efficiency in Big-O notation'
      ]
    case 'skills':
      return [
        'Include: a list of languages/tools/software you\'re comfortable with. You can order them based on proficiency (proficient, intermediate, beginner) or just list them.',
        'Break down your skills list into different sections if you have a lot of languages/tools/software.',
        'Remember that anything you list in your skills section is fair game in an interview. Don\'t lie and put things on there that you aren\'t comfortable talking about or working in.'
      ]
    default:
      return []
  }
}

const EditResumeContainer = React.createClass({
  getInitialState() {
    return {
      headerData: {},
      educationData: {},
      experienceData: {},
      projectsData: {},
      courseworkData: {},
      skillsData: {},
      showHintData: {
        'header': false,
        'education': false,
        'experience': false,
        'projects': false,
        'coursework': false,
        'skills': false
      }
    }
  },
  handleUpdateContainerData(section, data) {
    if (section === 'header') {
      this.setState({
        headerData: data
      }, () => this.props.updateMainResumeData(section, this.state.headerData))
    } else if (section === 'education') {
      this.setState({
        educationData: data
      }, () => this.props.updateMainResumeData(section, this.state.educationData))
    } else if (section === 'experience') {
      this.setState({
        experienceData: data
      }, () => this.props.updateMainResumeData(section, this.state.experienceData))
    } else if (section === 'projects') {
      this.setState({
        projectsData: data
      }, () => this.props.updateMainResumeData(section, this.state.projectsData))
    } else if (section === 'coursework') {
      this.setState({
        courseworkData: data
      }, () => this.props.updateMainResumeData(section, this.state.courseworkData))
    } else if (section === 'skills') {
      this.setState({
        skillsData: data
      }, () => this.props.updateMainResumeData(section, this.state.skillsData))
    } else {
      console.log('No valid section found for data update.')
    }
  },
  handleToggleHint(sectionName) {
    const updatedHintData = this.state.showHintData
    updatedHintData[sectionName] = !updatedHintData[sectionName]
    this.setState({
      showHintData: updatedHintData
    })
  },
  render() {
    return (
      <div className='col-sm-12'>
        <SectionHeader sectionName={'Header'}>
          <ShowHintContainer
            sectionName={'header'}
            showHint={this.state.showHintData['header']}
            handleToggleHint={this.handleToggleHint}>
            <HintSection
              sectionName='Header'
              hintList={getSectionHintList('header')} />
          </ShowHintContainer>
          <HeaderFormContainer
            handleUpdateContainerData={this.handleUpdateContainerData}
            resumeHashId={this.props.resumeHashId} />
        </SectionHeader>
        <SectionHeader sectionName={'Education'}>
          <ShowHintContainer
            sectionName={'education'}
            showHint={this.state.showHintData['education']}
            handleToggleHint={this.handleToggleHint}>
            <HintSection
              sectionName='Education'
              hintList={getSectionHintList('education')} />
          </ShowHintContainer>
          <EducationFormContainer
            handleUpdateContainerData={this.handleUpdateContainerData}
            resumeHashId={this.props.resumeHashId} />
        </SectionHeader>
        <SectionHeader sectionName={'Experience'}>
          <ShowHintContainer
            sectionName={'experience'}
            showHint={this.state.showHintData['experience']}
            handleToggleHint={this.handleToggleHint}>
            <HintSection
              sectionName='Experience'
              hintList={getSectionHintList('experience')} />
          </ShowHintContainer>
          <MultiFormContainer
            sectionName={'Experience'}
            handleUpdateContainerData={this.handleUpdateContainerData}
            resumeHashId={this.props.resumeHashId} />
        </SectionHeader>
        <SectionHeader sectionName={'Projects'}>
          <ShowHintContainer
            sectionName={'projects'}
            showHint={this.state.showHintData['projects']}
            handleToggleHint={this.handleToggleHint}>
            <HintSection
              sectionName='Projects'
              hintList={getSectionHintList('projects')} />
          </ShowHintContainer>
          <MultiFormContainer
            sectionName={'Projects'}
            handleUpdateContainerData={this.handleUpdateContainerData}
            resumeHashId={this.props.resumeHashId} />
        </SectionHeader>
        <SectionHeader sectionName={'Coursework'}>
          <ShowHintContainer
            sectionName={'coursework'}
            showHint={this.state.showHintData['coursework']}
            handleToggleHint={this.handleToggleHint}>
            <HintSection
              sectionName='Coursework'
              hintList={getSectionHintList('coursework')} />
          </ShowHintContainer>
          <MultiFormContainer
            sectionName={'Coursework'}
            handleUpdateContainerData={this.handleUpdateContainerData}
            resumeHashId={this.props.resumeHashId} />
        </SectionHeader>
        <SectionHeader sectionName={'Skills'}>
          <ShowHintContainer
            sectionName={'skills'}
            showHint={this.state.showHintData['skills']}
            handleToggleHint={this.handleToggleHint}>
            <HintSection
              sectionName='Skills'
              hintList={getSectionHintList('skills')} />
          </ShowHintContainer>
          <SkillsFormContainer
            handleUpdateContainerData={this.handleUpdateContainerData}
            resumeHashId={this.props.resumeHashId} />
        </SectionHeader>
      </div>
    );
  }
})

EditResumeContainer.propTypes = {
  resumeData: PropTypes.object.isRequired,
  resumeHashId: PropTypes.string.isRequired,
  updateMainResumeData: PropTypes.func.isRequired
}

export default EditResumeContainer