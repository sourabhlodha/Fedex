import React, { Component } from 'react';
import _ from 'lodash';
// custom Component

import ListItems from './partial/ListItems';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { vision } from '../../redux/actions';

@connect((store) => {
  // console.log(store);
  return {
    visionList: store.visionsearch.visionList,
    fetching:store.visionsearch.fetching,
    fetched:store.visionsearch.fetched,
  };
})

class SearchResult extends Component {
  constructor() {
    super();
    this._callApi = this._callApi.bind(this);
    this.state = {
      index: 0,
    };
  }
  
  _callApi(index) {  
    const length = images.length -1;
    if (this.state.index <= length) {   
      const image = images[this.state.index | index ];
      const imageBody = { url: image };
      this.props.dispatch(vision(imageBody));
    }
  }

  componentDidMount() {
    this._callApi(0);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps); 
    if(!_.isEmpty(nextProps.visionList)) {
      this.setState({ index: this.state.index + 1 }, () => {
        this._callApi();
      });
    }
  }
  render() {
    return (
      <div>
        <ListItems />
      </div>
    );
  }
}

SearchResult.propTypes = {
  dispatch: PropTypes.func,
  visionList: PropTypes.array,
  imageDataList:PropTypes.array,
  fetching:PropTypes.array,
  fetched:PropTypes.array,


};

const images = ['https://asgtagur.blob.core.windows.net/aap-uploads/20160718G0003_1.jpg', 'https://asgtagur.blob.core.windows.net/aap-uploads/20160718G0003_2.jpg', 'https://asgtagur.blob.core.windows.net/aap-uploads/20160718G0003_3.jpg'];


export default SearchResult;