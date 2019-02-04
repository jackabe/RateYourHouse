/*
    * Copyright (C) 2019 RateYourHouse
    * File created By Jack Allcock
    *
    * Licensing information goes here
    *
    * Class function: This is the class which hosts the review form and gets an address to post review for
    * Dependencies: Localisation.js, react-places-autocomplete
    * Third party libraries/frameworks: Material UI
 */

import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {geocodeByAddress,} from 'react-places-autocomplete';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Localisation from '../../abstractions/localisation';

class AddressForm extends React.Component {

    // Create bindings for buttons
    constructor(props) {
        super(props);
        this.state = {posts: [],
            address: '',
            addressToPost: '',
            error: '',
            alert: false,
            alertType: '',
            alertMessage: '',
        };
        this.handleAddressInput = this.handleAddressInput.bind(this);
    };

    /**
     * @param: none
     * @method: When post code entered and street address try and find address -
     **/
    handleAddressInput() {
        let postCode = document.getElementById("postcode").value;
        let road = document.getElementById("addressLine").value;
        let city = document.getElementById("city").value;
        let country = 'United Kingdom';
        // Country first to limit to UK
        let addressIn = road + ' ' + city + ' ' + postCode + ' ' + country;
        geocodeByAddress(addressIn)
            .then(results => results[0]['address_components']) // Get full component for analysis
            .then(address => this.goToAddress(address))
            .catch(error => this.setState({error}));
    };

    /**
     * @param: address -> from the above API
     * @method: get the long address and only state valid if road has been started
     *  -> Post address back to PostReview.js
     **/
    goToAddress(address) {
        let addressToPost = '';
        let i = 0;
        let number = 'Unspecified';
        let street;
        let postcode;
        let country;

        for (i; i < address.length; i++) {
            let data = address[i];
            console.log(data['types'][0]);
            if (data['types'][0] === 'postal_code') {
                postcode = data['long_name'];
            }
            else if (data['types'][0] === 'street_number') {
                number = data['long_name'];
            }
            else if (data['types'][0] === 'route') {
                street = data['long_name'];
            }
            else if (data['types'][0] === 'country') {
                country = data['long_name'];
            }
        }

        addressToPost += number + ' ' + street + ' ' + postcode + ' ' + country + ' ';
        let road = document.getElementById("addressLine").value;
        // Do not let people proceed until they have entered a house number/road
        if (road.length > 4 && number !== 'Unspecified') {
            // let addressToPost =
            this.setState({addressToPost});
            // Send the address back to the PostReview section
            this.props.addressHandler(addressToPost);
        }
    };

    render() {
        const classes = this.props.classes;
        const theme = this.props.theme;

        return (
            <div>
                <div>
                    {/* The form itself */}
                    <MuiThemeProvider theme={theme}>
                        <FormControl className={classes.margin}>
                            <InputLabel
                                shrink
                                htmlFor="bootstrap-input"
                                className={classes.bootstrapFormLabel}>
                                {Localisation.postCodeLabel}
                            </InputLabel>
                            <InputBase
                                id="postcode"
                                placeholder={Localisation.postCodeHint}
                                onChange={this.handleAddressInput}
                                classes={{
                                    root: classes.bootstrapRoot,
                                    input: classes.bootstrapInput,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.margin}>
                            <InputLabel
                                shrink
                                htmlFor="bootstrap-input"
                                className={classes.bootstrapFormLabel}>
                                {Localisation.addressLineLabel}
                            </InputLabel>
                            <InputBase
                                onChange={this.handleAddressInput}
                                id="addressLine"
                                placeholder={Localisation.addressHint}
                                classes={{
                                    root: classes.bootstrapRoot,
                                    input: classes.bootstrapInput,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.margin}>
                            <InputLabel
                                shrink
                                htmlFor="bootstrap-input"
                                className={classes.bootstrapFormLabel}>
                                {Localisation.cityLabel}
                            </InputLabel>
                            <InputBase
                                id="city"
                                placeholder={Localisation.cityHint}
                                classes={{
                                    root: classes.bootstrapRoot,
                                    input: classes.bootstrapInput,
                                }}
                            />
                        </FormControl>
                    </MuiThemeProvider>
                </div>
                <br/>
                <br/>
                {/* Address then shown in a validation box */}
                <Paper className='postReviewRoot' elevation={2}>
                    <div className='postReviewMain'>
                        <div>
                            {/* Found an address*/}
                            {this.state.addressToPost.length !== 0 ? (
                                <div>
                                    <span
                                        className='foundAddress'>
                                        Found an address! Press next if it is the one you need!
                                    </span>
                                    <br/>
                                    <span
                                        className='addressText'>
                                        {this.state.addressToPost}
                                    </span>
                                </div>
                            ) : (
                                <div>
                                    {/* No address yet */}
                                    {this.state.error.length !== 0 ? (
                                        <div>
                                           <span className='errorText'>{Localisation.addressBoxErrorText}
                                                <a
                                               href={Localisation.supportLink}>{Localisation.supportLink}
                                               </a>
                                           </span>
                                        </div>
                                    ) : (
                                        /* The help text when nothing entered but no error */
                                        <div>
                                           <span
                                               className='enterAddress'>{Localisation.enterAddress}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </Paper>
                <br/>
            </div>
        )
    }
}

export default AddressForm;
