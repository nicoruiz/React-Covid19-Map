import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function OrderBySelect(props) {
  const classes = useStyles();
  const defaultCriteriaValue = props.criteriaSort[0].value;
  const [criteria, setCriteria] = React.useState(defaultCriteriaValue);

  const handleChange = (event) => {
    let selectedCriteria = event.target.value;
    setCriteria(selectedCriteria);
    props.onSort(selectedCriteria);
  };

  return (
    <Grid item>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Order by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={criteria}
          onChange={handleChange}
        >
          {props.criteriaSort.map((crit, i) => (
            <MenuItem key={i} value={crit.value}>
              {crit.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
