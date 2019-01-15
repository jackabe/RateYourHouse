/*
    * Copyright (C) 2019 RateYourHouse
    * File created By Jack Allcock
    *
    * Licensing information goes here
    *
    * Class function: Handles advertisements
    * Dependencies: Ad API's
    * Third party libraries/frameworks: None
 */

// Axios will make Ajax queries to fetch our ads
import axios from "axios";

class AdvertisementManager {
    // This is an example of what will return from the axios API call
    adsFromAPICall = [
        {
            id: 1,
            price: '£390pp',
            info: `5 bedroom house Cathays`,
            image: `https://lid.zoocdn.com/645/430/82586236d4495c5b064e40b1fd9c0a1be641de11.jpg`,
        },
        {
            id: 2,
            price: '£330pp',
            info: `4 bedroom house Cathays`,
            image: `https://media.rightmove.co.uk/dir/crop/10:9-16:9/72k/71758/57799107/71758_28326839_IMG_01_0000_max_476x317.jpg`,
        },
    ];

    // This will return the desired ads to the UI
    getAdvertisements() {
        return this.adsFromAPICall;
    }
}

export default AdvertisementManager;
