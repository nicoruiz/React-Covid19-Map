import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CountryCard from "components/dashboard/CountryCard";
import { Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import * as countriesProvider from "../../providers/countries.js";
import Spinner from "../Spinner.js";
import AddIcon from '@material-ui/icons/Add';
import SearchInput from 'components/dashboard/SearchInput';

const useStyles = () => ({
  root: {
    flexGrow: 1,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10
  }
});

class CountriesList extends React.Component {
  state = {
    countries: [],
    filtered: [],
    visible: 5
  }

  componentDidMount() {
    this.getCountries();
  }

  getCountries = () => {
    countriesProvider.get().then(res => {
      this.setState({
        countries: res,
        filtered: res
      });
    });
  };

  onSearch = (event) => {
    let value = event.target.value;
    this.setState({
      filtered: this.state.countries
        .filter(c => c.country.toLowerCase()
          .includes(value.toLowerCase()))
    });


  }

  loadMore = () => {
    this.setState({
      visible: this.state.visible + 5
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        {this.state.countries.length === 0 ?
          <Spinner /> :
          <div className={classes.root}>
            <Grid container spacing={3}>
              <SearchInput onSearch={(event) => this.onSearch(event)} />
              {this.state.filtered
                .sort((x, y) => y.cases - x.cases)
                .slice(0, this.state.visible)
                .map((c, index) => (
                  <Grid key={index} item xs={12}>
                    <CountryCard country={c} />
                  </Grid>
                ))}
              {this.state.filtered.length > 0 ?
                <Button variant="contained" color="primary" onClick={this.loadMore} className={classes.root} startIcon={<AddIcon />}>
                  Load More
                </Button> 
                : <></>                
              }
            </Grid>
          </div>
        }
      </>
    );
  }
}

export default withStyles(useStyles)(CountriesList);
