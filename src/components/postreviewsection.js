import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {
    geocodeByAddress,
} from 'react-places-autocomplete';
import Button from "@material-ui/core/Button/Button";
import Modal from "@material-ui/core/Modal/Modal";
import StarRatingComponent from 'react-star-rating-component';
import Typography from "@material-ui/core/Typography/Typography";
import StarIcon from '@material-ui/icons/Stars';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import axios from "axios";

const BASE_URL = 'http://localhost:4000/';

const styles = theme => ({
    listRoot: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        overflowY: 'auto',
        paddingLeft: '0!important'
    },
    listItem: {
        width: '100%!important',
        padding: '0!important'
    },
    inline: {
        display: 'inline',
    },
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
    purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
    stepperRoot: {
        width: '90%',
        marginTop: -30
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    checkButton: {
        marginBottom: 20,
        marginRight: theme.spacing.unit,
        border: '1px solid #DA563A',
        marginLeft: 8,
        color: '#DA563A'
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    largeHeading: {
        fontSize: theme.typography.pxToRem(18),
        flexBasis: '33.33%',
        flexShrink: 0,
        '@media (max-width:780px)': {
            fontSize: theme.typography.pxToRem(15),
        },
    },
    smallSecondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        '@media (max-width:780px)': {
            fontSize: theme.typography.pxToRem(10),
        },
    },
    heading: {
        fontSize: theme.typography.pxToRem(13),
        flexBasis: '33.33%',
        flexShrink: 0,
        '@media (max-width:780px)': {
            fontSize: theme.typography.pxToRem(10),
        },
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(13),
        '@media (max-width:780px)': {
            fontSize: theme.typography.pxToRem(10),
        },
        color: theme.palette.text.secondary,
    },
    secondaryHeadingRating: {
        fontSize: theme.typography.pxToRem(13),
        '@media (max-width:780px)': {
            fontSize: theme.typography.pxToRem(10),
            marginRight: 40
        },
        color: theme.palette.text.secondary,
    },
    paper: {
        '@media (max-width:780px)': {
            width: '90%',
            height: '100%',
            padding: 20
        },
        width: '60%',
        height: '80%',
        marginTop: 50,
        margin: '0 auto',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: 30
    },
    panel: {
        '@media (max-width:780px)': {
            fontSize: 5,
        },
        fontSize: 9,
    },
    modal: {
        position: 'absolute',
        width: '80%',
        marginTop: -150,
        marginLeft: 100,
        ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
            marginLeft: 5,
        },
        zIndex: -1,
        ['@media (max-width:1200)']: { // eslint-disable-line no-useless-computed-key
            marginLeft: 5
        },
        margin: '0 auto',
        height: '80%',
    },
    main: {
        fontFamily: "Arial",
        width: '100%',
        padding: 10,
        textAlign: 'center',
        alignItems: 'center',
    },
    reviewBox: {
        width: '100%',
        display: 'block',
        paddingBottom: 5,
        ['@media (min-width:780)']: { // eslint-disable-line no-useless-computed-key
            display: 'inline-block',
        },
    },
    rating: {
        marginLeft: '40%',
        marginTop: '-20px',
        width: '80%',
        ['@media (min-width:780px)']: { // eslint-disable-line no-useless-computed-key
            marginLeft: '30%',
        }
    },
    comments: {
        paddingBottom: 5,
    },
    avatar: {
        margin: 10,
    },
    root: {
        fontFamily: "Arial",
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 300,
        ['@media (min-width:780px)']: { // eslint-disable-line no-useless-computed-key
            width: '60%'
        }
    },
    input: {
        width: '100%',
        textAlign: 'center'
    },
    bootstrapRoot: {
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    bootstrapInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderColor: '#DA563A',
            boxShadow: '#DA563A',
        },
    },
    bootstrapRootComments: {
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    bootstrapInputComments: {
        width: '90%',
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 12,
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderColor: '#DA563A',
            boxShadow: '#DA563A',
        },
    },
    bootstrapFormLabel: {
        fontSize: 18,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    commentsContainer: {
        width: '100%'
    },
    margin: {
        margin: theme.spacing.unit,
    },
    errorText: {
        fontSize: theme.typography.pxToRem(12),
    },
    addressText: {
        fontSize: theme.typography.pxToRem(14),
    },
    enterAddress: {
        fontSize: theme.typography.pxToRem(14),
    },
    reviewRatings: {
        width: '100%'
    },
    ratings: {
        width: '100%'
    },
    reviewStage: {}
});

class Input extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            address: '',
            addressToPost: '',
            error: '',
            open: true,
            openInDepth: false,
            expanded: null,
            activeStep: 0,
            skipped: new Set(),
            suggestions: [],
            valid: false,
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
        };

        this.handleSelect = this.handleSelect.bind(this);

    };

    handleNext = () => {
        const {activeStep} = this.state;
        let {skipped} = this.state;
        if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
        }
        this.setState({
            activeStep: activeStep + 1,
            skipped,
        });
    };

    uploadReview = () => {
        // Packages all the data together and adds to form data
        // The form data is then posted to the server via the UR
        // Uses Form Data - https://www.npmjs.com/package/form-data
        //     const data = new FormData();
        //     data.append("address", 'B475QX');
        //     // Make an AJAX upload request using Axios
        //     return axios.post(BASE_URL + "upload/review", data).then(response => {
        //         alert('done')
        //     });
        axios.post(BASE_URL + 'upload/review', {
            address: this.state.addressToPost,
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
            titleInput: this.state.titleInput,
        })
            .then(function (response) {
                console.log(response);
                alert('Your review has been posted successfully! Thank you for contributing!');
                window.location.reload();
            })
            .catch(function (error) {
                alert('Oops! There has been an issue with posting your review - please try again');
            });
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }

    handleClose = () => {
        this.setState({open: false});
        this.setState({openInDepth: false});
    };

    onStarClick(nextValue, prevValue, name) {
        this.setState({
            [name]: nextValue
        });
    }

    onCommentsChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handlePanelChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    goToAddress(address) {
        let addressToPost = '';
        let i = 0;
        for (i; i < address.length; i++) {
            addressToPost += address[i]['long_name'] + ' ';
        }
        this.setState({addressToPost});
        this.setState({valid: true});
    };

    handleSelect() {
        let road = document.getElementById("addressLine").value;
        let city = document.getElementById("city").value;
        let postCode = document.getElementById("postcode").value;
        let addressIn = road + ' ' + city + ' ' + postCode;
        geocodeByAddress(addressIn)
            .then(results => results[0]['address_components'])
            .then(address => this.goToAddress(address))
            .catch(error => this.setState({error}));
    };

    getSteps() {
        return ['Enter Address', 'Enter Review', 'Submit Review'];
    }

    render() {

        const steps = this.getSteps();
        const {activeStep} = this.state;
        const google = window.google;
        const openForm = this.props.open;

        const {classes} = this.props;
        const {expanded} = this.state;
        const searchOptions = {
            location: new google.maps.LatLng(54.18815558, -4.5346071),
            radius: 482800,
            types: ['address']
        };

        return (
            <div>
                {openForm ? (
                    <div className={classes.modal}>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.props.handler}
                        >
                            <div className={classes.paper}>
                                <Typography className={classes.largeHeading} id="modal-title">
                                    Write a review
                                </Typography>
                                <div className='backButton'>
                                    <Typography variant="h6" onClick={this.props.handler}>
                                        x
                                    </Typography>
                                </div>

                                <div className={classes.stepperRoot}>
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
                                    <div>
                                        {activeStep === 2 ? (
                                            /****************** Last step - review ******************/
                                            <div className={classes.reviewStage}>
                                                <Typography className={classes.largeHeading} id="modal-title">
                                                    Review confirmation
                                                </Typography>

                                                <ExpansionPanel className={classes.reviewRatings}
                                                                expanded={expanded === 'panel5'}
                                                                onChange={this.handlePanelChange('panel5')}>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                        <Typography className={classes.heading}>Review
                                                            Ratings</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <div className={classes.ratings}>
                                                            <div className={classes.reviewBox}>
                                                                <Typography className={classes.secondaryHeadingRating}>
                                                                    Landlord Communication:
                                                                </Typography>
                                                                <div className={classes.rating}>
                                                                    <StarRatingComponent
                                                                        name="landlordCommunicationRating"
                                                                        editing={false}
                                                                        renderStarIcon={() => <span><StarIcon/></span>}
                                                                        starCount={5}
                                                                        value={this.state.landlordCommunicationRating}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className={classes.reviewBox}>
                                                                <Typography className={classes.secondaryHeadingRating}>
                                                                    Landlord Helpfulness:
                                                                </Typography>
                                                                <div className={classes.rating}>
                                                                    <StarRatingComponent
                                                                        name="LandlordHelpfulnessRating"
                                                                        editing={false}
                                                                        renderStarIcon={() => <span><StarIcon/></span>}
                                                                        starCount={5}
                                                                        value={this.state.LandlordHelpfulnessRating}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className={classes.reviewBox}>
                                                                <Typography className={classes.secondaryHeadingRating}>
                                                                    Agent Communication:
                                                                </Typography>
                                                                <div className={classes.rating}>
                                                                    <StarRatingComponent
                                                                        name="agentCommunicationRating"
                                                                        editing={false}
                                                                        renderStarIcon={() => <span><StarIcon/></span>}
                                                                        starCount={5}
                                                                        value={this.state.agentCommunicationRating}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className={classes.reviewBox}>
                                                                <Typography className={classes.secondaryHeadingRating}>
                                                                    Agent Helpfulness:
                                                                </Typography>
                                                                <div className={classes.rating}>
                                                                    <StarRatingComponent
                                                                        name="agentHelpfulnessRating"
                                                                        editing={false}
                                                                        renderStarIcon={() => <span><StarIcon/></span>}
                                                                        starCount={5}
                                                                        value={this.state.agentHelpfulnessRating}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className={classes.reviewBox}>
                                                                <Typography className={classes.secondaryHeadingRating}>
                                                                    House furniture quality:
                                                                </Typography>
                                                                <div className={classes.rating}>
                                                                    <StarRatingComponent
                                                                        name="houseFurnishingRating"
                                                                        editing={false}
                                                                        renderStarIcon={() => <span><StarIcon/></span>}
                                                                        starCount={5}
                                                                        value={this.state.houseFurnishingRating}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className={classes.reviewBox}>
                                                                <Typography className={classes.secondaryHeadingRating}>
                                                                    House condition:
                                                                </Typography>
                                                                <div className={classes.rating}>
                                                                    <StarRatingComponent
                                                                        name="houseConditionRating"
                                                                        editing={false}
                                                                        renderStarIcon={() => <span><StarIcon/></span>}
                                                                        starCount={5}
                                                                        value={this.state.houseConditionRating}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className={classes.reviewBox}>
                                                                <Typography className={classes.secondaryHeadingRating}>
                                                                    Ease of move in:
                                                                </Typography>
                                                                <div className={classes.rating}>
                                                                    <StarRatingComponent
                                                                        name="moveInRating"
                                                                        editing={false}
                                                                        renderStarIcon={() => <span><StarIcon/></span>}
                                                                        starCount={5}
                                                                        value={this.state.moveInRating}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className={classes.reviewBox}>
                                                                <Typography className={classes.secondaryHeadingRating}>
                                                                    Ease of move out:
                                                                </Typography>
                                                                <div className={classes.rating}>
                                                                    <StarRatingComponent
                                                                        name="moveOutRating"
                                                                        editing={false}
                                                                        renderStarIcon={() => <span><StarIcon/></span>}
                                                                        starCount={5}
                                                                        value={this.state.moveOutRating}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className={classes.reviewBox}>
                                                                <Typography className={classes.secondaryHeadingRating}>
                                                                    Price:
                                                                </Typography>
                                                                <div className={classes.rating}>
                                                                    <StarRatingComponent
                                                                        name="priceRating"
                                                                        editing={false}
                                                                        renderStarIcon={() => <span><StarIcon/></span>}
                                                                        starCount={5}
                                                                        value={this.state.priceRating}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>

                                                <ExpansionPanel expanded={expanded === 'panel6'}
                                                                onChange={this.handlePanelChange('panel6')}>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                        <Typography className={classes.heading}>Comments
                                                            made</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <div className={classes.reviewComments}>
                                                            <Typography className={classes.secondaryHeading}>
                                                                Landlord Comments:
                                                            </Typography>
                                                            <Typography className={classes.secondaryHeading}>
                                                                {this.state.landlordComments}
                                                            </Typography>
                                                            <Typography className={classes.secondaryHeading}>
                                                                Agency Comments:
                                                            </Typography>
                                                            <Typography className={classes.secondaryHeading}>
                                                                {this.state.agencyComments}
                                                            </Typography>
                                                            <Typography className={classes.secondaryHeading}>
                                                                House Comments:
                                                            </Typography>
                                                            <Typography className={classes.secondaryHeading}>
                                                                {this.state.houseComments}
                                                            </Typography>
                                                            <Typography className={classes.secondaryHeading}>
                                                                Logistics Comments:
                                                            </Typography>
                                                            <Typography className={classes.secondaryHeading}>
                                                                {this.state.logisticsComments}
                                                            </Typography>
                                                        </div>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>

                                                <br/>
                                                <div>
                                                    <br/>
                                                    <Button
                                                        disabled={activeStep === 0}
                                                        onClick={this.handleBack}
                                                        className={classes.button}
                                                    >
                                                        Back
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.uploadReview}
                                                        className={classes.button}
                                                    >
                                                        Submit Review
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                {activeStep === 0 ? (
                                                    /********* Address form ***********/
                                                    <div>
                                                        <div className={classes.comments}>
                                                            <FormControl className={classes.margin}>
                                                                <InputLabel shrink htmlFor="bootstrap-input"
                                                                            className={classes.bootstrapFormLabel}>
                                                                    Address Line 1
                                                                </InputLabel>
                                                                <InputBase
                                                                    id="addressLine"
                                                                    placeholder="e.g., 8 HouseStreet Lane"
                                                                    classes={{
                                                                        root: classes.bootstrapRoot,
                                                                        input: classes.bootstrapInput,
                                                                    }}
                                                                />
                                                            </FormControl>

                                                            <FormControl className={classes.margin}>
                                                                <InputLabel shrink htmlFor="bootstrap-input"
                                                                            className={classes.bootstrapFormLabel}>
                                                                    City
                                                                </InputLabel>
                                                                <InputBase
                                                                    id="city"
                                                                    placeholder="e.g., Birmingham"
                                                                    classes={{
                                                                        root: classes.bootstrapRoot,
                                                                        input: classes.bootstrapInput,
                                                                    }}
                                                                />
                                                            </FormControl>

                                                            <FormControl className={classes.margin}>
                                                                <InputLabel shrink htmlFor="bootstrap-input"
                                                                            className={classes.bootstrapFormLabel}>
                                                                    PostCode
                                                                </InputLabel>
                                                                <InputBase
                                                                    id="postcode"
                                                                    placeholder="e.g., B47 9HJ"
                                                                    classes={{
                                                                        root: classes.bootstrapRoot,
                                                                        input: classes.bootstrapInput,
                                                                    }}
                                                                />
                                                            </FormControl>
                                                        </div>

                                                        <br/>

                                                        <Button onClick={this.handleSelect}
                                                                className={classes.checkButton}>
                                                            Check Address
                                                        </Button>

                                                        <br/>

                                                        <Paper className={classes.root} elevation={2}>
                                                            <div className={classes.main}>
                                                                <div>
                                                                    {this.state.addressToPost.length !== 0 ? (
                                                                        <div>
                                                                            <span
                                                                                className={classes.addressText}>{this.state.addressToPost}</span>
                                                                        </div>
                                                                    ) : (
                                                                        <div>
                                                                            {this.state.error.length !== 0 ? (
                                                                                <div>
                                                                                    <span className={classes.errorText}>Oops! The address entered has either been entered incorrectly or is not available on our public database. Please try again or contact the support team at <a
                                                                                        href='www.ratemyhouse.com/support'>www.ratemyhouse.com/support</a></span>
                                                                                </div>
                                                                            ) : (
                                                                                <div>
                                                                                    <span
                                                                                        className={classes.enterAddress}>You need to enter an                                                                                     address</span>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </Paper>
                                                        <br/>
                                                    </div>
                                                ) : (
                                                    /********** review form **********/
                                                    <div>
                                                        <ExpansionPanel expanded={expanded === 'panelFeedback'}
                                                                        onChange={this.handlePanelChange('panelFeedback')}>
                                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                                <Typography
                                                                    className={classes.heading}>Feedback</Typography>
                                                                <Typography className={classes.secondaryHeading}>
                                                                    The title and body of the review
                                                                </Typography>
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails className={classes.reviewBox}>

                                                                <div className={classes.comments}>
                                                                    <Typography className={classes.heading}>
                                                                        Title (max 10 characters):
                                                                    </Typography>
                                                                    <FormControl className={classes.commentsContainer}>
                                                                        <InputBase
                                                                            id="titleInput"
                                                                            value={this.state.titleInput}
                                                                            onChange={this.onCommentsChange("titleInput")}
                                                                            placeholder=""
                                                                            classes={{
                                                                                root: classes.bootstrapRootComments,
                                                                                input: classes.bootstrapInputComments,
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <Typography className={classes.heading}>
                                                                        Your personal review:
                                                                    </Typography>
                                                                    <FormControl className={classes.commentsContainer}>
                                                                        <InputBase
                                                                            id="mainReviewInput"
                                                                            multiline
                                                                            value={this.state.mainReviewInput}
                                                                            onChange={this.onCommentsChange("mainReviewInput")}
                                                                            placeholder=""
                                                                            classes={{
                                                                                root: classes.bootstrapRootComments,
                                                                                input: classes.bootstrapInputComments,
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                </div>

                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>

                                                        <ExpansionPanel className='panel'
                                                                        expanded={expanded === 'panel1'}
                                                                        onChange={this.handlePanelChange('panel1')}>
                                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                                <Typography
                                                                    className={classes.heading}>Landlord</Typography>
                                                                <Typography className={classes.secondaryHeading}>Landlord
                                                                    review</Typography>
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails className={classes.reviewBox}>

                                                                <div className={classes.reviewBox}>
                                                                    <Typography className={classes.secondaryHeading}>
                                                                        Communication:
                                                                    </Typography>
                                                                    <div className={classes.rating}>
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

                                                                <div className={classes.reviewBox}>
                                                                    <Typography className={classes.secondaryHeading}>
                                                                        Helpfulness:
                                                                    </Typography>
                                                                    <div className={classes.rating}>
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

                                                                <div className={classes.comments}>
                                                                    <Typography className={classes.heading}>
                                                                        Comments:
                                                                    </Typography>
                                                                    <FormControl className={classes.commentsContainer}>
                                                                        <InputBase
                                                                            id="landlordComments"
                                                                            value={this.state.landlordComments}
                                                                            placeholder=""
                                                                            onChange={this.onCommentsChange("landlordComments")}
                                                                            classes={{
                                                                                root: classes.bootstrapRootComments,
                                                                                input: classes.bootstrapInputComments,
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                </div>

                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>
                                                        <ExpansionPanel expanded={expanded === 'panel2'}
                                                                        onChange={this.handlePanelChange('panel2')}>
                                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                                <Typography className={classes.heading}>Letting
                                                                    Agents</Typography>
                                                                <Typography className={classes.secondaryHeading}>
                                                                    Reviewers Agent: CPS Homes
                                                                </Typography>
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails className={classes.reviewBox}>
                                                                <div className={classes.reviewBox}>
                                                                    <Typography className={classes.secondaryHeading}>
                                                                        Communication:
                                                                    </Typography>
                                                                    <div className={classes.rating}>
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

                                                                <div className={classes.reviewBox}>
                                                                    <Typography className={classes.secondaryHeading}>
                                                                        Helpfulness:
                                                                    </Typography>
                                                                    <div className={classes.rating}>
                                                                        <StarRatingComponent
                                                                            name="agentHelpfulnessRating"
                                                                            editing={true}
                                                                            renderStarIcon={() =>
                                                                                <span><StarIcon/></span>}
                                                                            value={this.state.agentHelpfulnessRating}
                                                                            onStarClick={this.onStarClick.bind(this)}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className={classes.comments}>
                                                                    <Typography className={classes.heading}>
                                                                        Comments:
                                                                    </Typography>
                                                                    <FormControl className={classes.commentsContainer}>
                                                                        <InputBase
                                                                            id="agencyComments"
                                                                            value={this.state.agencyComments}
                                                                            placeholder=""
                                                                            onChange={this.onCommentsChange("agencyComments")}
                                                                            classes={{
                                                                                root: classes.bootstrapRootComments,
                                                                                input: classes.bootstrapInputComments,
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                </div>

                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>
                                                        <ExpansionPanel expanded={expanded === 'panel3'}
                                                                        onChange={this.handlePanelChange('panel3')}>
                                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                                <Typography className={classes.heading}>House
                                                                    Quality</Typography>
                                                                <Typography className={classes.secondaryHeading}>
                                                                    The furniture, condition, location...
                                                                </Typography>
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails className={classes.reviewBox}>

                                                                <div className={classes.reviewBox}>
                                                                    <Typography className={classes.secondaryHeading}>
                                                                        Quality of furniture:
                                                                    </Typography>
                                                                    <div className={classes.rating}>
                                                                        <StarRatingComponent
                                                                            name="houseFurnishingRating"
                                                                            editing={true}
                                                                            renderStarIcon={() =>
                                                                                <span><StarIcon/></span>}
                                                                            value={this.state.houseFurnishingRating}
                                                                            onStarClick={this.onStarClick.bind(this)}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className={classes.reviewBox}>
                                                                    <Typography className={classes.secondaryHeading}>
                                                                        Condition of house:
                                                                    </Typography>
                                                                    <div className={classes.rating}>
                                                                        <StarRatingComponent
                                                                            name="houseConditionRating"
                                                                            editing={true}
                                                                            renderStarIcon={() =>
                                                                                <span><StarIcon/></span>}
                                                                            value={this.state.houseCondtionRating}
                                                                            onStarClick={this.onStarClick.bind(this)}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className={classes.comments}>
                                                                    <Typography className={classes.heading}>
                                                                        Comments:
                                                                    </Typography>
                                                                    <FormControl className={classes.commentsContainer}>
                                                                        <InputBase
                                                                            id="houseComments"
                                                                            value={this.state.houseComments}
                                                                            onChange={this.onCommentsChange("houseComments")}
                                                                            placeholder=""
                                                                            classes={{
                                                                                root: classes.bootstrapRootComments,
                                                                                input: classes.bootstrapInputComments,
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                </div>

                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>
                                                        <ExpansionPanel expanded={expanded === 'panel4'}
                                                                        onChange={this.handlePanelChange('panel4')}>
                                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                                <Typography
                                                                    className={classes.heading}>Logistics</Typography>
                                                                <Typography className={classes.secondaryHeading}>
                                                                    Moving in, moving out, price, bills
                                                                </Typography>
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails className={classes.reviewBox}>

                                                                <div className={classes.reviewBox}>
                                                                    <Typography className={classes.secondaryHeading}>
                                                                        Price:
                                                                    </Typography>
                                                                    <div className={classes.rating}>
                                                                        <StarRatingComponent
                                                                            name="priceRating"
                                                                            editing={true}
                                                                            renderStarIcon={() =>
                                                                                <span><StarIcon/></span>}
                                                                            value={this.state.priceRating}
                                                                            onStarClick={this.onStarClick.bind(this)}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className={classes.reviewBox}>
                                                                    <Typography className={classes.secondaryHeading}>
                                                                        Move in ease:
                                                                    </Typography>
                                                                    <div className={classes.rating}>
                                                                        <StarRatingComponent
                                                                            name="moveInRating"
                                                                            editing={true}
                                                                            renderStarIcon={() =>
                                                                                <span><StarIcon/></span>}
                                                                            value={this.state.moveInRating}
                                                                            onStarClick={this.onStarClick.bind(this)}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className={classes.reviewBox}>
                                                                    <Typography className={classes.secondaryHeading}>
                                                                        Move out ease:
                                                                    </Typography>
                                                                    <div className={classes.rating}>
                                                                        <StarRatingComponent
                                                                            name="moveOutRating"
                                                                            editing={true}
                                                                            renderStarIcon={() =>
                                                                                <span><StarIcon/></span>}
                                                                            value={this.state.moveOutRating}
                                                                            onStarClick={this.onStarClick.bind(this)}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className={classes.comments}>
                                                                    <Typography className={classes.heading}>
                                                                        Comments:
                                                                    </Typography>
                                                                    <FormControl className={classes.commentsContainer}>
                                                                        <InputBase
                                                                            id="logisticsComments"
                                                                            value={this.state.logisticsComments}
                                                                            onChange={this.onCommentsChange("logisticsComments")}
                                                                            placeholder=""
                                                                            classes={{
                                                                                root: classes.bootstrapRootComments,
                                                                                input: classes.bootstrapInputComments,
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                </div>

                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>
                                                        <br/>
                                                    </div>
                                                )}
                                                {this.state.valid ? (
                                                    <div>
                                                        <br/>
                                                        <Button
                                                            disabled={activeStep === 0}
                                                            onClick={this.handleBack}
                                                            className={classes.button}
                                                        >
                                                            Back
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={this.handleNext}
                                                            className={classes.button}
                                                        >
                                                            {activeStep === 2 ? 'Submit Review' : 'Next'}
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <br/>
                                                        <Button
                                                            disabled={activeStep === 0}
                                                            onClick={this.handleBack}
                                                            className={classes.button}
                                                        >
                                                            Back
                                                        </Button>
                                                        <Button
                                                            disabled
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={this.handleNext}
                                                            className={classes.button}
                                                        >
                                                            {activeStep === 2 ? 'Submit Review' : 'Next'}
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                ) : (
                    <p></p>
                )}

            </div>
        )
    }
}


Input.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Input);
