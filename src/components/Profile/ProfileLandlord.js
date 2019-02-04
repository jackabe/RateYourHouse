/*
    * Copyright (C) 2019 RateYourHouse
    * File created By Jack Allcock
    *
    * Licensing information goes here
    *
    * Class function: This is the Landlord request modal
    * Dependencies: None
    * Third party libraries/frameworks: Material UI
 */

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import config from "../../config/config";
import Alert from "../Alerts/SnackBar";

// The URL which points to the Express server
const BASE_URL = config.serverURL;

class ProfileLandlordSetting extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * @method: close the profile modal
     **/
    close = () => {
        this.props.cancelSetting();
    };

    state = {
        rentorType: 'Agent',
        alert: false,
        alertType: '',
        alertMessage: ''
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    /**
     * @param: none
     * @method: uploads the review
     * -> Disables post
     * -> Sends via Axios
     **/
    requestAccount = () => {
        // Don't let multiple submissions
        this.setState({
            postDisabled: true,
        });
        // Post to server via axios
        let auth = this.props.auth;
        auth.getIdToken().then((idToken) => {
            axios.post(BASE_URL + 'request/account/rentor', {
                email: this.props.auth.email,
                type: this.state.rentorType,
                token: idToken
            })
                .then(() => {
                    this.close();
                    this.props.closeProfile();
                    if (this.state.rentorType === 'Agent') {
                        this.setState({
                            alert: true,
                            alertType: 'success',
                            alertMessage: 'Thanks for requesting an '+this.state.rentorType + ' account! We will get back to you shortly.'
                        });
                    }
                    else {
                        this.setState({
                            alert: true,
                            alertType: 'success',
                            alertMessage: 'Thanks for requesting a '+this.state.rentorType + ' account! We will get back to you shortly.'
                        });
                    }
                })
                .catch((response) => {
                    // Log error
                    console.log(response);
                    // Alert user
                    this.setState({
                        alert: true,
                        alertType: 'error',
                        alertMessage: 'There was a problem! Please try again.',
                    });
                    // Unlock post button after 2 seconds and reset alert to allow others to be sent
                    setTimeout(() =>  this.setState({
                        postDisabled: false,
                        alert: false,
                    }), 2000);
                });
        });
    };

    render() {

        let type = this.props.type;
        let content;
        let types = ['Agent', 'Landlord'];

        if (type === 'landlord') {
            content = <Modal
                hideBackdrop={true}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open='true'
                onClose={this.close}>
                {/* Paper effect with close x button*/}
                <div className='settingsModal'>

                    <div className='backButton'>
                        <h2 onClick={this.close}>
                            x
                        </h2>
                    </div>

                    <h3>Become a landlord/agent (provider)</h3>

                    <p>Whilst this service is mainly for those renting, a crucial part of our future sustainability is to create
                    a fair service for both tenants and providers. Creating a provider account will allow you to reply to reviews
                    regarding the address(s) you own.</p>

                    <p>Whilst we would love for landlords and agents to be able to respond to reviews straight away, it is
                    important that we carry out sufficient verification in order to provide a service that is as useful
                    and valid as possible.</p>

                    <p>Please send us a request by clicking the button below and we will get back to you as soon as possible. Thank you
                    for your understanding.</p>

                    <TextField
                        id="standard-select-currency-native"
                        select
                        disabled={this.state.postDisabled}
                        label="Rentor Type"
                        value={this.state.rentorType}
                        onChange={this.handleChange('rentorType')}
                        SelectProps={{
                            native: true,
                        }}
                        helperText=""
                        margin="normal"
                    >
                        {types.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>

                    <br/>

                    <button onClick={this.requestAccount}>Request Provider Account</button>

                </div>

            </Modal>
        }
        else {
            content = null;
        }

        return (
                <div className='landlordSettingSection'>
                    { this.state.alert ?  <Alert reason={this.state.alertType} message={this.state.alertMessage}/> : null }
                    {content}
                </div>
        );
    }
}

export default ProfileLandlordSetting;
