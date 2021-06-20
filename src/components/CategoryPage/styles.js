import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    paddingTop: '5vh'
  },
  root: {
    flexGrow: 1,
  },
  title: {
    textAlign: 'center',
    paddingBottom: '5vh'
  },
}));
