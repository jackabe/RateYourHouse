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
import Google from "../../images/icon-google.png"
import Facebook from "../../images/facebook-icon.png"
import { withFirebase } from './../Firebase';

const ERROR_CODE_ACCOUNT_EXISTS =
    'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists.
`;

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    openModal: true,
};

class Login extends React.Component {

    constructor (props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.createSuccessAlert('login');
            })
            .catch(error => {
                console.log(error.message);
                if (error.message === 'The password is invalid or the user does not have a password.') {
                    this.setState({ forgotten: true });
                }
                this.setState({ error });
            });

        event.preventDefault();
    };

    googleLogin = event => {
        event.preventDefault();
        this.props.firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                this.setState({ ...INITIAL_STATE });
                this.props.createSuccessAlert('login');
                // Create a user in your Firebase Realtime Database too
                return this.props.firebase.user(socialAuthUser.user.uid).set({
                    username: socialAuthUser.user.displayName,
                    email: socialAuthUser.user.email,
                    roles: [],
                });
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }
                else if (error.message === 'The password is invalid or the user does not have a password.') {
                    this.setState({ forgotten: true });
                }
                this.setState({ error });
            });
    };

    facebookLogin = event => {
        this.props.firebase
            .doSignInWithFacebook()
            .then(socialAuthUser => {
                this.setState({ ...INITIAL_STATE });
                this.props.createSuccessAlert('login');
                // Create a user in your Firebase Realtime Database too
                return this.props.firebase.user(socialAuthUser.user.uid).set({
                    username: socialAuthUser.additionalUserInfo.profile.name,
                    email: socialAuthUser.additionalUserInfo.profile.email,
                    roles: [],
                });
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }
                else if (error.message === 'The password is invalid or the user does not have a password.') {
                    this.setState({ forgotten: true });
                }
                this.setState({ error });
            });

        event.preventDefault();
    };

    onSignUp = event => {
        const { username, email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                this.props.createSuccessAlert('signUp');
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    signUp = () => {
        this.setState({ signUp: true });
    };

    login = () => {
        this.setState({ signUp: false });
    };

    /**
     * @method: close the modal when needed and refresh location
     **/
    handleClose = () => {
        this.props.shutLoginForm();
    };

    render() {
        const {
            email,
            password,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const loginInvalid =
            email === '' ||
            password === '';

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            password === '';

        let login;
        if (!this.state.signUp) {
             login =  <div className='loginModal'>
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
                            <div className='facebook' onClick={this.facebookLogin}>
                                <img src={Facebook} width='30px'/>
                                <p>Facebook</p>
                            </div>
                            <div className='google' onClick={this.googleLogin}>
                                <img src={Google}/>
                                <p>Google</p>
                            </div>
                        </div>

                        <div className='emailForm'>
                            <label>Email</label>
                            <br/>
                            <input
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Email Address"
                            />
                            <br/>
                            <label>Password</label>
                            <br/>
                            <input
                                name="password"
                                value={password}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Password"
                            />

                            {error && <p>{error.message}</p>}

                            <button disabled={loginInvalid} onClick={this.onSubmit}>Login</button>
                        </div>

                        <p className='signUpText'>Not a member? <a onClick={this.signUp}>Sign up now </a></p>

                        { this.state.forgotten ? <p className='forgotText'>Forgotten password? <a onClick={this.resetPassword}>Reset</a></p> : null }

                    </div>

                </Modal>
            </div>;
        }

        else {
            login = <div className='loginModal'>
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

                        <h3>Register</h3>

                        <br/>

                        <div className='emailForm'>
                            <label>Email:</label>
                            <br/>
                            <input
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Email Address"
                            />
                            <br/>
                            <label>Password:</label>
                            <br/>
                            <input
                                name="passwordOne"
                                value={passwordOne}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Password"
                            />
                            <br/>
                            <label>Confirm Password:</label>
                            <br/>
                            <input
                                name="passwordTwo"
                                value={passwordTwo}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Confirm Password"
                            />

                            {error && <p>{error.message}</p>}

                            <button disabled={isInvalid} onClick={this.onSignUp}>Sign up</button>
                        </div>

                        <p className='signUpText'>Already a member? <a onClick={this.login}>Login</a></p>

                    </div>
                </Modal>
            </div>;
        }

        return (
            <div>
                {login}
            </div>

        );
    }
}

export default withFirebase(Login);
