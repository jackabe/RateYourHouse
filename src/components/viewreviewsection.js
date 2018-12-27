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
        width: '50%',
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
});

class PostReviewSection extends React.Component {

    state = {
        posts: [],
        address: '',
        open: false,
        openInDepth: false,
        expanded: null,
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

    openReview = id => {
        this.setState({ openInDepth: true });
    };

    closeReview = () => {
        this.setState({ openInDepth: false });
    };

    goToAddress(address) {
        this.setState({ address });
        console.log(address);
        this.setState({ open: true });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(this.goToAddress(address));
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
                    <Paper className={classes.root} elevation={2}>
                            <PlacesAutocomplete
                                className={classes.main}
                                value={this.state.address}
                                onChange={this.handleChange}
                                onSelect={this.handleSelect}
                                searchOptions={searchOptions}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div className={classes.main}>
                                        <InputBase className={classes.main} {...getInputProps({
                                            placeholder: 'Enter the address...',
                                            className: classes.main,
                                        })}/>
                                        <div className={classes.main}>
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
                                                        <center><span className={classes.main}>{suggestion.description}</span></center>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                    </Paper>

                    {!this.state.openInDepth ? (
                        <div className={classes.modal}>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.open}
                                onClose={this.handleClose}
                            >
                                <div className={classes.paper}>
                                    <Typography className={classes.largeHeading} id="modal-title">
                                        Reviews for 15 Sycamore Drive Birmingham B475QX
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
                                    <div className={classes.list}>
                                            <List className={classes.listRoot}>
                                                <ListItem className='listItem' onClick={this.openReview} alignItems="flex-start">
                                                    <ListItemAvatar>
                                                        <Avatar className={classes.avatar}>JA</Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary="Excellent, top property!"
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography component="span" className={classes.inline} color="textPrimary">
                                                                    Rating: 10
                                                                </Typography>
                                                                {" — No better place to rent, everything was perfect..."}
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                                <ListItem className='listItem' onClick={this.openReview} alignItems="flex-start">
                                                    <ListItemAvatar>
                                                        <Avatar className={classes.purpleAvatar}>H</Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary="Okay, but some big issues"
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography component="span" className={classes.inline} color="textPrimary">
                                                                    Rating: 5
                                                                </Typography>
                                                                {" — Started off well, landlord was good, but then..."}
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                                <ListItem className='listItem' onClick={this.openReview} alignItems="flex-start">
                                                    <ListItemAvatar>
                                                        <Avatar className={classes.orangeAvatar}>SA</Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary="Terrible, we all hated it"
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography component="span" className={classes.inline} color="textPrimary">
                                                                    Rating: 1
                                                                </Typography>
                                                                {" — Never ever rent this place. When we first..."}
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                            </List>
                                        </div>
                                    </div>
                            </Modal>
                        </div>
                    ) : (
                        <div>
                            <div className={classes.modal}>
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                >
                                    <div className={classes.paper}>
                                        <div className='backButton'>
                                            <Typography variant="h6" onClick={this.closeReview}>
                                                x
                                            </Typography>
                                        </div>
                                        <Typography className={classes.largeHeading} id="modal-title">
                                            Review for 15 Sycamore Drive Birmingham B475QX
                                        </Typography>

                                        <Typography className={classes.smallSecondaryHeading} id="simple-modal-description">
                                            Created 17/01/18 by Jack Allcock
                                        </Typography>

                                        <br/>

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
                                </Modal>
                            </div>
                        </div>
                    )}
            </div>
        );
    }
}

PostReviewSection.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostReviewSection);
