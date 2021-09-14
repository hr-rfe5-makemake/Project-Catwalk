import React from 'react';
import axios from 'axios';
import RelatedItemList from './RelatedItemList.jsx';
import OutfitList from './OutfitList.jsx';

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   // get related items
  //   axios.get('/api/fec2/hr-rfe/products/' +  + this.props.currentItem + '/related')
  //   .then(result => {
  //     console.log(result.data);
  //     this.setState({
  //       relatedItems: result.data
  //     })
  //   })
  //   .catch(err => {
  //     console.log('error');
  //   })
  // }

  render() {
    return (
      <div className='carouselList'>
        <RelatedItemList currentItemId={this.props.currentItemId} currentItem={this.props.currentItem}/>
        <OutfitList currentItemId={this.props.currentItemId} currentItem={this.props.currentItem}/>
      </div>
    )
  }


}

export default RelatedItems;