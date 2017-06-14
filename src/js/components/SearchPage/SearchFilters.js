import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

const SearchFilters = ({ ...props }) => {

  const descTags = _.map(props.descriptiontags, (item, i) => {
    return (
      <div className="checkbox" key={i}>
        <label className="control control--checkbox">{item}
          <Checkbox value={item}/>
          <div className="control__indicator"></div>
        </label>
      </div>
    );
  });

  const itemTags = _.map(props.tags, (item, i) => {
    return (
      <div className="checkbox" key={i}>
        <label className="control control--checkbox">{item}
          <Checkbox value={item}/>
          <div className="control__indicator"></div>
        </label>
      </div>
    );
  });

  return (
    <div className="search-filters">
      <div className="search-filters-items">
        <h3 className="search-filters-title">Description Tags:</h3>
        <div className="search-filters-list">
          <div className="control-group">
            <CheckboxGroup name="descTags" onChange={props.toggleDescTags}>
              {descTags}
            </CheckboxGroup>
          </div>
        </div>
      </div>
      <div className="search-filters-items">
        <h3 className="search-filters-title">Tags:</h3>
        <div className="search-filters-list">
          <div className="control-group">
            <CheckboxGroup name="descTags" onChange={props.toggleItemTags}>
              {itemTags}
            </CheckboxGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

SearchFilters.propTypes = {
  descriptiontags: PropTypes.array,
  toggleDescTags: PropTypes.func,
  toggleItemTags: PropTypes.func,
  tags: PropTypes.array,
};


export default SearchFilters;
