import React from 'react'
import axios from 'axios'
import { server_url } from '../config/Globals'
import TextSections from './TextSections'
import SideBarBody from './SideBarBody'
import Prompt from './Prompt'

function displayJson(object) {
  return <pre>{JSON.stringify(object, null, ' ')}</pre>
}

class InputFieldSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputData: '',
      response: {}
    }
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleSubmitInput = this.handleSubmitInput.bind(this);

  }
  handleUpdateInput(e) {
    this.setState({
      inputData: e.target.value
    })
  }
  handleSubmitInput(e) {
    e.preventDefault()
    const inputData = this.state.inputData
    axios({
      method: 'post',
      url: `${server_url}/process`,
      data: { 'inputString': inputData }
    })
    .then((response) => {
      console.log('Sent request.')
      console.log(response)
      this.setState({
        response: response.data
      })
    })
    .catch((err) => {
			console.log(err)
			this.setState({
				response: { 'ERROR': 'Invalid symbols found in input string. Try removing obscure symbols or retyping symbols such as apostrophes, commas, and quotes.' }
			})
		})
  }
  render() {
    return (
      <div>
        <Prompt
          onSubmitData={this.handleSubmitInput}
          onUpdateData={this.handleUpdateInput}
        />
        { displayJson(this.state.response) }
      </div>
    )
  }
}

export default InputFieldSection
