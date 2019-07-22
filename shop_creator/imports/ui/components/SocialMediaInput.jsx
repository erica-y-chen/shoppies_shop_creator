import React, { Component } from 'react';
import './css/signupform.css'

export default class SocialMedia extends Component {
    render() {
        return (
          // Import result is the URL of your image
          <div className="input-container-social">
              <img className="social-icon" src={`images/${this.props.img}_logo.svg`}/>
              <input 
                className="social-input"
                name = {this.props.label} 
                placeholder = {this.props.placeHolder} />
          </div>
        );
    }
}