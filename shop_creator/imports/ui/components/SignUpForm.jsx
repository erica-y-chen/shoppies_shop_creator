import React, { Component } from 'react';
import './css/signupform.css'

import InputField from './InputField.jsx'
import SocialMedia from './SocialMediaInput.jsx'

//libraries
import AOS from 'aos';
import 'aos/dist/aos.css';

export default class SignUpForm extends Component {

    render() {
        //initiating animate on scroll library
        AOS.init();

        return (
          // Import result is the URL of your image
          <div className="form-container">
              <div className="user-information" data-aos="fade-up" data-aos-duration="1300">
                {/* <div className="section-header">Social Media Links</div> */}
                <InputField name="firstName" placeHolder = "First Name *" label="First Name"/> 
                <InputField name="lastName" placeHolder = "Last Name *" label="Last Name"/> 
                <InputField name="email" placeHolder = "Email *" label="Email"/> 
                <InputField name="phoneNum" placeHolder = "Phone Number *" label="Phone Number"/> 
              </div>
              <div className="user-social-media" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="300">
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