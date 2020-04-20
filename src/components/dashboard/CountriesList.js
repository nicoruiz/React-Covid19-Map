import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CountryCard from "components/dashboard/CountryCard";
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as countriesProvider from "../../providers/countries.js";
import Spinner from "../Spinner.js";

const useStyles = () => ({
	root: {
		flexGrow: 1,
		marginLeft: 30,
		marginRight: 30
	},
	loadMore: {
		marginTop: 10
	}
});

class CountriesList extends React.Component {
	state = {
		countries: [],
		filtered: [],
		visible: 10
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
			visible: this.state.visible + 10
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
							<Grid noValidate autoComplete="off" item>
								<TextField id="standard-basic" label="Search" onChange={(event) => this.onSearch(event)} />
							</Grid>
							{this.state.filtered
								.sort((x, y) => y.cases - x.cases)
								.slice(0, this.state.visible)
								.map((c, index) => (
									<Grid key={index} item xs={12}>
										<CountryCard country={c} />
									</Grid>
								))}
								<Button variant="contained" color="primary" onClick={this.loadMore} className={classes.root}>
									Load More
								</Button>
						</Grid>
					</div>
				}
			</>
		);
	}
}

export default withStyles(useStyles)(CountriesList);
