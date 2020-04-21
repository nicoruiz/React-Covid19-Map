import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardItem from "components/CardItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Grid, Avatar } from "@material-ui/core";

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
  flag: {
    height: "100%",
    widht: "100%",
  },
});

class CountryCard extends React.Component {
  state = {
    raised: false,
  };

  toggleRaised = () => {
    this.setState({
      raised: !this.state.raised,
    });
  };

  render() {
    const { classes } = this.props;
    const country = this.props.country;

    return (
      <Card
        onMouseOver={this.toggleRaised}
        onMouseOut={this.toggleRaised}
        className={classes.root}
        raised={this.state.raised}
      >
        <CardHeader
          avatar={
            <Avatar>
              <img
                src={country.countryInfo.flag}
                className={classes.flag}
              ></img>
            </Avatar>
          }
          title={<Typography variant="h5">{country.country}</Typography>}
        />
        <Divider />
        <CardContent>
          <Grid container className={classes.root} spacing={3}>
            <CardItem title="Confirmed" data={country.cases} />
            <CardItem title="Today Cases" data={country.todayCases} />
            <CardItem title="Deaths" data={country.deaths} />
            <CardItem title="Today Deaths" data={country.todayDeaths} />
            <CardItem title="Recovered" data={country.recovered} />
            <CardItem title="Active" data={country.active} />
            <CardItem
              title="Cases per million"
              data={country.casesPerOneMillion}
            />
            <CardItem
              title="Deaths per million"
              data={country.deathsPerOneMillion}
            />
            <CardItem title="Tests" data={country.tests} />
            <CardItem
              title="Tests per million"
              data={country.testsPerOneMillion}
            />
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(useStyles)(CountryCard);
