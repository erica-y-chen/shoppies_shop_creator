import { AccountsReact } from 'meteor/meteoreact:accounts'
import { AccountsReactComponent } from 'meteor/meteoreact:accounts'

import InputField from '/imports/overrides/InputField.jsx'

export const AccountsReactConfig = () => {
    // Override default styles
    AccountsReact.style({
        InputField: InputField
    });
    // Set default state for accounts module
    AccountsReact.configure({defaultState: 'signUp'});
    /*
     √ checkbox with T&C (submit not working until it is checked) (add modal to show terms)
     √ email
     √ mobile number
     √ instagram account (or other social media) (add icon)
     √ youtube (add icon) (either this or instagram is required)
     • screenshot of their insights "Please attach screenshots of your audience insights" (optional)
     • survey questions
     • submit button that goes to thank you page
     • log all these data to spreadsheet/db --> we need admin tools
     √ account creation (password)
     • facebook auth, google auth (nice to have but not required)
     • log location, platform, what else?
     */
    // Add custom fields to the accounts module
    AccountsReact.addFields('signUp', [
        {
            _id: 'mobileNumber',
            displayName: 'Mobile Number',
            placeholder: '+1 234-567-8910',
            minLength: 10, // we need custom validation
            maxLength: 20, // this is not correct
            required: true,
            errStr: 'Please enter a valid mobile number.',
            autocomplete: 'false'
        },
        {
            _id: 'instagramAccount',
            displayName: 'Instagram Account',
            placeholder: '@shoppies4life',
            minLength: 2,
            maxLength: 31,
            required: false,
            errStr: 'Please enter a valid instagram handle.',
            autocomplete: 'false'
        },
        {
            _id: 'youtubeAccount',
            displayName: 'YouTube Account',
            placeholder: '@shoppiesFTW',
            minLength: 2,
            maxLength: 31,
            required: false,
            errStr: 'Please enter a valid youtube handle.',
            autocomplete: 'false'
        },
        {
            _id: 'agreesToTerms',
            displayName: 'By clicking Register, you agree to the Shoppies Terms of Service.',
            minLength: 2,
            maxLength: 31,
            required: true,
            errStr: 'You need to agree to the terms of service to proceed.',
            autocomplete: 'false',
            type: 'hidden',
            default: 'true',
            label: 'Shoppies Terms of Service'
        }
    ]);
    // I have read and agree to the Shoppies <a href="#modal_tos">Terms and Conditions</a>
};