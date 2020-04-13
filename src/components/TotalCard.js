import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Grid } from "@material-ui/core";

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
  cardItem: {
    margin: 5
  }
});

class SimpleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      worldwide: {},
      raised: false,
    };
    this.getWorldwide();
  }

  toggleRaised = () => {
    this.setState({
      raised: !this.state.raised,
    });
  };

  getWorldwide = async () => {
    let response;

    try {
      response = await axios.get(`${this.props.api_url}/all`);
    } catch (e) {
      console.log(`Failed to fetch all data: ${e.message}`, e);
      return;
    }
    console.log(response.data);

    this.setState({
      worldwide: response.data,
    });
  };

  render() {

    const { classes } = this.props;
    const data = this.state.worldwide;

    return (
      <Card
        onMouseOver={this.toggleRaised}
        onMouseOut={this.toggleRaised}
        className={classes.root}
        raised={this.state.raised}
      >
        <CardHeader title="Total Worldwide" />
        <Divider />
        <CardContent>
          <Grid container className={classes.root}>
            <Grid className={classes.cardItem} item xs>
              <Typography color="textSecondary">Cases</Typography>
              <Typography variant="h5" component="h5">
                {data.cases}
              </Typography>
            </Grid>
            <Grid className={classes.cardItem} item xs>
              <Typography color="textSecondary">Deaths</Typography>
              <Typography variant="h5" component="h5">
                {data.deaths}
              </Typography>
            </Grid>
            <Grid className={classes.cardItem} item xs>
              <Typography color="textSecondary">Recovered</Typography>
              <Typography variant="h5" component="h5">
                {data.recovered}
              </Typography>
            </Grid>
						<Grid className={classes.cardItem} item xs>
              <Typography color="textSecondary">Active</Typography>
              <Typography variant="h5" component="h5">
                {data.active}
              </Typography>
            </Grid>
						<Grid className={classes.cardItem} item xs>
              <Typography color="textSecondary">Today Cases</Typography>
              <Typography variant="h5" component="h5">
                {data.todayCases}
              </Typography>
            </Grid>
						<Grid className={classes.cardItem} item xs>
              <Typography color="textSecondary">Today Deaths</Typography>
              <Typography variant="h5" component="h5">
                {data.todayDeaths}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(useStyles)(SimpleCard);
