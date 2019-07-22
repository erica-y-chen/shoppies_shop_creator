import React, { Component } from 'react';
import './css/signupform.css'

import InputField from './InputField.jsx'

export default class SignUpForm extends Component {
    render() {
        return (
          // Import result is the URL of your image
          <div className="form-container">
              <InputField label="firstName" placeHolder = "First Name *" /> 
              <InputField label="lastName" placeHolder = "Last Name *" /> 
              <InputField label="email" placeHolder = "Email *" /> 
              <InputField label="phoneNum" placeHolder = "Phone Number *" /> 
          </div>
        );
    }
}