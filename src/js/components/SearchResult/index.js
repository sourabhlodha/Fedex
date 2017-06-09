import React, { Component } from 'react';
// custom Component

import ListItems from './partial/ListItems';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { vision } from '../../redux/actions';

@connect((store) => {
  console.log(store);
  return {
    
    visionList: store.visionsearch.visionList,
  };
})

class SearchResult extends Component {
  componentDidMount() {
    let imageurl='http://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg';
    this.props.dispatch(vision({imageurl}));
  }
  render() {
    const { visionList } = this.props ;
    console.log(visionList);
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
};

export default SearchResult;