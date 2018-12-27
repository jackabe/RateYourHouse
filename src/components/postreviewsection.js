import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import axios from 'axios';
import Icon from '../icon.png';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import Button from "@material-ui/core/Button/Button";
import Modal from "@material-ui/core/Modal/Modal";
import StarRatingComponent from 'react-star-rating-component';
import Typography from "@material-ui/core/Typography/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
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
    bootstrapFormLabel: {
        fontSize: 18,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
});

class Input extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            address: '15 Sycamore Drive',
            addressToPost: '',
            open: true,
            openInDepth: false,
            expanded: null,
            activeStep: 0,
            skipped: new Set(),
            suggestions: []
        };

        this.handleSelect = this.handleSelect.bind(this);

    };

    isStepOptional = step => {
        return step === 1;
    };

    handleNext = () => {
        const { activeStep } = this.state;
        let { skipped } = this.state;
        if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
        }
        this.setState({
            activeStep: activeStep + 1,
            skipped,
        });
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleSkip = () => {
        const { activeStep } = this.state;
        if (!this.isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        this.setState(state => {
            const skipped = new Set(state.skipped.values());
            skipped.add(activeStep);
            return {
                activeStep: state.activeStep + 1,
                skipped,
            };
        });
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

    handleChange = address => {
        this.setState({address});
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
        return ['Enter Address', 'Submit Review'];
    }

    render() {

        const steps = this.getSteps();
        const { activeStep } = this.state;
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
                            <div className='backButton'>
                                <Typography variant="h6" onClick = {this.props.handler}>
                                    x
                                </Typography>
                            </div>
                            <Typography className={classes.largeHeading} id="modal-title">
                                Write a review
                            </Typography>

                            <div className={classes.stepperRoot}>
                                <Stepper activeStep={activeStep}>
                                    {steps.map((label, index) => {
                                        const props = {};
                                        const labelProps = {};
                                        if (this.isStepOptional(index)) {
                                            labelProps.optional = <Typography variant="caption">Optional</Typography>;
                                        }
                                        if (this.isStepSkipped(index)) {
                                            props.completed = false;
                                        }
                                        return (
                                            <Step key={label} {...props}>
                                                <StepLabel {...labelProps}>{label}</StepLabel>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                                <div>
                                    {activeStep === steps.length ? (
                                        <div>
                                            <Typography className={classes.instructions}>
                                                All steps completed - you&apos;re finished
                                            </Typography>
                                            <Button onClick={this.handleReset} className={classes.button}>
                                                Reset
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            {activeStep === 0 ? (
                                                <div>
                                                    <div className={classes.container}>
                                                        <FormControl className={classes.margin}>
                                                            <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
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
                                                            <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
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
                                                            <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
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

                                                    <Button onClick={this.handleSelect} className={classes.checkButton}>
                                                        Check Address
                                                    </Button>

                                                    <br/>

                                                    <Paper className={classes.root} elevation={2}>
                                                        <div className={classes.main}>
                                                            <div>
                                                                {this.state.addressToPost.length !== 0 ? (
                                                                    <div>
                                                                            <span className={classes.main}>{this.state.addressToPost}</span>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        No address entered
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Paper>
                                                    <br/>
                                                </div>
                                                ) : (
                                                    <div>
                                                        <ExpansionPanel className='panel' expanded={expanded === 'panel1'}
                                                                        onChange={this.handlePanelChange('panel1')}>
                                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                                <Typography className={classes.heading}>Landlord</Typography>
                                                                <Typography className={classes.secondaryHeading}>Landlord review</Typography>
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails className={classes.reviewBox}>

                                                                <div className={classes.reviewBox}>
                                                                    <Typography className={classes.secondaryHeading}>
                                                                        Communication:
                                                                    </Typography>
                                                                    <div className={classes.rating}>
                                                                        <StarRatingComponent
                                                                            name="rate2"
                                                                            editing={false}
                                                                            renderStarIcon={() => <span><StarIcon/></span>}
                                                                            starCount={5}
                                                                            value={4}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className={classes.reviewBox}>
                                                                    <Typography className={classes.secondaryHeading}>
                                                                        Helpfulness:
                                                                    </Typography>
                                                                    <div className={classes.rating}>
                                                                        <StarRatingComponent
                                                                            name="rate2"
                                                                            editing={false}
                                                                            renderStarIcon={() => <span><StarIcon/></span>}
                                                                            starCount={5}
                                                                            value={4}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className={classes.comments}>
                                                                    <Typography className={classes.heading}>
                                                                        Comments:
                                                                    </Typography>
                                                                    <Typography className={classes.secondaryHeading}>
                                                                        Landlord was good, though we mainly went through the agent
                                                                    </Typography>
                                                                </div>

                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>
                                                        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handlePanelChange('panel2')}>
                                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                                <Typography className={classes.heading}>Letting Agents</Typography>
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
                                                                            name="rate2"
                                                                            editing={false}
                                                                            renderStarIcon={() => <span><StarIcon/></span>}
                                                                            starCount={5}
                                                                            value={4}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className={classes.reviewBox}>
                                                                    <Typography className={classes.secondaryHeading}>
                                                                        Helpfulness:
                                                                    </Typography>
                                                                    <div className={classes.rating}>
                                                                        <StarRatingComponent
                                                                            name="rate2"
                                                                            editing={false}
                                                                            renderStarIcon={() => <span><StarIcon/></span>}
                                                                            starCount={5}
                                                                            value={2}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className={classes.comments}>
                                                                    <Typography className={classes.heading}>
                                                                        Comments:
                                                                    </Typography>
                                                                    <Typography className={classes.secondaryHeading}>
                                                                        Tended to blame us for everything
                                                                    </Typography>
                                                                </div>

                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>
                                                        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handlePanelChange('panel3')}>
                                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                                <Typography className={classes.heading}>House Quality</Typography>
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
                                                                            name="rate2"
                                                                            editing={false}
                                                                            renderStarIcon={() => <span><StarIcon/></span>}
                                                                            starCount={5}
                                                                            value={2}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className={classes.reviewBox}>
                                                                    <Typography className={classes.secondaryHeading}>
                                                                        Condition of house:
                                                                    </Typography>
                                                                    <div className={classes.rating}>
                                                                        <StarRatingComponent
                                                                            name="rate2"
                                                                            editing={false}
                                                                            renderStarIcon={() => <span><StarIcon/></span>}
                                                                            starCount={5}
                                                                            value={3}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className={classes.comments}>
                                                                    <Typography className={classes.heading}>
                                                                        Comments:
                                                                    </Typography>
                                                                    <Typography className={classes.secondaryHeading}>
                                                                        Place is falling down, needs updating
                                                                    </Typography>
                                                                </div>

                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>
                                                        <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handlePanelChange('panel4')}>
                                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                                <Typography className={classes.heading}>Logistics</Typography>
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
                                                                            name="rate2"
                                                                            editing={false}
                                                                            renderStarIcon={() => <span><StarIcon/></span>}
                                                                            starCount={5}
                                                                            value={4}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className={classes.reviewBox}>
                                                                    <Typography className={classes.secondaryHeading}>
                                                                        Move in ease:
                                                                    </Typography>
                                                                    <div className={classes.rating}>
                                                                        <StarRatingComponent
                                                                            name="rate2"
                                                                            editing={false}
                                                                            renderStarIcon={() => <span><StarIcon/></span>}
                                                                            starCount={5}
                                                                            value={4}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className={classes.reviewBox}>
                                                                    <Typography className={classes.secondaryHeading}>
                                                                        Move out ease:
                                                                    </Typography>
                                                                    <div className={classes.rating}>
                                                                        <StarRatingComponent
                                                                            name="rate2"
                                                                            editing={false}
                                                                            renderStarIcon={() => <span><StarIcon/></span>}
                                                                            starCount={5}
                                                                            value={4}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className={classes.comments}>
                                                                    <Typography className={classes.heading}>
                                                                        Comments:
                                                                    </Typography>
                                                                    <Typography className={classes.secondaryHeading}>
                                                                        Overall good
                                                                    </Typography>
                                                                </div>

                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>
                                                    </div>
                                            )}
                                            <div>
                                                <br/>
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={this.handleBack}
                                                    className={classes.button}
                                                >
                                                    Back
                                                </Button>
                                                {this.isStepOptional(activeStep) && (
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.handleSkip}
                                                        className={classes.button}
                                                    >
                                                        Skip
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.handleNext}
                                                    className={classes.button}
                                                >
                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                        </div>
                        </div>
                    </Modal>
                </div>
                ): (
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
