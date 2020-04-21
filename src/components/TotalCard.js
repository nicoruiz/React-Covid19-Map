import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardItem from "components/CardItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import * as worldwideProvider from "../providers/worldwide.js";

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    marginTop: 20,
    marginBottom: 20
  }
});

class SimpleCard extends React.Component {
  state = {
    worldwide: {},
    raised: false,
  };

  componentDidMount() {
    this.getWorldwide();
  }

  toggleRaised = () => {
    this.setState({
      raised: !this.state.raised,
    });
  };

  getWorldwide = () => {
    worldwideProvider.get().then((res) => {
      this.setState({ worldwide: res });
    });
  };

  render() {
    const { classes } = this.props;
    const data = this.state.worldwide;

    return (
      <Card
        onMouseOver={this.toggleRaised}
        onMouseOut={this.toggleRaised}
        className={classes.card}
        raised={this.state.raised}
      >
        <CardHeader title="Total Worldwide" />
        <Typography variant="subtitle2" color="textSecondary">
          Last Update: {new Date(data.updated).toLocaleString()}
        </Typography>
        <Divider />
        <CardContent>
          <Grid container className={classes.root} spacing={3}>
            <CardItem title="Confirmed" data={data.cases} />
            <CardItem title="Today Cases" data={data.todayCases} />
            <CardItem title="Deaths" data={data.deaths} />
            <CardItem title="Today Deaths" data={data.todayDeaths} />
            <CardItem title="Recovered" data={data.recovered} />
            <CardItem title="Active" data={data.active} />
            <CardItem
              title="Cases per million"
              data={data.casesPerOneMillion}
            />
            <CardItem
              title="Deaths per million"
              data={data.deathsPerOneMillion}
            />
            <CardItem
              title="Tests per million"
              data={data.testsPerOneMillion}
            />
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(useStyles)(SimpleCard);
