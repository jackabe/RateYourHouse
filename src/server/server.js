const express = require('express');
const app = express();
const bodyParser = require("body-parser");
let port = 4000;
const cors = require('cors');
const dateTime = require('node-datetime');
const serviceAccount = require("./ratemyhouse-key.json");
const firebase = require('firebase-admin');

let config = {
    apiKey: "AIzaSyDGvWJOmQf9j3Hew489kBnvwPI797o2axw",
    authDomain: "ratemyhouse-1545743069431.firebaseapp.com",
    databaseURL: "https://ratemyhouse-1545743069431.firebaseio.com",
    projectId: "ratemyhouse-1545743069431",
    storageBucket: "ratemyhouse-1545743069431.appspot.com",
    messagingSenderId: "170876410545",
    credential: firebase.credential.cert(serviceAccount),
};

app.use(cors());

firebase.initializeApp(config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({extended: true}));

app.post('/upload/review', function (req, res) {
    console.log('Review uploaded');
    console.log(req.body.token);

    firebase.auth().verifyIdToken(req.body.token)
        .then(function(decodedToken) {
            let address = req.body.address;
            const ref = firebase
                .database()
                .ref()
                .child("reviews");
            const addressReviewRef = ref.child(address);
            let key = addressReviewRef.push().getKey();

            let date = dateTime.create();
            date = date.format('d/m/Y');

            console.log(decodedToken);

            const message = {
                id: key,
                userId: decodedToken.uid,
                userName: decodedToken.email,
                landlordCommunicationRating: req.body.landlordCommunicationRating,
                LandlordHelpfulnessRating: req.body.LandlordHelpfulnessRating,
                agentCommunicationRating: req.body.agentCommunicationRating,
                agentHelpfulnessRating: req.body.agentHelpfulnessRating,
                priceRating: req.body.priceRating,
                houseFurnishingRating: req.body.houseFurnishingRating,
                houseConditionRating: req.body.houseConditionRating,
                moveInRating: req.body.moveInRating,
                moveOutRating: req.body.moveOutRating,
                logisticsComments: req.body.logisticsComments,
                houseComments: req.body.houseComments,
                landlordComments: req.body.landlordComments,
                agencyComments: req.body.agencyComments,
                mainReviewInput: req.body.mainReviewInput,
                titleInput: req.body.titleInput,
                date: date
            };
            addressReviewRef.push(message)
                .then(() => {
                    res.status("201").json("Completed");
                })
                // TODO: Check if firebase is pending as offline - If so inform user it will post
                .catch((error) => {
                    res.status("501").json(error);
                    console.log(error);
                });
        }).catch(function(error) {
        // Handle error
    });
});

app.get('/reviews/:address', function (req, res) {
    console.log('Review requested');
    let address = req.param("address");
    console.log(address);
    firebase.database().ref("reviews").child(address + ' ').once('value').then(function (snapshot) {
        if (snapshot.exists()) {
            res.send(snapshot.val());
        }
        else {
            res.status("404").json("No data");
        }
    }, function(error) {
        console.error(error);
        res.status("501").json("Sorry but your request failed");
    });
});

// Start server
const server = app.listen(port, () => console.log("Listenting on ", {port}));

// https://stackoverflow.com/questions/7067966/how-to-allow-cors
// Allows communication between React and Node server which are on same IP but on different ports
// Start server


