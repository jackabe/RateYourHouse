/*
    * Copyright (C) 2019 RateYourHouse
    * File created By Jack Allcock
    *
    * Licensing information goes here
    *
    * Class function: This is the main parent class which hosts the header, review input and post modal
    * Dependencies: Children: ViewReviews.js and Header.js
    * Third party libraries/frameworks: Material UI and react-meta-tags
 */

import React from 'react';
import '../../css/App.css';
import Modal from "@material-ui/core/Modal/Modal";
import Typography from "@material-ui/core/Typography/Typography";
import SweetAlert from "sweetalert-react";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import Google from "../../images/icon-google.png"
import Facebook from "../../images/facebook-icon.png"

class Login extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            openModal: true
        };
    }

    /**
     * @method: close the modal when needed and refresh location
     **/
    handleClose = () => {
        if (this.state.openReview) {
            this.setState({ openReview: false });
        }
        else {
            this.setState({ openModal: false });
            // We may not need to reload - just an inconvenience to user and there is no problematic state to clear
            // window.location.reload();
        }
    };

    render() {

        return (
            <div>
                <div className='loginModal'>
                    {/* The modal itself */}
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.openModal}
                        onClose={this.handleClose}>
                        {/* Paper effect with close x button*/}
                        <div className='loginModal'>
                            <div className='backButton'>
                                <Typography variant="h6" onClick={this.handleClose}>
                                    x
                                </Typography>
                            </div>

                            <h3>Log in with</h3>

                            <div className='alternativeLogins'>
                                <div className='facebook'>
                                    <img src={Facebook} width='30px'/>
                                    <p>Facebook</p>
                                </div>
                                <div className='google'>
                                    <img src={Google}/>
                                    <p>Google</p>
                                </div>
                            </div>

                            <div className='emailForm'>
                                <label>Email</label>
                                <br/>
                                <input/>
                                <br/>
                                <label>Password</label>
                                <br/>
                                <input/>

                                <button>Login</button>
                            </div>

                            <p className='signUpText'>Not a member? <a className={'www.google.co.uk'}>Sign up now </a></p>



                            {/*<SignUpPage/>*/}
                            {/*<SignInPage/>*/}
                        </div>
                    </Modal>
                </div>

                {/* Error alert when no reviews found */}
                <div>
                    <SweetAlert
                        show={this.state.showError}
                        title={this.state.alertTitle}
                        text={this.state.alertInfo}
                        animation="slide-from-top"
                        type="error"
                        onConfirm={() => this.setState({ showError: false })}
                    />
                </div>
            </div>
        );
    }
}

export default Login;
