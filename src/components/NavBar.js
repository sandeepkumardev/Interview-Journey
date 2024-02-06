import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AddCompanyButton from './AddCompanyButton';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

function NavBar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <TrendingUpIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Interview Journey
        </Typography>
        <AddCompanyButton />
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
