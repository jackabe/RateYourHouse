/*
    * Copyright (C) 2019 RateYourHouse
    * File created By Jack Allcock
    *
    * Licensing information goes here
    *
    * Class function: This is profile section which handles account management
    * Dependencies: None
    * Third party libraries/frameworks: Material UI
 */

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import UserImage from '../../images/user.svg';
import SignOutButton from "../Authentication/SignOut";
import Modal from "@material-ui/core/Modal";
import Exit from '@material-ui/icons/ExitToApp';

class Profile extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        openProfile: false,
        showLogout: false
    };

    /**
     * @method: open profile modal
     **/
    openProfile = () => {
        this.setState({openProfile: true});
    };

    /**
     * @method: close the profile modal
     **/
    closeProfile = () => {
        this.setState({openProfile: false});
    };

    /**
     * @param: none
     * @method: If called -> call back to header logout method
     **/
    handleLogout = () => {
        this.props.logoutHandler();
    };

    render() {

        return (
            <div>
                <Tooltip title='Profile'>
                    <IconButton color="inherit" onClick={this.openProfile}>
                            <img alt='Profile' src={UserImage} className='profileAvatar'/>
                    </IconButton>
                </Tooltip>

                <div className='profileSection'>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.openProfile}
                        onClose={this.closeProfile}>
                        {/* Paper effect with close x button*/}
                        <div className='profileModal'>

                            <p className='profileEmail'>jackallcock@yahoo.co.uk</p>

                            <div className='settingsList'>
                                <p className='settingsLink'>Account Settings</p>
                                <p className='settingsLink'>Help</p>
                                <p className='settingsLink'>Share</p>
                                <p className='settingsLink'>Privacy</p>
                            </div>

                            <div className='profileLogout'>
                                <div className='profileLogoutButton' onClick={this.handleLogout}>
                                    <SignOutButton/>
                                </div>
                                <div className='logoutIcon'>
                                    <Exit/>
                                </div>
                            </div>

                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Profile;
