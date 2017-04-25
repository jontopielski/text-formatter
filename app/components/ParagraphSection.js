import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState} from 'draft-js';
import { server_url, pages_url } from '../config/Globals'
import '../styles/RichEditor.css'

class ParagraphSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      hashId: this.props.hashId
    };
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    console.log('Checking for existing hashId..')
    axios.get(`${pages_url}/${this.state.hashId}/editor_state.json`)
      .then((response) => {
        if (response.status === 200) {
          console.log('Found existing data!')
          console.log(convertFromRaw(response.data))
          const updatedEditorState = EditorState.push(this.state.editorState, convertFromRaw(response.data));
          this.setState({editorState: updatedEditorState})
          // this.state.EditorState.currentContent = ContentState.createFromBlockArray((response.data))
        }
      })
      .catch((err) =>
        console.log(err)
      )
    }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('Sending request..')
    axios({
      method: 'post',
      url: `${server_url}/pages?hashId=${this.state.hashId}`,
      data: convertToRaw(this.state.editorState.getCurrentContent())
    })
    .then((response) => {
      console.log('Sent request.')
    })
    .catch((err) => console.log(err))
  }

  render() {
    const {editorState} = this.state;
    console.log(editorState.getCurrentContent())
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div>
        <div className="RichEditor-root">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className={className} onClick={this.focus} >
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              onTab={this.onTab}
              ref="editor"
              spellCheck={true}
            />
          </div>        
        </div>
        <div className='text-center' style={{paddingTop: '2em', paddingBottom: '2em'}}>
          <button type="button" className="btn btn-success" onClick={this.handleSubmit}>>
            Host
          </button>
        </div>
      </div>
    );
  }
}



ParagraphSection.propTypes = {
  hashId: PropTypes.string
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  BLOG: {
    fontFamily: 'openSans',
    fontWeight: 400,
    fontStyle: 'normal',
    lineHeight: 1.58,
    letterSpacing: '-.003em',
    fontSize: 21,
    padding: 1,
    color: 'rgb(0,0,0,.8)'
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

class FormatButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        <button type="button" className="btn btn-primary">{this.props.label}</button>
      </span>
    );
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'}
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
      <FormatButton
        key={'Format'}
        active={currentStyle.has('BLOG')}
        label={'Format'}
        onToggle={props.onToggle}
        style={'BLOG'}
      />
    </div>
  );
};

export default ParagraphSection