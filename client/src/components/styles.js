import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },
    button: {
        marginTop: theme.spacing(1),
        float: 'right',
    },
    clear: {
        clear: 'both',
    },
}));
