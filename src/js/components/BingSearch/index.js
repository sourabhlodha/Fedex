import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BingSearchResult from './BingSearchResult';
import FedexLogoInverse from './FedexLogoInverse';
import SearchDropZone from './SearchDropZone';

class SearchPage extends Component {
  
  constructor() {
    super();
    this._onDrop = this._onDrop.bind(this);
  }

  _onDrop() {
    console.log(test);
  }
 
  

  render() {
    const { bingSearchList, callApiFromBing,cosmosDB,backtoHome } = this.props;    
    return (
      <div className="search-page page-bingSearch">
        <div className="container-fluid search">
          <FedexLogoInverse />
          <form onSubmit={this._onSearch}>
            <div className="input-group">
              <input type="text" className="form-control" />
              <SearchDropZone onDrop={this._onDrop}/>
              <span className="input-group-btn">
                <button onClick={() => {}} className="btn btn-secondary" type="submit"><i className="fa fa-search" /></button>
              </span>
            </div>
          </form>
          <button onClick={backtoHome} type="submit" className="btn btn-close">
            <i className="fa fa-close"></i>
          </button>
        </div>
        <BingSearchResult searchResults={bingSearchList.visuallySimilarImages.value} callApiFromBing={callApiFromBing} cosmosDB={cosmosDB} />
      </div>
    );
  }
}





SearchPage.propTypes = {
  onSearch: PropTypes.func,
  searchResult: PropTypes.object,
  fetching: PropTypes.bool,
  callApiFromBing: PropTypes.func,
  isvisionDetailPage: PropTypes.bool,
  cosmosDB: PropTypes.object,
  bingSearchList: PropTypes.object,
  backtoHome:PropTypes.func,
};  


export default SearchPage;
