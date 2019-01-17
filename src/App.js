/*
    * Copyright (C) 2019 RateYourHouse
    * File created By Jack Allcock
    *
    * Licensing information goes here
    *
    * Class function: This is the main parent class which hosts the header, review input and post modal
    * Dependencies: Children: ViewReviews.js and Header.js
    * Third party libraries/frameworks: Material UI and react-meta-tags
 */

import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './css/App.css';
import Localisation from './abstractions/localisation';
import AdvertisementManager from './scripts/AdvertisementManager'
import Header from './components/Header';
import ViewReviews from "./components/ViewReviews";
import ReviewSearchTool from "./components/ReviewSearchTool";

class App extends React.Component {

    constructor (props) {
        // Get advertisements to display below the form search
        const advertisementManager = new AdvertisementManager();
        super(props);
        this.state = {
            mobileOpen: false,
            loggedIn: true,
            advertisements: advertisementManager.getAdvertisements()
        };
    }

    render() {
        // The text that informs users how to use the search
        let infoText = Localisation.infoText;
        // The text that gives users a tip on searching
        let helpText = Localisation.helpText;
        // The text in the footer
        let footerText = Localisation.footerText;
        // The advertisement section title
        let adTitle = Localisation.adTitle;
        // Advertisements
        let advertisements = this.state.advertisements;
        let advertisementSection = null;
        // If advertisements have loaded
        if (advertisements) {
            // Create the section and iterate over the JSON
            advertisementSection = <div className='advertisements'>
                <span>{adTitle}</span>
                {Object.values(this.state.advertisements).map((advertisement, i) => {
                    return (
                        <div key={i} className='advertisement'>
                            <img width='80px' src={advertisement.image} alt={advertisement.info}/>
                            <p><b>{advertisement.price}  </b>{advertisement.info}</p>
                        </div>
                    )})}
            </div>;
        }

        return (
            <div>
                <div className='root'>
                    {/* Some material ui base styling */}
                    <CssBaseline/>
                    <div className='appContent'>
                        {/* Pass logged in state to header */}
                        <Header loggedIn={this.state.loggedIn}/>
                        {/* Load the reviews search tool */}
                        <div className='mainContent'>
                            <p className='infoText'>{infoText}</p>
                            <div className='inputWrapper'>
                                <ReviewSearchTool/>
                            </div>
                            <p className='helpText'>{helpText}</p>
                        </div>
                        {/* Load up advertisements */}
                        {advertisementSection}
                        {/* Here is the footer */}
                        <footer className="site-footer">
                            <p>{footerText}</p>
                        </footer>
                    </div>
                </div>
        </div>
        );
    }
}

export default (App);