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
import ProfileLandlordSetting from "./ProfileLandlord";
import ProfileAccountSettings from "./AccountSettings";

const styles = {
    root: {
        backgroundColor: "transparent"
    }
};

class Profile extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        openProfile: false,
        showLogout: false,
        settingType: null
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

    /**
     * @param: none
     * @method: Define what setting to add
     **/
    openSetting = (type) => {
        this.setState({settingType: type});
    };

    cancelSetting = () => {
        this.setState({settingType: null})
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

                            <p className='profileEmail'>{this.props.auth.email}</p>

                            <div className='settingsList'>
                                <p onClick={() => this.openSetting('account')}>Account Settings</p>
                                {/*<p>Help</p>*/}
                                <p onClick={() => this.openSetting('landlord')}>Become a Provider</p>
                                <p><a className='privacyLink' target="_blank" href={'/privacy.html'}>Privacy</a></p>
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

                <ProfileLandlordSetting auth={this.props.auth} closeProfile={this.closeProfile} cancelSetting={this.cancelSetting} type={this.state.settingType}/>
                <ProfileAccountSettings auth={this.props.auth} closeProfile={this.closeProfile} cancelSetting={this.cancelSetting} type={this.state.settingType}/>
            </div>
        );
    }
}

export default Profile;
