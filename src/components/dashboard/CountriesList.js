import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CountryCard from "components/dashboard/CountryCard";
import { Grid } from "@material-ui/core";
import * as countriesProvider from "../../providers/countries.js";
import Spinner from "../Spinner.js";

const useStyles = () => ({
	root: {
		flexGrow: 1,
		marginLeft: 30,
		marginRight: 30
	}
});

class CountriesList extends React.Component {
	state = {
		countries: []
	}

	componentDidMount() {
		this.getCountries();
	}

	getCountries = () => {
		countriesProvider.get().then(res => {
			this.setState({ countries: res });
		});
	};

	render() {
		const { classes } = this.props;

		return (
			<>
				{this.state.countries.length === 0 ?
					<Spinner /> :
					<div className={classes.root}>
						<Grid container spacing={3}>
							{this.state.countries
								.sort((x, y) => y.cases - x.cases)
								.map(c => (
									<Grid key={c.country} item xs={12}>
										<CountryCard country={c} />
									</Grid>
								))}
						</Grid>
					</div>
				}
			</>
		);
	}
}

export default withStyles(useStyles)(CountriesList);
