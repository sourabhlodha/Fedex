import React from 'react';

const Search = () => (
  <div className="container position">
  <div className="row">
  <div className="col-lg-6 col-md-6 col-xs-6">
  
    <div className="input-group">
       <input type="text" className="form-control" placeholder="Search for..." />
      <span className="input-group-btn">
        <button className="btn btn-secondary search" type="button">Search</button>
      </span>
    </div>
   
  </div>
</div>
</div>

);

export default Search;