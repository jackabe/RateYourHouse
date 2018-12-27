import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PostReviewSection from './postreviewsection'
import PlacesAutocomplete from "react-places-autocomplete";

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
    secondaryBar: {
        zIndex: 0,
        textAlign: 'center'
    },
    menuButton: {
        marginLeft: -theme.spacing.unit,
    },
    iconButtonAvatar: {
        padding: 4,
    },
    link: {
        textDecoration: 'none',
        color: lightColor,
        '&:hover': {
            color: theme.palette.common.white,
        },
    },
    button: {
        borderColor: lightColor,
    },
});

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.handlePostReview = this.handlePostReview.bind(this)
    }

    state = {
        openForm: false
    };

    handlePostReview() {
        if (this.props.loggedIn) {
            if (this.state.openForm) {
                this.setState({openForm: false});
            }
            else {
                this.setState({openForm: true});
            }
        }
        else {
            alert('You need to be logged in to post a review')
        }
    };

    render() {

        const {classes} = this.props;
        const isLoggedIn = this.props.loggedIn;

        return (
        <React.Fragment>
            <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={8} alignItems="center">
                        <Grid item>
                            <Tooltip title="Alerts • No alters">
                                <IconButton color="inherit">
                                    <NotificationsIcon/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs/>
                        <Grid item>
                            <Typography className={classes.link} value={this.state.address}
                                       onClick={this.handlePostReview} component="a" href="#">
                                Post a review
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton color="inherit" className={classes.iconButtonAvatar}>
                                <Typography className={classes.link} component="a" href="#">
                                    {isLoggedIn ? 'Logout' : 'Login'}
                                </Typography>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar
                component="div"
                className={classes.secondaryBar}
                color="primary"
                position="static"
                elevation={0}
            >
                <Toolbar>
                    <Grid container alignItems="center" spacing={8}>
                        <Grid item xs>
                            <Typography color="inherit" variant="h5">
                                RateMyHouse.com
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar
                component="div"
                className={classes.secondaryBar}
                color="primary"
                position="static"
                elevation={0}
            >
            </AppBar>
            <PostReviewSection open={this.state.openForm} handler={this.handlePostReview}/>
        </React.Fragment>
        );

    }
}


Header.propTypes = {
    classes: PropTypes.object.isRequired,
    onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);