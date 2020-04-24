import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CountryCard from "components/dashboard/CountryCard";
import { Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import * as countriesProvider from "../../providers/countries.js";
import Spinner from "../Spinner.js";
import AddIcon from '@material-ui/icons/Add';
import SearchInput from 'components/dashboard/SearchInput';
import Container from '@material-ui/core/Container';
import OrderBySelect from 'components/dashboard/OrderBySelect';

const useStyles = () => ({
  root: {
    flexGrow: 1
  },
  loadMoreButton: {
    flexGrow: 1,
    margin: 30
  }
});

class CountriesList extends React.Component {
  state = {
    countries: [],
    filtered: [],
    visible: 8,
    criteriaSort: "cases" 
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
      visible: this.state.visible + 8
    });
  }

  onSort = (selectedCriteria) => {
    //let selectedCriteria = event.target.value;
    this.setState({
      criteriaSort: selectedCriteria
    });
  }

  buildSelectList = () => {
    return [
      {value: "cases", text: "Confirmed"},
      {value: "todayCases", text: "Today Cases"},
      {value: "deaths", text: "Deaths"},
      {value: "todayDeaths", text: "Today Deaths"},
      {value: "recovered", text: "Recovered"},
      {value: "active", text: "Active"},
      {value: "casesPerOneMillion", text: "Cases p/ million"},
      {value: "deathsPerOneMillion", text: "Deaths p/ million"},
      {value: "tests", text: "Tests"},
      {value: "testsPerOneMillion", text: "Tests p/ million"}
    ]
  }

  render() {
    const { classes } = this.props; 
    const criteriaSortList = this.buildSelectList();

    return (
      <Container fixed>
        {this.state.countries.length === 0 ?
          <Spinner /> :
          <div className={classes.root}>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={6}>
                <SearchInput onSearch={(event) => this.onSearch(event)} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <OrderBySelect 
                  criteriaSort={criteriaSortList} 
                  onSort={this.onSort}>              
                </OrderBySelect>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              {this.state.filtered
                .sort((x, y) => y[this.state.criteriaSort] - x[this.state.criteriaSort])
                .slice(0, this.state.visible)
                .map((c, index) => (
                  <Grid key={index} item xs={12}>
                    <CountryCard country={c} />
                  </Grid>
                ))}
              {this.state.filtered.length > 0 ?
                <Button variant="contained" color="primary" onClick={this.loadMore} className={classes.loadMoreButton} startIcon={<AddIcon />}>
                  Load More
                </Button> 
                : <></>                
              }
            </Grid>
          </div>
        }
      </Container>
    );
  }
}

export default withStyles(useStyles)(CountriesList);
