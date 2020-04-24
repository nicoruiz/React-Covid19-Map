import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
  },
}));

const SearchInput = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid xs={2} sm={1} item>
          <SearchIcon />
        </Grid>
        <Grid noValidate autoComplete="off" xs={10} sm={11} item>
          <TextField
            id="standard-basic"
            label="Search"
            onChange={props.onSearch}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchInput;
