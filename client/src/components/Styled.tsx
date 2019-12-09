import {
    withStyles,
    Theme,
    fade,
} from '@material-ui/core/styles';

import {
    Button,
    IconButton
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
        backgroundColor: fade(green[500], .5),
        marginTop: '20px',
        '&:hover': {
            backgroundColor: green[600],
        },
    },
}))(Button);

export const BlueButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: fade(blue[800], .5),
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
        backgroundColor: fade(purple[800], .5),
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
        backgroundColor: fade(blue[800], .5),
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
        backgroundColor: fade(purple[800], .5),
        marginTop: '20px',
        marginRight: '1%',
        width: '79%',
        '&:hover': {
            backgroundColor: purple[600],
        },
    }
}))(Button);

export const BackButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(blue[500]),
        marginTop: '20px',
        marginLeft: '7%',
        marginRight: '6.5%',
        '&:hover': {
            backgroundColor: grey[600],
        },
    },
}))(IconButton);