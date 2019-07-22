import React, { Component } from 'react';
import './css/signupform.css'

export default class InputField extends Component {
    render() {
        return (
          // Import result is the URL of your image
          <div className="input-container">
              <label for= {this.props.name}>{this.props.label}</label>
              <input 
                name = {this.props.name} 
                placeholder = {this.props.placeHolder} />
          </div>
        );
    }
}