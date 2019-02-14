/*
    * Copyright (C) 2019 RateYourHouse
    * File created By Jack Allcock
    *
    * Licensing information goes here
    *
    * Class function: This is the review search input class
    * Dependencies: Children; Review.js, ViewReviews.js, config.js
    * Third party libraries/frameworks: Material UI
 */

import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import axios from 'axios';
import PlacesAutocomplete from 'react-places-autocomplete';
import {geocodeByAddress} from 'react-places-autocomplete';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import Modal from "@material-ui/core/Modal/Modal";
import Typography from "@material-ui/core/Typography/Typography";
import config from '../../config/config';
import Review from "./Review";
import ViewReviews from "./ViewReviews";

// The address axios calls
const BASE_URL = config.serverURL;

class ReviewSearchTool extends React.Component {

    // State variables
    state = {
        address: '',
        openModal: false,
        openReview: false,
        allReviewData: null,
        reviewData: null,
        alertTitle: '',
        alertInfo: ''
    };

    /**
     * @param: review -> comes from the review list and is the one clicked on
     * @method: handler callback which is passed to the review list to callback a review click
     **/
    openReview = review => {
        this.setState({ openReview: true });
        this.setState({ reviewData: review });
    };

    /**
     * @param: address -> the address sent via the autocomplete search input
     * @method: sets the state of address
     **/
    handleChange = address => {
        this.setState({ address });
    };

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

    /**
     * @param: address -> the address sent via the handle select promise
     * @method: gets the long address, sets the state and makes a call via axios to the server
     * in order to grab a review with that address ID
     * @error: Error is not currently used
     **/
    goToAddress(address) {
        let addressToPost = '';
        // Get the full address as the ID
        let i = 0;
        let number;
        let street;
        let postcode;
        let country;
        let city;

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
            else if (data['types'][0] === 'postal_town') {
                city = data['long_name'];
            }
        }
        addressToPost += number + ' ' + street + ' ' + postcode + ' ' + country + ' ';
        this.setState({ address: addressToPost });
        // Make a call to axios
        axios.get(BASE_URL + 'reviews/'+addressToPost)
            .then(res => {
                // Now get the data to send to modal and callback
                this.setState({
                    allReviewData: res.data,
                    openModal: true
                });
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 404) {
                        this.setState({
                            showError: true,
                            alertTitle: 'No reviews!',
                            alertInfo: 'Sorry, but no one has posted a review for this property yet!',
                        });
                    }
                    else {
                        console.log(error.response);
                        this.setState({
                            showError: true,
                            alertTitle: 'Uh oh!',
                            alertInfo: 'We are currently having problems, please contact support if the issue persists',
                        });
                    }
                }
                else {
                    console.log(error);
                    this.setState({
                        showError: true,
                        alertTitle: 'Uh oh!',
                        alertInfo: 'We are currently having problems, please contact support if the issue persists',
                    });
                }
            });
    };

    /**
     * @param: address -> the address sent input
     * @method: calls the geocode API's and finds all addresses similar
     * @error: sets to state if there is an API error
     **/
    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => results[0]['address_components'])
            .then(address => this.goToAddress(address))
            .catch(error => this.setState({error}));
    };

    render() {
        // To solve google package error
        const google = window.google;
        // Condense results to UK
        // TODO: Make this more effective
        const searchOptions = {
            location: new google.maps.LatLng(54.18815558, -4.5346071),
            radius: 482800,
            types: ['address']
        };

        return (
            <div>
                <Paper elevation={2}>
                    <PlacesAutocomplete
                        className='reviewSearch'
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                        searchOptions={searchOptions}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div className='reviewSearch'>
                                <InputBase className='reviewSearch' {...getInputProps({
                                    placeholder: 'Enter the address...',
                                    className: 'reviewSearch',
                                })}/>
                                <div className='reviewSearch'>
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', fontFamily: "Arial", width: '100%', cursor: 'pointer', padding: 5}
                                            : { backgroundColor: '#ffffff', fontFamily: "Arial", width: '100%', cursor: 'pointer', padding: 5 };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span className='reviewSearchSuggestion'>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                </Paper>
                {/* TODO: Add loading indicator */}
                <div className='modal'>
                    {/* The modal itself */}
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.openModal}
                        onClose={this.handleClose}>
                        {/* Paper effect with close x button*/}
                        <div className='paper'>
                            <div className='backButton'>
                                <Typography variant="h6" onClick={this.handleClose}>
                                    x
                                </Typography>
                            </div>
                            {/* Open up reviews list or specific review */}
                            {this.state.openReview ? (
                                /* Review data passed to the review */
                                <Review data={this.state.reviewData} address={this.state.address}/>
                            ) : (
                                /* Reviews data passed to the review list */
                                <ViewReviews data={this.state.allReviewData} openReview={this.openReview} address={this.state.address}/>
                            )}
                        </div>
                    </Modal>
                 </div>

                {/* Error alert when no reviews found */}
                <div>
                    <SweetAlert
                        show={this.state.showError}
                        title={this.state.alertTitle}
                        text={this.state.alertInfo}
                        showConfirmButton={false}
                        showCancelButton
                        cancelButtonText='Close'
                        animation="slide-from-top"
                        type="error"
                        onCancel={() => this.setState({ showError: false })}
                    />
                </div>
            </div>
        );
    }
}

export default ReviewSearchTool;
