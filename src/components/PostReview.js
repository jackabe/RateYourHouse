/*
    * Copyright (C) 2019 RateYourHouse
    * File created By Jack Allcock
    *
    * Licensing information goes here
    *
    * Class function: This is the PostReview class that lets users post reviews
    * Dependencies: Children: AddressForm.js and ReviewForm.js
    * Third party libraries/frameworks: Material UI, axios
 */

import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal/Modal";
import Typography from "@material-ui/core/Typography/Typography";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from "axios";
import { Line, Circle } from 'rc-progress';
import Alert from "./SnackBar";
import config from '../config/config';
import Localisation from '../abstractions/localisation';
import AddressForm from "./AddressForm";
import ReviewForm from "./ReviewForm";

const BASE_URL = config.serverURL;

// The following are Material UI styles and themes that do not work when extracted to CSS
const theme = createMuiTheme({
    // Passes to stepper
    palette: {
        primary: {
            main: '#048299',
        },
    },
});

const styles = theme => ({
    // Input wrapper
    bootstrapRoot: {
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    // Address input
    bootstrapInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 13,
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderColor: '#048299',
            boxShadow: '#048299',
        },
    },
    // Input label
    bootstrapFormLabel: {
        fontSize: 15,
    },
    // Review input
    reviewInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        '@media (min-width:780px)': {
            width: 400,
        },
        fontSize: 13,
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderColor: '#048299',
            boxShadow: '#048299',
        },
    },
    // Review Label
    reviewFormLabel: {
        fontSize: 15,
    },
    margin: {
        margin: theme.spacing.unit,
    },
});

class PostReview extends React.Component {

    // Create bindings for buttons/stars/comments from different contexts
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.uploadReview = this.uploadReview.bind(this);
        this.getStarValue = this.getStarValue.bind(this);
        this.getCommentsValue = this.getCommentsValue.bind(this);
        this.onStepHandler = this.onStepHandler.bind(this);
    };

    // Cleaner way of representing large state and can change dynamically
    getInitialState = () => {
        return {
            posts: [],
            addressToPost: '',
            error: '',
            open: true,
            openInDepth: false,
            expanded: null,
            activeStep: 0,
            skipped: new Set(),
            suggestions: [],
            valid: false,
            review: {},
            landlordCommunicationRating: 0,
            LandlordHelpfulnessRating: 0,
            agentCommunicationRating: 0,
            agentHelpfulnessRating: 0,
            priceRating: 0,
            houseFurnishingRating: 0,
            houseConditionRating: 0,
            moveInRating: 0,
            moveOutRating: 0,
            logisticsComments: '',
            houseComments: '',
            landlordComments: '',
            agencyComments: '',
            mainReviewInput: '',
            titleInput: '',
            alert: false,
            alertType: '',
            alertMessage: '',
            postDisabled: false,
            percent: 0,
            progressColor: '#3FC7FA',
        };
    };

    changeProgress(value) {
        const colorMap = ['#85D262', '#3FC7FA'];
        if (value < 30) {
            this.setState({
                percent: value,
                progressColor: colorMap[0],
            });
        }
        else {
            this.setState({
                percent: value,
                progressColor: colorMap[1],
            });
        }
        if (value === 100) {
            window.location.reload();
        }
    }

    // Handle stepper next
    handleNext = () => {
        const {activeStep} = this.state;
        let {skipped} = this.state;
        this.setState({
            activeStep: activeStep + 1,
            skipped,
        });
    };

    // Clicking a star during review
    getStarValue(name, nextValue) {
        this.setState({
            [name]: nextValue
        });
    };

    // Adding comments
    getCommentsValue(name, value) {
        this.setState({
            [name]: value
        });
    };

    // Upload review handler
    uploadReview = () => {
        // Don't let multiple submissions
        this.setState({
            postDisabled: true,
        });
        this.changeProgress(20);
        // Post to server via axios
        axios.post(BASE_URL + 'upload/review', {
            address: this.state.addressToPost,
            // Needs to change
            userId: 'JackUUID',
            landlordCommunicationRating: this.state.landlordCommunicationRating,
            LandlordHelpfulnessRating: this.state.LandlordHelpfulnessRating,
            agentCommunicationRating: this.state.agentCommunicationRating,
            agentHelpfulnessRating: this.state.agentHelpfulnessRating,
            priceRating: this.state.priceRating,
            houseFurnishingRating: this.state.houseFurnishingRating,
            houseConditionRating: this.state.houseConditionRating,
            moveInRating: this.state.moveInRating,
            moveOutRating: this.state.moveOutRating,
            logisticsComments: this.state.logisticsComments,
            houseComments: this.state.houseComments,
            landlordComments: this.state.landlordComments,
            agencyComments: this.state.agencyComments,
            mainReviewInput: this.state.mainReviewInput,
            titleInput: this.state.titleInput.substr(0, config.maxLength)
        })
        .then((response) => {
            this.changeProgress(80);
            this.setState({
                alert: true,
                alertType: 'success',
                alertMessage: 'You have successfully created a review, thanks!'
            });
            setTimeout(() =>
            this.changeProgress(100), 2500);
        })
        .catch((response) => {
            console.log(response);
            this.setState({
                alert: true,
                alertType: 'error',
                alertMessage: 'There was a problem! Please try again.',
            });
            setTimeout(() =>  this.setState({
                postDisabled: false,
                alert: false,
            }), 2000);
        });
    };

    // Handle stepper back
    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    // Handler that comes back from ReviewForm.js stepper to reveal submit button
    onStepHandler(step) {
        // Sets step to 2 to move to submit section
        this.setState({
            reviewStep: step,
            activeStep: 2
        });
    }

    // Set the address from the API to state and enable the next button
    getAddressOfProperty = (addressToPost) => {
        this.setState({addressToPost: addressToPost});
        this.setState({valid: true});
    };

    handleClose = () => {
        this.props.handler();
        window.location.reload();
    };

    render() {
        const steps = ['Enter Address', 'Enter Review', 'Submit Review'];
        const {activeStep} = this.state;
        const openForm = this.props.open;
        const {classes} = this.props;

        return (
            <div>
            {/* If we have an alert, display it here */}
            { this.state.alert ?  <Alert reason={this.state.alertType} message={this.state.alertMessage}/> : null }
            {/* If we are told to open form from header then show this */}
            {openForm ? (
                <div className='modal'>
                    {/* The modal itself */}
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}>
                        {/* Paper effect with close x button*/}
                        <div className='paper'>
                            <div className='backButton'>
                                <Typography variant="h6" onClick={this.handleClose}>
                                    x
                                </Typography>
                            </div>
                            {/* Stepper which hosts the steps */}
                            <div className='stepperRoot'>
                                <MuiThemeProvider theme={theme}>
                                    <Stepper activeStep={activeStep}>
                                        {steps.map((label, index) => {
                                            const props = {};
                                            const labelProps = {};
                                            return (
                                                <Step key={label} {...props}>
                                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                                </Step>
                                            );
                                        })}
                                    </Stepper>
                                </MuiThemeProvider>
                            </div>
                            {/* Content of the stepper */}
                            <div>
                                <div>
                                    <div className='main'>
                                        {/* Step 0 is the address form */}
                                        {activeStep === 0 ? (
                                            /* Address form */
                                            <div>
                                           <AddressForm
                                               classes={classes}
                                               theme={theme}
                                               addressHandler={this.getAddressOfProperty}/>
                                                {/* Buttons for next and back stepper if valid data entered */}
                                                {this.state.valid ? (
                                                    <div>
                                                        <br/>
                                                        <button
                                                            disabled={activeStep === 0}
                                                            onClick={this.handleBack}
                                                            className='postBackButton'>
                                                            {Localisation.back}
                                                        </button>
                                                        <button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={this.handleNext}
                                                            className='postNextButton'>
                                                            {Localisation.next}
                                                        </button>
                                                    </div>
                                                /* Disable next and back if invalid data */
                                                ) : (
                                                    <div>
                                                        <br/>
                                                        <button
                                                            disabled={activeStep === 0}
                                                            onClick={this.handleBack}
                                                            className='postBackButton'>
                                                            {Localisation.back}
                                                        </button>
                                                        <button
                                                            disabled
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={this.handleNext}
                                                            className='postNextButton'>
                                                            {Localisation.next}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        /* Step 1 is the review form */
                                        ) : (
                                            /* Review form */
                                            <div className='reviewFormWrapper'>
                                                <ReviewForm
                                                    classes={classes}
                                                    starHandler={this.getStarValue}
                                                    commentsHandler={this.getCommentsValue}
                                                    onStepHandler={this.onStepHandler}/>
                                                {/* Only show submit and back button on the final stage (5) */}
                                                {this.state.reviewStep === 5 ? (
                                                    <div className='reviewStepperButtons'>
                                                    {/* Disable submit if invalid data / after submit */}
                                                    <div className='progressLine'>
                                                        <Line
                                                            percent={this.state.percent}
                                                            strokeWidth="2"
                                                            strokeColor={this.state.progressColor}/>
                                                    </div>
                                                    {this.state.postDisabled ? (
                                                        <div className='reviewStepperButtons'>
                                                            <button
                                                                onClick={this.handleBack}
                                                                className='postBackButton'>
                                                                {Localisation.back}
                                                            </button>
                                                            <button
                                                                disabled
                                                                color="primary"
                                                                onClick={this.uploadReview}
                                                                className='postNextButton'>
                                                                {Localisation.submit}
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        /* Enable the submit button */
                                                        <div className='reviewStepperButtons'>
                                                            <button
                                                                onClick={this.handleBack}
                                                                className='postBackButton'>
                                                                {Localisation.back}
                                                            </button>
                                                            <button
                                                                color="primary"
                                                                onClick={this.uploadReview}
                                                                className='postNextButton'>
                                                                {Localisation.submit}
                                                            </button>
                                                        </div>
                                                        )}
                                                    </div>
                                                // What to show if the modal is not open
                                                // For now: nothing
                                                ) : (
                                                    null
                                                )}
                                            </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            ) : (
                null
            )}
        </div>
        )
    }
}

export default withStyles(styles)(PostReview);
