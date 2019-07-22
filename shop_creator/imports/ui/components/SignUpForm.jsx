import React, { Component } from 'react';
import './css/signupform.css'

export default class SignUpForm extends Component {
    render() {
        return (
          // Import result is the URL of your image
          <div className="form-container">
            <img id="hashtag-shoppies" src="images/hashtag_shoppies.png" alt="#shoppies" />
            <header>
                    <h1>Empowering content creators to own their own brand</h1>
            </header>
          </div>
        );
    }
}