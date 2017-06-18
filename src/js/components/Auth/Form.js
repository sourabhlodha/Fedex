import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../shared/Logo';

const Form = ({ onSubmit }) => (
  <div className="retail-login">
      <div className="text-center"><Logo /></div>
      <form onSubmit={onSubmit}>
        <div className="form-box">
          <label htmlFor="userName" className="form-label">User Name</label>
          <input type="email" name="email" className="form-input" required/>
        </div>
        <div className="form-box">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            title="Type a strong password: aBC_123^"
            className="form-input"
            required
          />
        </div>
      <div className="form-buttons">
        <input className="btn btn-primary" type="submit" value="Login" />
      </div>
    </form>
  </div>
);

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
