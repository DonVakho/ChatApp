import {
    withStyles,
    Theme,
} from '@material-ui/core/styles';

import {
    Button,
    Fab
} from '@material-ui/core';

import {
    green,
    purple,
    blue,
    grey
} from '@material-ui/core/colors';

export const GreenButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: green[900],
        marginTop: '20px',
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);

export const BlueButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[800],
        marginTop: '20px',
        marginRight: '1%',
        width: '49%',
        '&:hover': {
            backgroundColor: blue[600],
        },
    },
}))(Button);

export const PurpleButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[800],
        marginTop: '20px',
        marginLeft: '1%',
        width: '49%',
        '&:hover': {
            backgroundColor: purple[600],
        },
    },
}))(Button);

export const BlueButtonSecondPage = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[800],
        marginTop: '20px',
        marginRight: '1%',
        width: '79%',
        '&:hover': {
            backgroundColor: blue[600],
        },
    },
}))(Button);

export const PurpleButtonSecondPage = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[800],
        marginTop: '20px',
        marginRight: '1%',
        width: '79%',
        '&:hover': {
            backgroundColor: purple[600],
        },
    },
}))(Button);

export const BackButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: grey[800],
        marginTop: '20px',
        marginLeft: '1%',
        width: '19%',
        '&:hover': {
            backgroundColor: grey[600],
        },
    },
}))(Fab);