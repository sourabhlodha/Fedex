import React, { Component } from 'react';
// import _ from 'lodash';
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
    
    const length = images.length;
    
    if (this.state.index < length) {   
      const image = images[this.state.index | index ];
      console.log(this.state.index);
      this.props.dispatch(vision({image}));
    }
  }
  componentDidMount() {
    // let image = images[0]; 
    this._callApi(0);
    
    // console.log(images[0]);    
    // this.props.dispatch(vision({image}));
   // let imageurl='http://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg';
  //  this.props.dispatch(getImageList());
    // _.map(images,image =>{
    //   // this.props.dispatch(vision({images}));
    //   // console.log('images'+images);
    //   this._CallApi((image));
      
    // }); 
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps); 
    // if(nextProps.fetched){
    //   this._CallApi();
    //   this.setState({index:this.index+1});
    // }
  }
   
  
  

  render()
   {
    
    // console.log(images);
    // const {  fetching,fetched } = this.props ;
    //console.log(fetching);
    // console.log(fetched);
  //   let data = [];
  //   if (fetched) {
  //     _.map(accountList.accounts, account => {
  //       let obj = {
  //        'id': account.id,
  //         'timeline': [] 
  //      }
  // //  console.log('imageDataList'+imageDataList);
    // console.log('visionList'+visionList);

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