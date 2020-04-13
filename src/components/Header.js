import React from "react";
import { Link } from "gatsby";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
            Coronavirus (COVID-19)
          </Typography>
          <Button color="inherit">
            <Link to="/">Map</Link>
          </Button>
          <Button color="inherit">
            <Link to="/page-2/">Dashboard</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
  // return (
  //   <header>
  //     <Container type="content">
  //       <p>Coronavirus (COVID-19)</p>
  //       <ul>
  //         <li>
  //           <Link to="/">Map</Link>
  //         </li>
  //         <li>
  //           <Link to="/page-2/">Dashboard</Link>
  //         </li>
  //       </ul>
  //     </Container>
  //   </header>
  // );
};

export default Header;
