import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Grid, CardMedia, Avatar } from "@material-ui/core";

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
  cardItem: {
    flexGrow: 1
  },
  flag: {
    height: '100%',
    widht: '100%'
  }
});

class CountryCard extends React.Component {
  state = {
    raised: false
  }

  toggleRaised = () => {
    this.setState({
      raised: !this.state.raised
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
              <img src={country.countryInfo.flag} className={classes.flag}></img>
            </Avatar>
          }
          title={
            <Typography variant="h5">
              {country.country}
            </Typography>
          }
        />
        <Divider />
        <CardContent>
          <Grid container className={classes.root} spacing={3}>
            <Grid className={classes.cardItem} item xs>
              <Typography color="textSecondary">Cases</Typography>
              <Typography variant="h5" component="h5">
                {country.cases}
              </Typography>
            </Grid>
            <Grid className={classes.cardItem} item xs>
              <Typography color="textSecondary">Deaths</Typography>
              <Typography variant="h5" component="h5">
                {country.deaths}
              </Typography>
            </Grid>
            <Grid className={classes.cardItem} item xs>
              <Typography color="textSecondary">Today Cases</Typography>
              <Typography variant="h5" component="h5">
                {country.todayCases}
              </Typography>
            </Grid>
            <Grid className={classes.cardItem} item xs>
              <Typography color="textSecondary">Today Deaths</Typography>
              <Typography variant="h5" component="h5">
                {country.todayDeaths}
              </Typography>
            </Grid>
            <Grid className={classes.cardItem} item xs>
              <Typography color="textSecondary">Recovered</Typography>
              <Typography variant="h5" component="h5">
                {country.recovered}
              </Typography>
            </Grid>
            <Grid className={classes.cardItem} item xs>
              <Typography color="textSecondary">Active</Typography>
              <Typography variant="h5" component="h5">
                {country.active}
              </Typography>
            </Grid>
            <Grid className={classes.cardItem} item xs>
              <Typography color="textSecondary">Cases per one million</Typography>
              <Typography variant="h5" component="h5">
                {country.casesPerOneMillion}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(useStyles)(CountryCard);
