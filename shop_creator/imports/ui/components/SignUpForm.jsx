import React, { Component } from 'react';
import './css/signupform.css'

import InputField from './InputField.jsx'
import SocialMedia from './SocialMediaInput.jsx'

//import images
// import Twitter from '../../../public/images/twitter_logo.svg'
// import Instagram from '../../../public/images/instagram_logo.svg'
// import Youtube from '../../../public/images/youtube_logo.svg'

export default class SignUpForm extends Component {
    render() {
        return (
          // Import result is the URL of your image
          <div className="form-container">
              <div className="user-information">
                {/* <div className="section-header">Social Media Links</div> */}
                <InputField name="firstName" placeHolder = "First Name *" label="First Name"/> 
                <InputField name="lastName" placeHolder = "Last Name *" label="Last Name"/> 
                <InputField name="email" placeHolder = "Email *" label="Email"/> 
                <InputField name="phoneNum" placeHolder = "Phone Number *" label="Phone Number"/> 
              </div>
              <div className="user-social-media">
                <div className="section-header">Social Media Links</div>
                <SocialMedia placeHolder = "Twitter" img = "twitter"/> 
                <SocialMedia placeHolder = "Instagram" img = "instagram"/> 
                <SocialMedia placeHolder = "Youtube" img = "youtube"/> 
                <button className="button-get-started"><span>GET STARTED</span></button>
              </div>
          </div>
        );
    }
}