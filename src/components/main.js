import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Input from "./viewreviewsection";

const styles = () => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    appContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    mainContent: {
        flex: 1,
        padding: '20px 36px 0',
        background: '#DA563A',
    },
    infoText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        letterSpacing: 0.5,
        fontFamily: "Arial",
        paddingBottom: 30,
        paddingTop: 30
    },
    helpText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 12,
        letterSpacing: 0.5,
        fontFamily: "Arial",
        paddingBottom: 30,
        paddingTop: 30
    }
});

class Main extends React.Component {

    state = {

    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.mainContent}>
                <p className={classes.infoText}>Simply enter the address of the house you would like to view and select the street address!</p>
                <br/>
                <center>
                <Input/>
                    <p className={classes.helpText}>Tip! Start with the house number/name, road and then postcode for the most accurate results!</p>
                </center>
            </div>
        );
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);