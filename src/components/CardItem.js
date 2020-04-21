import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const CardItem = (props) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} item xs>
      <Typography color="textSecondary">{props.title}</Typography>
      <Typography variant="h5" component="h5">
        {props.data}
      </Typography>
    </Grid>
  );
};

export default CardItem;
