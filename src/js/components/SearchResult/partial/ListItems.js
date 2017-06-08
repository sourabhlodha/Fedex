import React from 'react';
import iphone from '../../../../assets/images/iphone.png';

const ListItems = () => (
  <div className="container">
  <div className="row">
  <div className="col-md-1 col-lg-1 col-sm-1">
   <img src={iphone} className="rounded float-left" alt="iphone" />
   </div>
   <div className="col-md-2 col-lg-2 col-sm-2 offset-md-2 listitems">
     <p>Describition</p>
    </div>
    <div className="col-md-2 col-lg-2 col-sm-2 offset-md-1 listitems">
     <p>case ID</p>
    </div>
    <div className="col-md-2 col-lg-2 col-sm-2 offset-md-1 listitems">
     <button className="btn btn-secondary search" type="button">Details</button>
    </div>
  </div>
</div>



);

export default ListItems;