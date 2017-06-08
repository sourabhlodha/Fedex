import React from 'react';


const LoginForm = () => (
  <div className="retail-login">
      <h3>Fedex Login </h3>
      <form className="form-default">
        <div className="form-box">
          <label htmlFor="userName" className="form-label">User Name</label>
          <input id="userName" name="userName" className="form-input" type="text" />
        </div>
        <div className="form-box">
          <label htmlFor="password" className="form-label">Password</label>
          <input id="password" name="password" className="form-input" type="password" />
        </div>
       <button className="btn btn-secondary search" type="button">Login</button>
        </form>
    </div>
);

export default LoginForm;