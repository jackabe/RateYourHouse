/*
    * Copyright (C) 2019 RateYourHouse
    * File created By Jack Allcock
    *
    * Licensing information goes here
    *
    * Class function: This is the header which has the title, info, links and hosts the PostReview form
    * Dependencies: Children: PostReview.js
    * Third party libraries/frameworks: Material UI
 */

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import SweetAlert from "sweetalert-react";
import Localisation from '../abstractions/localisation';
import PostReviewSection from './AddReview/PostReview'
import { withFirebase } from './Firebase';
import Login from "./Authentication/Login";
import Profile from "./Profile/Profile"

class Header extends React.Component {

    // Create a binding here so that we can open the post form model from a different context
    constructor(props) {
        super(props);
        this.handlePostReview = this.handlePostReview.bind(this)
    }

    // Decide whether the post review modal loads up or not
    state = {
        openForm: false,
        openLogin: false,
        showLogout: false,
        alert: null,
    };

    /**
     * @param: none
     * @method: Check if user is logged in, if so open the post form section
     **/
    handlePostReview() {
        if (this.props.authUser) {
            if (this.state.openForm) {
                this.setState({openForm: false});
            }
            else {
                this.setState({openForm: true});
            }
        }
        else {
            this.showSuccessAlert('noLogin');
            this.setState({openLogin: true});
        }
    };

    /**
     * @param: none
     * @method: If called -> open login modal
     **/
    handleLogin = () => {
        this.setState({openLogin: true});
    };

    /**
     * @param: none
     * @method: If called -> close login modal
     **/
    closeLogin = () => {
        this.setState({openLogin: false});
    };

    /**
     * @param: none
     * @method: If called -> show logout alert and hide login modal
     **/
    handleLogout = () => {
        this.setState({showLogout: true});
        this.setState({openLogin: false});
    };

    /**
     * @param: type -> the type of alert (login, signup and nologin)
     * @method: Shows an alert based on type
     **/
    showSuccessAlert = (type) => {
        let alertDialog;
        let nullAlertDialog = <SweetAlert
            show={false}
        />;
        if (type === 'login') {
            alertDialog = <SweetAlert
                title='Logged in'
                text='You have been successfully logged in!'
                animation="slide-from-top"
                type="success"
                show={true}
                onConfirm={() => this.setState({ alert: nullAlertDialog })}
            />;
        }
        else if (type === 'signUp') {
            alertDialog = <SweetAlert
                show={true}
                title='Success!'
                text='Thank you for registering!'
                animation="slide-from-top"
                type="success"
                onConfirm={() => this.setState({ alert: nullAlertDialog })}
            />;
        }
        else if (type === 'noLogin') {
            alertDialog = <SweetAlert
                show={true}
                title='Please login'
                text='This is so we can make reviews as valid as possible!'
                animation="slide-from-top"
                type="info"
                onConfirm={() => this.setState({ alert: nullAlertDialog })}
            />;
        }
        this.setState({alert: alertDialog});
    };

    render() {

        // Logged in comes from app.js verification methods
        const isLoggedIn = this.props.authUser;
        let headerTextPost = Localisation.headerTextPost;
        let headerTitle = Localisation.appName;
        let headerVersion = Localisation.headerVersion;
        let alertDefaultText = Localisation.alertDefaultText;
        let loginText = Localisation.loginText;

        return (
        <React.Fragment>
            {/* Alerts, form link and login/logout (top header) */}
            <AppBar position="sticky" elevation={0}>
                <Toolbar className='header'>
                    <Grid container spacing={8} alignItems="center">
                        <Grid item>
                            <Tooltip title={alertDefaultText}>
                                <IconButton color="inherit">
                                    <NotificationsIcon/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs/>
                        <Grid item>
                            <p className='headerLink' id='postReviewButton' onClick={this.handlePostReview}>
                                {headerTextPost}
                            </p>
                        </Grid>
                        <Grid item className='headerLink'>
                            {isLoggedIn ? (
                                <div onClick={this.profile}>
                                    <Profile auth={this.props.authUser} logoutHandler={this.handleLogout}/>
                                </div>
                            ) : (
                               <div onClick={this.handleLogin}>
                                   <p>
                                       {loginText}
                                   </p>
                               </div>
                            )}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {/* Second header (lower down) has the App name and version */}
            <AppBar
                component="div"
                className='secondaryHeader'
                position="static"
                elevation={0}>

                <Toolbar className='header'>
                    <Grid container alignItems="center" spacing={8}>
                        <Grid item xs>
                            <Typography color="inherit" variant="h4">
                                {headerTitle}
                            </Typography>
                            <p className='headerTitleVersionText'>
                                {headerVersion}
                            </p>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {/* The post review form will load up here when the link is clicked */}
            {/* I pass a handler through to here so that the modal closes when we are done with it */}
            <PostReviewSection authUser={this.props.authUser} open={this.state.openForm} handler={this.handlePostReview}/>

            {/* If no user and login needed show login modal */}
            {!this.props.authUser && this.state.openLogin ? <Login createSuccessAlert={this.showSuccessAlert} shutLoginForm={this.closeLogin}/> : null}

            {/*  Logout alert */}
            {/* TODO: put this with other alerts*/}
            <div>
                <SweetAlert
                    show={this.state.showLogout}
                    title='Logged out'
                    text='You have been successfully logged out!'
                    animation="slide-from-top"
                    type="success"
                    onConfirm={() => this.setState({ showLogout: false })}
                />
            </div>

            {/* All other alerts */}
            <div>
                {this.state.alert}
            </div>

        </React.Fragment>
        );
    }
}

export default withFirebase(Header);
