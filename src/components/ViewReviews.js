import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import axios from 'axios';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress
} from 'react-places-autocomplete';
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
import config from '../config/config';

const BASE_URL = config.serverURL;

const styles = theme => ({
    listRoot: {
        width: '100%',
        backgroundColor: theme.palette.background.postReviewPaper,
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
        marginRight: 20,
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
    postReviewPaper: {
        '@media (max-width:780px)': {
            width: '90%',
            height: '100%',
            padding: 20
        },
        width: '50%',
        height: '80%',
        marginTop: 50,
        margin: '0 auto',
        backgroundColor: theme.palette.background.postReviewPaper,
        boxShadow: theme.shadows[5],
        padding: 30
    },
    postReviewPanel: {
        '@media (max-width:780px)': {
            fontSize: 5,
        },
        fontSize: 9,
    },
    postReviewModal: {
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
    postReviewMain: {
        fontFamily: "Arial",
        width: '100%',
        borderRadius: 50,
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
    postReviewRoot: {
        fontFamily: "Arial",
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        ['@media (min-width:780px)']: { // eslint-disable-line no-useless-computed-key
            width: '100%'
        }
    },
    postReviewInput: {
        width: '100%',
        textAlign: 'center'
    },
});

class ViewReviews extends React.Component {

    state = {
        posts: [],
        data: null,
        address: '',
        open: false,
        openInDepth: false,
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
        review: null
    };

    handleClose = () => {
        this.setState({ open: false });
        this.setState({ openInDepth: false });
    };

    handleChange = address => {
        this.setState({ address });
    };

    handlePanelChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    openReview(id) {
        Object.values(this.state.data).map((review, i) => {
            if (review.id == id) {
                this.setState({ openInDepth: true });
                this.setState({ review: review });
            }
        });
    };

    closeReview = () => {
        this.setState({ openInDepth: false });
    };

    goToAddress(address) {
        let addressToPost = '';
        let i = 0;
        for (i; i < address.length; i++) {
            addressToPost += address[i]['long_name'] + ' ';
        }
        this.setState({ address: addressToPost });

        axios.get(BASE_URL + 'reviews/'+addressToPost)
            .then(res => {
                const reviews = res.data;
                this.setState({ data: reviews });
                this.setState({ open: true });
                this.setState({valid: true});
            })
            .catch(function (error) {
                alert('Oops! There has been an issue with finding a review with that address - please try again');
            });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => results[0]['address_components'])
            .then(address => this.goToAddress(address))
            .catch(error => this.setState({error}));
    };

    render() {
        const google = window.google;

        const {classes} = this.props;
        const { expanded } = this.state;
        const searchOptions = {
            location: new google.maps.LatLng(54.18815558, -4.5346071),
            radius: 482800,
            types: ['address']
        };

        return (
            <div>
                    <Paper className={classes.postReviewRoot} elevation={2}>
                            <PlacesAutocomplete
                                className={classes.postReviewMain}
                                value={this.state.address}
                                onChange={this.handleChange}
                                onSelect={this.handleSelect}
                                searchOptions={searchOptions}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div className={classes.postReviewMain}>
                                        <InputBase className={classes.postReviewMain} {...getInputProps({
                                            placeholder: 'Enter the address...',
                                            className: classes.postReviewMain,
                                        })}/>
                                        <div className={classes.postReviewMain}>
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                // inline style for demonstration purpose
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
                                                        <center><span className={classes.postReviewMain}>{suggestion.description}</span></center>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                    </Paper>

                    {!this.state.openInDepth ? (
                        <div className={classes.postReviewModal}>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.open}
                                onClose={this.handleClose}
                            >
                                <div className={classes.postReviewPaper}>
                                    <Typography className={classes.largeHeading} id="modal-title">
                                        {'Reviews for '+this.state.address}
                                    </Typography>

                                    <Typography vclassName={classes.smallSecondaryHeading} id="simple-modal-description">
                                        Click on a review to read it in full!
                                    </Typography>

                                    <div className='mainBackButton'>
                                        <Typography variant="h6" onClick={this.handleClose}>
                                            x
                                        </Typography>
                                    </div>

                                    <br/>
                                    {this.state.data ? (
                                        <div>
                                            <div className={classes.list}>
                                                <List className={classes.listRoot}>
                                        { Object.values(this.state.data).map((review, i) => {
                                            return (
                                                        <ListItem className='listItem'  onClick={() => this.openReview(review.id)} alignIte                                                                        ms="flex-start">
                                                            <ListItemAvatar>
                                                                <Avatar className={classes.avatar}>{review.userId.substring(0, 2).toUpperCase()                                                                 }</Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={review.titleInput.substr(0, config.maxLength)+'...'}
                                                                secondary={
                                                                    <React.Fragment>
                                                                        {/*<Typography component="span" className={classes.inline}                                                                                             color="textPrimary">*/}
                                                                            {/*Rating: 10*/}
                                                                        {/*</Typography>*/}
                                                                        {review.mainReviewInput}
                                                                    </React.Fragment>
                                                                }
                                                            />
                                                        </ListItem>
                                            )})}
                                                </List>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>No data</p>
                                    )}
                                        </div>
                            </Modal>
                        </div>
                    ) : (
                        <div>
                            <div className={classes.postReviewModal}>
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                >
                                    <div className={classes.postReviewPaper}>
                                        <div className='backButton'>
                                            <Typography variant="h6" onClick={this.closeReview}>
                                                x
                                            </Typography>
                                        </div>
                                        <Typography className={classes.largeHeading} id="modal-title">
                                            {'Review for '+this.state.address}
                                        </Typography>

                                        <Typography className={classes.smallSecondaryHeading} id="simple-modal-description">
                                            {'Created on ' + this.state.review.date +' by '+this.state.review.userId}
                                        </Typography>

                                        <br/>

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
                                                        {this.state.review.titleInput}
                                                    </Typography>
                                                 <br/>
                                                    <Typography className={classes.heading}>
                                                        {this.state.review.mainReviewInput}
                                                    </Typography>
                                                </div>

                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>

                                        <ExpansionPanel className='panel' expanded={expanded === 'panel1'} onChange={this.handlePanelChange                                                 ('panel1')}>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography className={classes.heading}>Landlord</Typography>
                                                <Typography className={classes.secondaryHeading}>Landlord review</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails className={classes.reviewBox} >

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
                                                            value={this.state.review.landlordCommunicationRating}
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
                                                            value={this.state.review.LandlordHelpfulnessRating}
                                                        />
                                                    </div>
                                                </div>

                                                <div className={classes.comments}>
                                                    <Typography className={classes.heading}>
                                                        Comments:
                                                    </Typography>
                                                    <Typography className={classes.secondaryHeading}>
                                                        {this.state.review.landlordComments}
                                                    </Typography>
                                                </div>

                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handlePanelChange('panel2')}>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography className={classes.heading}>Letting Agents</Typography>
                                                <Typography className={classes.secondaryHeading}>
                                                    Reviewers Agent: CPS Homes
                                                </Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails className={classes.reviewBox} >
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
                                                            value={this.state.review.agentCommunicationRating}
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
                                                            value={this.state.review.agentHelpfulnessRating}
                                                        />
                                                    </div>
                                                </div>

                                                <div className={classes.comments}>
                                                    <Typography className={classes.heading}>
                                                        Comments:
                                                    </Typography>
                                                    <Typography className={classes.secondaryHeading}>
                                                        {this.state.review.agencyComments}
                                                    </Typography>
                                                </div>

                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handlePanelChange('panel3')}>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography className={classes.heading}>House Quality</Typography>
                                                <Typography className={classes.secondaryHeading}>
                                                   The furniture, condition, location...
                                                </Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails className={classes.reviewBox} >

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
                                                            value={this.state.review.houseFurnishingRating}
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
                                                            value={this.state.review.houseConditionRating}
                                                        />
                                                    </div>
                                                </div>

                                                <div className={classes.comments}>
                                                    <Typography className={classes.heading}>
                                                        Comments:
                                                    </Typography>
                                                    <Typography className={classes.secondaryHeading}>
                                                        {this.state.review.houseComments}
                                                    </Typography>
                                                </div>

                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                        <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handlePanelChange('panel4')}>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography className={classes.heading}>Logistics</Typography>
                                                <Typography className={classes.secondaryHeading}>
                                                    Moving in, moving out, price, bills
                                                </Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails className={classes.reviewBox} >

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
                                                            value={this.state.review.priceRating}
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
                                                            value={this.state.review.moveInRating}
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
                                                            value={this.state.review.moveOutRating}
                                                        />
                                                    </div>
                                                </div>

                                                <div className={classes.comments}>
                                                    <Typography className={classes.heading}>
                                                        Comments:
                                                    </Typography>
                                                    <Typography className={classes.secondaryHeading}>
                                                        {this.state.review.logisticsComments}
                                                    </Typography>
                                                </div>

                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    )}
            </div>
        );
    }
}

ViewReviews.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewReviews);
