/*
    * Copyright (C) 2019 RateYourHouse
    * File created By Jack Allcock
    *
    * Licensing information goes here
    *
    * Class function: This is the class which shows the review in panels
    * Dependencies: none
    * Third party libraries/frameworks: Material UI, react-star-rating-component
 */

import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import StarIcon from '@material-ui/icons/Stars';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Localisation from '../../abstractions/localisation';

class Review extends React.Component {

    // State -> expanded is to know which panel needs to be opened and closed
    state = {
        expanded: null,
    };

    /**
     * @param: panel
     * @method: closes panel if expanded and vice versa
     **/
    handlePanelChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { expanded } = this.state;
        const address = this.props.address;
        const review = this.props.data;

        // Dynamically loaded in reviews to aid styling maintainability
        let reviews = [
            {
                // Landlord
                title: Localisation.landlordTitle,
                info: Localisation.landlordInfo,
                ratings: [
                    { type: Localisation.communication, score: review.landlordCommunicationRating},
                    { type: Localisation.helpfulness, score: review.LandlordHelpfulnessRating},
                ],
                id: 'landlord',
                comments: review.landlordComments
            },
            {
                // Agent
                title: Localisation.agentTitle,
                info: Localisation.agentInfo,
                ratings: [
                    { rating: Localisation.communication, score: review.agentCommunicationRating},
                    { rating: Localisation.helpfulness, score: review.agentHelpfulnessRating},
                ],
                id: 'agent',
                comments: 'Agent was: '+ review.agencyComments
            },
            {
                // House
                title: Localisation.houseTitle,
                info: Localisation.houseInfo,
                ratings: [
                    { type: Localisation.houseCondition, score: review.houseConditionRating},
                    { type: Localisation.furnitureQuality, score: review.houseFurnishingRating},
                ],
                id: 'house',
                comments: review.houseComments
            },
            {
                // Logistics
                title: Localisation.logisticsTitle,
                info: Localisation.logisticsInfo,
                ratings: [
                    { type: Localisation.price, score: review.priceRating},
                    { type: Localisation.moveIn, score: review.moveInRating},
                    { type: Localisation.moveOut, score: review.moveOutRating},
                ],
                id: 'logistics',
                comments: review.logisticsComments
            },
        ];

        return (
            <div>
                {/* Top of the modal */}
                <p className='largeHeading'>
                    {'Review for '+address}
                </p>
                <p className='reviewCreationText'>
                    {'Created on ' + review.date}
                </p>

                {/* First panel - review title and information */}
                <ExpansionPanel expanded={expanded === 'panelFeedback'} onChange={this.handlePanelChange('panelFeedback')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <div className='expansionInfo'>
                            <div className='expansionHeading'>
                                <p>Feedback</p>
                            </div>
                            <div className='expansionInfo'>
                                <p>The title and body of the review</p>
                            </div>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className='reviewMainInfo'>
                            <p>{review.titleInput}</p>
                            <br/>
                            <p>{review.mainReviewInput}</p>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                {/* Dynamically added review panels */}
                {Object.keys(reviews).map((keyMain, index) => (
                    <ExpansionPanel id={index} className='panel' expanded={expanded === reviews[keyMain].id}
                                    onChange={this.handlePanelChange(reviews[keyMain].id)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <div className='expansionInfo'>
                                <div className='expansionHeading'>
                                    <p>{reviews[keyMain].title}</p>
                                </div>
                                <div className='expansionInfo'>
                                    <p>{reviews[keyMain].info}</p>
                                </div>
                            </div>
                        </ExpansionPanelSummary>
                        {/* Rating stars */ }
                        <ExpansionPanelDetails className='expansionDetails'>
                            <div className='viewReviewWrapper'>
                                {Object.keys(reviews[keyMain].ratings).map((key, index) => (
                                    <div className='viewRatingWrapper'>
                                        <p className='reviewCategory'>{reviews[keyMain].ratings[key].type}</p>
                                        <div className='rating'>
                                            <StarRatingComponent
                                                name="rate2"
                                                editing={false}
                                                renderStarIcon={() => <span><StarIcon/></span>}
                                                starCount={5}
                                                value={reviews[keyMain].ratings[key].score}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Comments */}
                            <div className='viewRatingWrapper'>
                                <p className='commentsParagraph'>
                                    Comments:
                                </p>
                                <p className='reviewComment'>
                                    {reviews[keyMain].comments}
                                </p>
                            </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                ))}
            </div>
        );
    }
}

export default Review;
