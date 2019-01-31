/*
    * Copyright (C) 2019 RateYourHouse
    * File created By Jack Allcock
    *
    * Licensing information goes here
    *
    * Class function: This is the class which shows all the reviews for an address
    * Dependencies: none
    * Third party libraries/frameworks: Material UI
 */

import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import config from '../../config/config';

class ViewReviews extends React.Component {

    /**
     * @param: id - id of review clicked
     * @method: get the review by ID and pass the review object back to ReviewSearchTool to be opened
     **/
    openReview(id) {
        Object.values(this.props.data).map((review, i) => {
            if (review.id === id) {
                this.props.openReview(review);
            }
        });
    };

    render() {
        const address = this.props.address;

        return (
            <div className='listRoot'>
                {/* Headings of modal */}
                <p className='largeHeading' id="modal-title">
                    {'Reviews for '+address}
                </p>
                <p className='smallSecondaryHeading' id="simple-modal-description">
                    Click on a review to read it in full!
                </p>
                <List className='listRoot'>
                    {/* List all reviews */}
                    { Object.values(this.props.data).map((review, i) => {
                        return (
                            <ListItem className='listItem'  onClick={() => this.openReview(review.id)} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar className='avatar'>{review.userName.substring(0, 2).toUpperCase()}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={review.titleInput.substr(0, config.maxLength)+'...'}
                                    secondary={
                                        <React.Fragment>
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
