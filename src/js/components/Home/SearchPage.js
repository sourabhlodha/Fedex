import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { searchAssets } from '../../redux/actions';


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
    console.log(e.target.value);
    this.setState({ searchValue: e.target.value });
  }
  _onSearch() {
    const val = {
      'name': this.state.searchValue,
      'job': 'developer',
    };
    this.props.searchAssets(val);
  }

  render() {
    const { search } = this.props;
    return (
      <div className="container-fluid search">
        <div className="input-group">
          <input type="text" className="form-control" value={this.state.searchValue} placeholder="Search for..." onChange={this._onSearchChange} />
          <span className="input-group-btn">
            <button onClick={this._onSearch} className="btn btn-secondary" type="button"><i className="fa fa-search" /></button>
          </span>
        </div>
        {search.id && <Redirect to="/search-result" />}
      </div>
    );
  }
}

SearchPage.propTypes = {
  search: PropTypes.shape({}).isRequired,
  searchAssets: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ search: state.search });
export default connect(mapStateToProps, { searchAssets })(SearchPage);
