import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';



const BingSearchResult = ({ ...props }) => {
  const searchList = _.map(props.searchResults, (item, i) => {
    return (
      <div className="card" key={i}>
        <div className="card-bing">
          <img className="card-img-top" src={item.contentUrl} alt="Card image cap" />
          <div className="card-block">
            <h4 className="card-title">{item.name}</h4>
            <a href={item.webSearchUrl} className="btn btn-secondary">Get More Detail</a>
            <button className="btn btn-primary" onClick={()=>props.callApiFromBing(props.cosmosDB,item.contentUrl)}>Import Detail  </button>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated {moment(item.datePublished).format('MM/DD/YYYY')}</small>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="container-fluid bing-search">
      <div className="card-deck">
        {searchList}
      </div>
    </div>
  );
 
};

BingSearchResult.propTypes = {
  searchResults: PropTypes.array,
  cosmosDB: PropTypes.object,
};

export default BingSearchResult;
