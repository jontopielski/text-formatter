import React, { PropTypes } from 'react'
import axios from 'axios'
import SectionForm from '../components/SectionForm'
import SectionFormContainer from './SectionFormContainer'
import DescriptionItem from '../components/DescriptionItem'
import { resume_bucket_url } from '../config/Globals'
import { space, mediumSpace } from '../styles'

const DescriptionItemsContainer = React.createClass({
  getInitialState () {
    return {
      itemCount: 1,
      descriptionItems: ['']
    }
  },
  handleAddItem(e) {
    const updatedListItems = this.state.descriptionItems
    updatedListItems[this.state.itemCount] = ''
    this.setState({
      descriptionItems: updatedListItems,
      itemCount: this.state.itemCount + 1
    }, () => this.props.handleUpdateListData(this.state.descriptionItems))
  },
  handleRemoveItem(index) {
    const updatedListItems = this.state.descriptionItems.filter((item, i) =>
      i != index
    )
    this.setState({
      descriptionItems: updatedListItems,
      itemCount: this.state.itemCount - 1
    }, () => this.props.handleUpdateListData(this.state.descriptionItems))
  },
  handleUpdateListContainerData(index, data) {
    const updatedList = this.state.descriptionItems
    updatedList[index] = data
    this.setState({
      descriptionItems: updatedList
    }, () => (this.props.handleUpdateListData(this.state.descriptionItems)))
  },
  componentWillReceiveProps(nextProps) {
    if (!!nextProps.initialListData && nextProps.initialListData.length != 0
      && (this.state.descriptionItems != nextProps.initialListData)) {
        this.setState({
          descriptionItems: nextProps.initialListData,
          itemCount: nextProps.initialListData.length
        })
    }
  },
  render () {
    return (
      <div>
        <button
          style={space}
          className='btn btn-primary'
          type="submit"
          onClick={this.handleAddItem}>
            <i className='fa fa-plus' /> Description Item
        </button>
        {
          this.state.descriptionItems.map((item, index) =>
            <div key={index}>
              <ul className='list-group list-inline' style={{marginTop: '1em'}}>
                <li>
                  <div>
                    <button
                      style={{verticalAlign: 'inherit'}}
                      className='btn btn-danger'
                      type="submit"
                      onClick={() => this.handleRemoveItem(index)}>
                        <i className="fa fa-minus" />
                    </button>
                  </div>
                </li>
                <li style={{width: '93%'}}>
                  <div>
                    <DescriptionItem
                      index={index}
                      value={this.state.descriptionItems[index]}
                      label={'Description Item ' + (index+1)}
                      name={'Description Item ' + (index+1)}
                      placeholder={'Describe what you worked on'}
                      initialData={this.state.descriptionItems[index]}
                      handleUpdateListContainerData={this.handleUpdateListContainerData} />
                  </div>
                </li>
              </ul>
            </div>
        )}
      </div>
    )
  }
});
//     const DragHandle = SortableHandle(() => <span><i className='fa fa-bars' /></span>);
//     const SortableItem = SortableElement(({index}) => (
//       <li>
//         <ul className='list-group list-inline' style={{marginTop: '1em'}}>
//           <DragHandle />
//           <li style={{marginLeft: '1em', width: '73%'}}>
//             <div>
//               <DescriptionItem
//                 index={index}
//                 value={this.state.descriptionItems[index]}
//                 label={'Description Item ' + (index+1)}
//                 name={'Description Item ' + (index+1)}
//                 placeholder={'Describe what you worked on'}
//                 initialData={this.state.descriptionItems[index]}
//                 handleUpdateListContainerData={this.handleUpdateListContainerData} />
//             </div>
//           </li>
//           <li style={{marginLeft: '1em'}}>
//             <div>
//               <button
//                 style={{verticalAlign: 'inherit'}}
//                 className='btn btn-danger'
//                 type="submit"
//                 onClick={() => this.handleRemoveItem(index)}>
//                   <i className="fa fa-minus" />
//               </button>
//             </div>
//           </li>
//         </ul>
//       </li>
//     ))
//     const onSortEnd = ({oldIndex, newIndex}) => {
//       const listToUpdate = arrayMove(this.state.descriptionItems, oldIndex, newIndex)
//       this.setState({
//           descriptionItems: listToUpdate
//       }, () => (this.props.handleUpdateListData(this.state.descriptionItems)))
//     }
//     const SortableList = SortableContainer(({items}) => {
//       return (
//         <div>
//           <ul className='list-group' style={{listStyleType: 'none'}}>
//             {items.map((item, index) =>
//               <SortableItem key={`item-${index}`} index={index}  />
//             )}
//           </ul>
//         </div>
//       )
//     })
//     console.log('Rendering DescriptionItemsContainer')
//     return (
//       <div>
//         <button
//           style={space}
//           className='btn btn-primary'
//           type="submit"
//           onClick={this.handleAddItem}>
//             <i className='fa fa-plus' /> Description Item
//         </button>
//         <SortableList items={this.state.descriptionItems} onSortEnd={onSortEnd} useDragHandle={true} />
//       </div>
//     )
//   }
// });

DescriptionItemsContainer.propTypes = {
  handleUpdateListData: PropTypes.func.isRequired,
  initialListData: PropTypes.array
}

export default DescriptionItemsContainer