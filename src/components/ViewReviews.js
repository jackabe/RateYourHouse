import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import axios from 'axios';
import PlacesAutocomplete from 'react-places-autocomplete';
import {geocodeByAddress} from 'react-places-autocomplete';
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

class ViewReviews extends React.Component {

    state = {

    };

    openReview(id) {
        Object.values(this.state.data).map((review, i) => {
            if (review.id == id) {
                this.setState({ openInDepth: true });
                this.setState({ review: review });
            }
        });
    };

    render() {
        const {classes} = this.props;
        const address = this.props.address;

        return (
            <div className='listRoot'>
                <Typography className='largeHeading' id="modal-title">
                    {'Reviews for '+address}
                </Typography>
                <Typography vclassName='smallSecondaryHeading' id="simple-modal-description">
                    Click on a review to read it in full!
                </Typography>
                <List className={classes.listRoot}>
                { Object.values(this.props.data).map((review, i) => {
                    return (
                        <ListItem className='listItem'  onClick={() => this.openReview(review.id)} alignIte                                                                        ms="flex-start">
                            <ListItemAvatar>
                                <Avatar className='avatar'>{review.userId.substring(0, 2).toUpperCase()                                                                 }</Avatar>
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
                    )
                })}
                </List>
                </div>
        );
    }
}

export default ViewReviews
