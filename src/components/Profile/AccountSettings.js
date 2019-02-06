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
import { withFirebase } from './../Firebase';

// The URL which points to the Express server
const BASE_URL = config.serverURL;

class ProfileAccountSettings extends React.Component {

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
        alert: false,
        alertType: '',
        alertMessage: ''
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    resetPassword = () => {
        this.props.firebase
            .doPasswordReset(this.props.auth.email)
            .then(response => {
                this.setState({success: true})
            })
            .catch(error => {
                this.setState({ error });
            });
    };

    render() {

        let type = this.props.type;
        let content;

        if (type === 'account') {
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

                    <h3>Account Settings</h3>

                    <p className='resetPassword' onClick={this.resetPassword}>Reset Password</p>

                    <div className='resetSuccess'>
                        { this.state.success ? <p>You have been sent an email to {this.props.auth.email} with instructions on how to reset your password!</p> : null }
                        { this.state.error ?  <p> There has been an unexpected error, sorry' </p> : null }

                    </div>

                </div>

            </Modal>
        }
        else {
            content = null;
        }

        return (
            <div className='landlordSettingSection'>
                {content}
            </div>
        );
    }
}

export default withFirebase(ProfileAccountSettings);
