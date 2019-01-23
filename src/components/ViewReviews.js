import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import config from '../config/config';

class ViewReviews extends React.Component {

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
                <p className='largeHeading' id="modal-title">
                    {'Reviews for '+address}
                </p>
                <p className='smallSecondaryHeading' id="simple-modal-description">
                    Click on a review to read it in full!
                </p>
                <List className='listRoot'>
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
