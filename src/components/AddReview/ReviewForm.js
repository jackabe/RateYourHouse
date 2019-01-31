/*
    * Copyright (C) 2019 RateYourHouse
    * File created By Jack Allcock
    *
    * Licensing information goes here
    *
    * Class function: This is the actual review form -> not submitted from here
    *   Submission takes place in PostReview.js
    * Dependencies: none;
    * Third party libraries/frameworks: Material UI, react-star-rating-component
 */

import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import Localisation from '../../abstractions/localisation';
import StarRatingComponent from "react-star-rating-component";
import StarIcon from '@material-ui/icons/Stars';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

class ReviewForm extends React.Component {

    // Variables to be posted
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            error: '',
            expanded: null,
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
            nextDisabled: true,
            mainCharactersLeft: 'Characters needed: 5',
            secondaryCharactersLeft: 'Characters needed: 20',
        };
    };

    /**
     * @param: nextValue - value clicked, 0 or 5
     * @param: name - class of the rating, e.g Landlord
     * @method: fills in stars when clicked and informs PostReview.js
     **/
    onStarClick(nextValue, name) {
        // Send back to PostReview but still update state to represent change on this page
        this.props.starHandler(name, nextValue);
        this.setState({
            [name]: nextValue
        });
    }

    /**
     * @param: name - class of the comment, e.g Landlord
     * @method: sets comment state in PostReview.js via callback
     *  Also offers feedback on characters
     **/
    onCommentsChange = name => event => {
        // Send back to PostReview but still update state to represent change on this page
        this.props.commentsHandler(name, event.target.value);

        let length = event.target.value.length; // Length of input
        let main = (5 - length); // Review title min of 5
        let secondary = (20 - length); // Review info min of 20

        // Update help text below title
        if (name === 'titleInput' && main >= 0) {
            this.setState(({
                mainCharactersLeft: 'Characters needed: ' + main
            }))
        }
        // Update help below info
        else if (name === 'mainReviewInput' && secondary >= 0) {
            this.setState(({
                secondaryCharactersLeft: 'Characters needed: ' + secondary
            }));
        }
        // Set comment state here to remember
        this.setState({
            [name]: event.target.value
        });
    };

    /**
     * @param: none
     * @method: handles stepper next button
     **/
    handleNext = () => {
        // If step is 4, tell parent to show submit button
        if (this.state.activeStep === 4) {
            this.props.onStepHandler(5);
        }
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    /**
     * @param: none
     * @method: unlock next button only if title and info satisfied 5 and 20 characters
     **/
    isDisabled = () => {
        if (this.state.titleInput.length < 5 || this.state.mainReviewInput.length < 20) {
            return true;
        }
    };

    /**
     * @param: none
     * @method: handles stepper back button
     **/
    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    render() {

        const classes = this.props.classes;
        const theme  = this.props;
        // Dynamically load review content here to place in stepper
        const steps =  [
            {
                // Main feedback
                main:
                    <div>
                        <div className='reviewBox'>
                            <p className='heading'>
                                {Localisation.generalFeedback}
                            </p>
                            <p className='secondaryHeading'>
                                {Localisation.generalFeedbackInfo}
                            </p>
                        </div>
                        <div className='comments'>
                            <p className='commentsHeading'>
                                {Localisation.reviewTitle}
                            </p>
                            <FormControl className='commentsContainer'>
                                <InputBase
                                    id="titleInput"
                                    value={this.state.titleInput}
                                    onChange={this.onCommentsChange("titleInput")}
                                    placeholder=""
                                    classes={{
                                        root: classes.bootstrapRoot,
                                        input: classes.reviewInput,
                                    }}
                                />
                            </FormControl>
                            {this.state.mainCharactersLeft === 'Characters needed: 0' ? (
                                <p className='mainCharacterCheck'>
                                    {this.state.mainCharactersLeft}
                                </p>
                            ) : (
                                <p className='mainCharacterCheckFail'>
                                    {this.state.mainCharactersLeft}
                                </p>
                            )}
                            <p className='commentsHeading'>
                                {Localisation.yourReview}
                            </p>
                            <FormControl className='commentsContainer'>
                                <InputBase
                                    id="mainReviewInput"
                                    multiline
                                    value={this.state.mainReviewInput}
                                    onChange={this.onCommentsChange("mainReviewInput")}
                                    placeholder=""
                                    classes={{
                                        root: classes.bootstrapRoot,
                                        input: classes.reviewInput,
                                    }}
                                />
                            </FormControl>
                            {this.state.secondaryCharactersLeft === 'Characters needed: 0' ? (
                                <p className='secondCharacterCheck'>
                                    {this.state.secondaryCharactersLeft}
                                </p>
                            ) : (
                                <p className='secondCharacterCheckFail'>
                                    {this.state.secondaryCharactersLeft}
                                </p>
                            )}
                        </div>
                    </div>
            },
            {
                // Landlord feedback
                main:
                <div>
                    <div className='reviewBox'>
                        <p className='heading'>
                            {Localisation.landlordTitle}
                        </p>
                    </div>
                    <div className='ratingWrapper'>
                        <p className='secondaryHeading'>
                            {Localisation.communication}
                        </p>
                        <div className='rating'>
                            <StarRatingComponent
                                name="landlordCommunicationRating"
                                editing={true}
                                renderStarIcon={() =>
                                    <span><StarIcon/></span>}
                                starCount={5}
                                value={this.state.landlordCommunicationRating}
                                onStarClick={this.onStarClick.bind(this)}
                            />
                        </div>
                    </div>
                    <div className='ratingWrapper'>
                        <p className='secondaryHeading'>
                            {Localisation.helpfulness}
                        </p>
                        <div className='rating'>
                            <StarRatingComponent
                                name="LandlordHelpfulnessRating"
                                editing={true}
                                renderStarIcon={() =>
                                    <span><StarIcon/></span>}
                                starCount={5}
                                value={this.state.LandlordHelpfulnessRating}
                                onStarClick={this.onStarClick.bind(this)}
                            />
                        </div>
                    </div>
                    <div className='comments'>
                        <p className='commentsHeading'>
                            {Localisation.comments}
                        </p>
                        <FormControl className='commentsContainer'>
                            <InputBase
                                id="landlordComments"
                                multiline
                                value={this.state.landlordComments}
                                placeholder=""
                                onChange={this.onCommentsChange("landlordComments")}
                                classes={{
                                    root: classes.bootstrapRoot,
                                    input: classes.reviewInput,
                                }}
                            />
                        </FormControl>
                    </div>
                </div>
            },
            {
                // Agent feedback
                main:
                    <div>
                        <div className='reviewBox'>
                            <p className='heading'>
                                {Localisation.agentTitle}
                            </p>
                        </div>
                        <div className='ratingWrapper'>
                            <p className='secondaryHeading'>
                                {Localisation.communication}
                            </p>
                            <div className='rating'>
                                <StarRatingComponent
                                    name="agentCommunicationRating"
                                    editing={true}
                                    renderStarIcon={() =>
                                        <span><StarIcon/></span>}
                                    starCount={5}
                                    value={this.state.agentCommunicationRating}
                                    onStarClick={this.onStarClick.bind(this)}
                                />
                            </div>
                        </div>
                        <div className='ratingWrapper'>
                            <p className='secondaryHeading'>
                                {Localisation.helpfulness}
                            </p>
                            <div className='rating'>
                                <StarRatingComponent
                                    name="agentHelpfulnessRating"
                                    editing={true}
                                    renderStarIcon={() =>
                                        <span><StarIcon/></span>}
                                    starCount={5}
                                    value={this.state.agentHelpfulnessRating}
                                    onStarClick={this.onStarClick.bind(this)}
                                />
                            </div>
                        </div>
                        <div className='comments'>
                            <p className='commentsHeading'>
                                {Localisation.nameOfAgent}
                            </p>
                            <FormControl className='commentsContainer'>
                                <InputBase
                                    id="agencyComments"
                                    multiline
                                    value={this.state.agencyComments}
                                    placeholder=""
                                    onChange={this.onCommentsChange("agencyComments")}
                                    classes={{
                                        root: classes.bootstrapRoot,
                                        input: classes.reviewInput,
                                    }}
                                />
                            </FormControl>
                        </div>
                    </div>
            },
            {
                // House feedback
                main:
                    <div>
                        <div className='reviewBox'>
                            <p className='heading'>
                                {Localisation.houseTitle}
                            </p>
                        </div>
                        <div className='ratingWrapper'>
                            <p className='secondaryHeading'>
                                {Localisation.furnitureQuality}
                            </p>
                            <div className='rating'>
                                <StarRatingComponent
                                    name="houseFurnishingRating"
                                    editing={true}
                                    renderStarIcon={() =>
                                        <span><StarIcon/></span>}
                                    starCount={5}
                                    value={this.state.houseFurnishingRating}
                                    onStarClick={this.onStarClick.bind(this)}
                                />
                            </div>
                        </div>
                        <div className='ratingWrapper'>
                            <p className='secondaryHeading'>
                                {Localisation.houseCondition}
                            </p>
                            <div className='rating'>
                                <StarRatingComponent
                                    name="houseConditionRating"
                                    editing={true}
                                    renderStarIcon={() =>
                                        <span><StarIcon/></span>}
                                    starCount={5}
                                    value={this.state.houseConditionRating}
                                    onStarClick={this.onStarClick.bind(this)}
                                />
                            </div>
                        </div>
                        <div className='comments'>
                            <p className='commentsHeading'>
                                {Localisation.comments}
                            </p>
                            <FormControl className='commentsContainer'>
                                <InputBase
                                    id="houseComments"
                                    value={this.state.houseComments}
                                    multiline
                                    placeholder=""
                                    onChange={this.onCommentsChange("houseComments")}
                                    classes={{
                                        root: classes.bootstrapRoot,
                                        input: classes.reviewInput,
                                    }}
                                />
                            </FormControl>
                        </div>
                    </div>
            },
            {
                // Logistics feedback
                main:
                    <div>
                        <div className='reviewBox'>
                            <p className='heading'>
                                {Localisation.logisticsTitle}
                            </p>
                        </div>
                        <div className='ratingWrapper'>
                            <p className='secondaryHeading'>
                                {Localisation.moveIn}
                            </p>
                            <div className='rating'>
                                <StarRatingComponent
                                    name="moveInRating"
                                    editing={true}
                                    renderStarIcon={() =>
                                        <span><StarIcon/></span>}
                                    starCount={5}
                                    value={this.state.moveInRating}
                                    onStarClick={this.onStarClick.bind(this)}
                                />
                            </div>
                        </div>
                        <div className='ratingWrapper'>
                            <p className='secondaryHeading'>
                                {Localisation.moveOut}
                            </p>
                            <div className='rating'>
                                <StarRatingComponent
                                    name="moveOutRating"
                                    editing={true}
                                    renderStarIcon={() =>
                                        <span><StarIcon/></span>}
                                    starCount={5}
                                    value={this.state.moveOutRating}
                                    onStarClick={this.onStarClick.bind(this)}
                                />
                            </div>
                        </div>
                        <div className='ratingWrapper'>
                            <p className='secondaryHeading'>
                                {Localisation.price}
                            </p>
                            <div className='rating'>
                                <StarRatingComponent
                                    name="priceRating"
                                    editing={true}
                                    renderStarIcon={() =>
                                        <span><StarIcon/></span>}
                                    starCount={5}
                                    value={this.state.priceRating}
                                    onStarClick={this.onStarClick.bind(this)}
                                />
                            </div>
                        </div>
                        <div className='comments'>
                            <p className='commentsHeading'>
                                {Localisation.comments}
                            </p>
                            <FormControl className='commentsContainer'>
                                <InputBase
                                    id="logisticsComments"
                                    multiline
                                    value={this.state.logisticsComments}
                                    placeholder=""
                                    onChange={this.onCommentsChange("logisticsComments")}
                                    classes={{
                                        root: classes.bootstrapRoot,
                                        input: classes.reviewInput,
                                    }}
                                />
                            </FormControl>
                        </div>
                    </div>
            }
        ];

        return (
            <div>
                <Paper square elevation={0} className={classes.header}>
                    {/* Step 6 is the stage after submit */}
                    { this.state.activeStep === 6 ? (
                        <div className='reviewSubmitted'>
                            {/* Here we could show a loading icon? */}
                        </div>
                    ) : (
                        <div>
                            {/* The stepper that loads in the form */}
                            <MobileStepper
                                variant="dots"
                                steps={6}
                                position="static"
                                activeStep={this.state.activeStep}
                                className={classes.root}
                                nextButton={
                                    <Button size="small" onClick={this.handleNext}
                                            disabled={this.state.activeStep === 5 || this.isDisabled()}>
                                        {Localisation.next}
                                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                    </Button>
                                }
                                backButton={
                                    <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                        {Localisation.back}
                                    </Button>
                                }
                            />
                        {/* Step 5 is the verify stage */}
                        { this.state.activeStep === 5 ? (
                            <div className='reviewVerify'>
                                <p>{Localisation.reviewVerify}</p>
                                <p>{Localisation.reviewVerifyInfo}</p>
                                <p className='reviewCannotChangeWarning'>{Localisation.reviewVerifyWarning}</p>
                            </div>
                        ) : (
                        // Else just load the form based on the review stage
                        <div>
                            <div className='reviewWrapper'>
                                {steps[this.state.activeStep].main}
                            </div>
                        </div>
                            )}
                    </div>
                        )}
                </Paper>
            </div>
        )
    }
}

export default ReviewForm;
