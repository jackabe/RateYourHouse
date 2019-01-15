import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {geocodeByAddress,} from 'react-places-autocomplete';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Localisation from '../abstractions/localisation';

class AddressForm extends React.Component {

    // Create bindings for buttons
    constructor(props) {
        super(props);
        this.state = {posts: [],
            address: '',
            addressToPost: '',
            error: '',
            alert: false,
            alertType: '',
            alertMessage: '',
        };
        this.handleAddressInput = this.handleAddressInput.bind(this);
    };

    // Perform API check when address is entered
    handleAddressInput() {
        let postCode = document.getElementById("postcode").value;
        let road = document.getElementById("addressLine").value;
        let city = document.getElementById("city").value;
        let country = 'United Kingdom';
        let addressIn = country + ' ' + postCode + ' ' + road + ' ' + city;
        geocodeByAddress(addressIn)
            .then(results => results[0]['address_components'])
            .then(address => this.goToAddress(address))
            .catch(error => this.setState({error}));
    };

    // Get the long address from the API
    goToAddress(address) {
        let addressToPost = '';
        let i = 0;
        for (i; i < address.length; i++) {
            addressToPost += address[i]['long_name'] + ' ';
        }
        let road = document.getElementById("addressLine").value;
        // Do not let people proceed until they have entered a house number/road
        if (road.length > 4) {
            this.setState({addressToPost});
            // Send the address back to the PostReview section
            this.props.addressHandler(addressToPost);
        }
    };

    render() {
        const classes = this.props.classes;
        const theme = this.props.theme;

        return (
            <div>
                <div>
                    {/* The form itself */}
                    <MuiThemeProvider theme={theme}>
                        <FormControl className={classes.margin}>
                            <InputLabel
                                shrink
                                htmlFor="bootstrap-input"
                                className={classes.bootstrapFormLabel}>
                                {Localisation.postCodeLabel}
                            </InputLabel>
                            <InputBase
                                id="postcode"
                                placeholder={Localisation.postCodeHint}
                                onChange={this.handleAddressInput}
                                classes={{
                                    root: classes.bootstrapRoot,
                                    input: classes.bootstrapInput,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.margin}>
                            <InputLabel
                                shrink
                                htmlFor="bootstrap-input"
                                className={classes.bootstrapFormLabel}>
                                {Localisation.addressLineLabel}
                            </InputLabel>
                            <InputBase
                                onChange={this.handleAddressInput}
                                id="addressLine"
                                placeholder={Localisation.addressHint}
                                classes={{
                                    root: classes.bootstrapRoot,
                                    input: classes.bootstrapInput,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.margin}>
                            <InputLabel
                                shrink
                                htmlFor="bootstrap-input"
                                className={classes.bootstrapFormLabel}>
                                {Localisation.cityLabel}
                            </InputLabel>
                            <InputBase
                                id="city"
                                placeholder={Localisation.cityHint}
                                classes={{
                                    root: classes.bootstrapRoot,
                                    input: classes.bootstrapInput,
                                }}
                            />
                        </FormControl>
                    </MuiThemeProvider>
                </div>
                <br/>
                <br/>
                {/* Address then shown in a validation box */}
                <Paper className='postReviewRoot' elevation={2}>
                    <div className='postReviewMain'>
                        <div>
                            {this.state.addressToPost.length !== 0 ? (
                                <div>
                                    <span
                                        className='foundAddress'>
                                        Found an address! Press next if it is the one you need!
                                    </span>
                                    <br/>
                                    <span
                                        className='addressText'>
                                        {this.state.addressToPost}
                                    </span>
                                </div>
                            ) : (
                                <div>
                                    {this.state.error.length !== 0 ? (
                                        <div>
                                           <span className='errorText'>{Localisation.addressBoxErrorText}
                                                <a
                                               href={Localisation.supportLink}>{Localisation.supportLink}
                                               </a>
                                           </span>
                                        </div>
                                    ) : (
                                        <div>
                                           <span
                                               className='enterAddress'>{Localisation.enterAddress}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </Paper>
                <br/>
            </div>
        )
    }
}

export default AddressForm;
