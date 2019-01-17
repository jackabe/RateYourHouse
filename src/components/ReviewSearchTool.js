/*
    * Copyright (C) 2019 RateYourHouse
    * File created By Jack Allcock
    *
    * Licensing information goes here
    *
    * Class function: This is the review search input class
    * Dependencies: None
    * Third party libraries/frameworks: Material UI
 */

import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import axios from 'axios';
import PlacesAutocomplete from 'react-places-autocomplete';
import {geocodeByAddress} from 'react-places-autocomplete';
import config from '../config/config';
import ViewReviews from "./ViewReviews";
import Modal from "@material-ui/core/Modal/Modal";
import Typography from "@material-ui/core/Typography/Typography";
import Review from "./Review";

// The address axios calls
const BASE_URL = config.serverURL;

class ReviewSearchTool extends React.Component {

    // State variables
    state = {
        address: '',
        openModal: false,
        openReview: false,
        allReviewData: null,
        reviewData: null
    };

    /**
     * @param: address -> the address sent via the autocomplete search input
     * @method: sets the state of address
     **/
    handleChange = address => {
        this.setState({ address });
    };

    /**
     * @method: close the modal when needed
     **/
    handleClose = () => {
        this.setState({ openModal: false });
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
        for (let i = 0; i < address.length; i++) {
            addressToPost += address[i]['long_name'] + ' ';
        }
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
            .catch(function (error) {
                alert('Oops! There has been an issue with finding a review with that address - please try again');
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
                                            ? { backgroundColor: '#fafafa', fontFamily: "Arial", width: '100%', cursor: 'pointer',                                                                  padding: 5}
                                            : { backgroundColor: '#ffffff', fontFamily: "Arial", width: '100%', cursor: 'pointer',                                                                  padding: 5 };
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
                                <Review data={this.state.reviewData}/>
                            ) : (
                                /* Reviews data passed to the review list */
                                <ViewReviews data={this.state.allReviewData} address={this.state.address}/>
                            )}
                        </div>
                    </Modal>
                 </div>
            </div>
        );
    }
}

export default ReviewSearchTool;
