import React from "react";
import { Link } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PublicIcon from '@material-ui/icons/Public';
import ViewListIcon from '@material-ui/icons/ViewList';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Covid-19
          </Typography>
          
          <Link to="/">
            <Button color="inherit" startIcon={<PublicIcon />}>Map</Button>
          </Link>          
          <Link to="/dashboard/">
            <Button color="inherit" startIcon={<ViewListIcon />}>Dashboard</Button>
          </Link>          
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
