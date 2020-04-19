import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 200,
    display: 'flex'
  }
}));

export default function Spinner() {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
        <CircularProgress/>
    </Grid>
  );
}