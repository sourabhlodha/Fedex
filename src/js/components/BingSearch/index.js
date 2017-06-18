import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BingSearchResult from './BingSearchResult';
import FedexLogoInverse from './FedexLogoInverse';
import SearchDropZone from './SearchDropZone';
import BingTextSearchResult from './BingTextSearchResult';

class SearchPage extends Component {
  
  constructor() {
    super();
    this._onSearchChange = this._onSearchChange.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this.state = {
      searchValue: '',
    };

   
  }
  _onSearchChange(e) {
    this.setState({ searchValue: e.target.value });
    
  }

  _onSearch(e) {
    e.preventDefault();
    
  }

  

  

 
  
  

  render() {
    const { bingSearchList, callApiFromBing,cosmosDB,backtoHome,onDrop,onTextBingSearch,onBingSearchTextChange} = this.props;  
    
    let BingData;
    if(bingSearchList.visuallySimilarImages){
      BingData=<BingSearchResult searchResults={bingSearchList.visuallySimilarImages.value} callApiFromBing={callApiFromBing} cosmosDB={cosmosDB} />; 
    } 
    if(bingSearchList.value){
      BingData=<BingTextSearchResult searchResults={bingSearchList.value} callApiFromBing={callApiFromBing} cosmosDB={cosmosDB} />;
    }
    return (
      <div className="search-page page-bingSearch">
        <div className="container-fluid search">
          <FedexLogoInverse />
          <form onSubmit={this._onSearch}>
            <div className="input-group">
              <input type="text" className="form-control" value={this.state.searchValue} placeholder="Search for..." onChange={this._onSearchChange}/>
              <SearchDropZone onDrop={onDrop}/>
              <span className="input-group-btn">
                <button onClick={() => {}} className="btn btn-secondary" type="submit"><i className="fa fa-search" /></button>
              </span>
            </div>
          </form>
          <button onClick={backtoHome} type="submit" className="btn btn-close">
            <i className="fa fa-close"></i>
          </button>
        </div>
        {BingData}
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
  onDrop:PropTypes.func,
  onTextBingSearch:PropTypes.func,
  onBingSearchTextChange:PropTypes.func,
  
};  


export default SearchPage;
