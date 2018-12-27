import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Header from './components/header';
import Main from "./components/main";
import './App.css';
import MetaTags from 'react-meta-tags';
import StickyFooter from 'react-sticky-footer';

let theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
        },
    },
    palette: {
        primary: {
            light: '#DA563A',
            main: '#DA563A',
            dark: '#DA563A',
        },
    },
    shape: {
        borderRadius: 8,
    },
});

theme = {
    ...theme,
    overrides: {
        MuiTabs: {
            root: {
                marginLeft: theme.spacing.unit,
            },
            indicator: {
                height: 3,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                backgroundColor: theme.palette.common.white,
            },
        },
        MuiTab: {
            root: {
                textTransform: 'initial',
                margin: '0 16px',
                minWidth: 0,
                [theme.breakpoints.up('md')]: {
                    minWidth: 0,
                },
            },
            labelContainer: {
                padding: 0,
                [theme.breakpoints.up('md')]: {
                    padding: 0,
                },
            },
        },
        MuiIconButton: {
            root: {
                padding: theme.spacing.unit,
            },
        },
        MuiTooltip: {
            tooltip: {
                borderRadius: 4,
            },
        },
        MuiDivider: {
            root: {
                backgroundColor: '#404854',
            },
        },
        MuiListItemText: {
            primary: {
                fontWeight: theme.typography.fontWeightMedium,
            },
        },
        MuiListItemIcon: {
            root: {
                color: 'inherit',
                marginRight: 0,
                '& svg': {
                    fontSize: 20,
                },
            },
        },
        MuiAvatar: {
            root: {
                width: 32,
                height: 32,
            },
        },
    },
    props: {
        MuiTab: {
            disableRipple: true,
        },
    },
    mixins: {
        ...theme.mixins,
        toolbar: {
            minHeight: 60,
        },
    },
};

const drawerWidth = 256;

const styles = () => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        background: '#DA563A',
    },
    appContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: '#DA563A',
    },
    mainContent: {
        flex: 1,
        padding: '48px 36px 0',
        background: '#DA563A',
    },
});

class App extends React.Component {

    state = {
        mobileOpen: false,
        loggedIn: true
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
            <MetaTags>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </MetaTags>
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <CssBaseline />
                    <div className={classes.appContent}>
                        <Header onDrawerToggle={this.handleDrawerToggle} loggedIn={this.state.loggedIn}/>
                        <Main/>

                        <footer className="site-footer">
                            <p>RateMyHouse.com by Jack Allcock 2019</p>
                        </footer>
                    </div>
                </div>
            </MuiThemeProvider>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);