import React from 'react';
import PropTypes from 'prop-types';
import fedexlogo from '../../../assets/images/fedex-logo.svg';

const Form = ({ onSubmit }) => (
  <div className="retail-login">
      <div className="fedex-logo text-center"><img src={fedexlogo} alt="fedexlogo" width="160" /></div>
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
