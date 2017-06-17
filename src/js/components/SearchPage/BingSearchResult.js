import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

const BingSearchResult = ({ ...props }) => {
  console.log(props);
  const searchList = _.map(props.searchResults, (item, i) => {
    return (
      <div className="card" key={i}>
        <img className="card-img-top" src={item.contentUrl} alt="Card image cap" />
        <div className="card-block">
          <h4 className="card-title">{item.name}</h4>
          <a href={item.webSearchUrl} className="btn btn-primary">View Details</a>
        </div>
        <div className="card-footer">
          <small className="text-muted">Last updated {moment(item.datePublished).format('MM/DD/YYYY')}</small>
        </div>
      </div>
    );
  });
  return (
    <div className="container-fluid bing-search">
      <div className="card-columns">
        {searchList}
      </div>
    </div>
  );
};

BingSearchResult.propTypes = {
  searchResults: PropTypes.array,
//   viewDetails: PropTypes.func,
//   descriptiontags: PropTypes.array,
//   tags: PropTypes.array,
//   toggleDescTags: PropTypes.func,
//   toggleItemTags: PropTypes.func,
};

export default BingSearchResult;
