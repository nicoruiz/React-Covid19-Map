import favicon from '../../favicon.ico';
import Layout from "components/Layout";
import Map from "components/Map";
import TotalCard from "components/TotalCard";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import "typeface-roboto";
import Spinner from "../components/Spinner";
import * as countriesProvider from "../providers/countries.js";
import Container from '@material-ui/core/Container';
import { Grid } from "@material-ui/core";

const LOCATION = {
  lat: 0,
  lng: 0,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;

const IndexPage = () => {
  const [mapData, setMapData] = useState([]);

  // This function is called every time the component initializes
  useEffect(() => {
    getMapData();
  }, []);

  const getMapData = () => {
    countriesProvider.get().then(data => {
      setMapData(data);
    });
  }

  // Get and fills the map
  function mapEffect({ leafletElement: map } = {}) {

    const data = mapData;

    const hasData = Array.isArray(data) && data.length > 0;

    if (!hasData) return;

    const geoJson = {
      type: "FeatureCollection",
      features: data.map((country = {}) => {
        const { countryInfo = {} } = country;
        const { lat, long: lng, flag } = countryInfo;
        return {
          type: "Feature",
          properties: {
            ...country,
            flag: flag
          },
          geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
        };
      }),
    };

    const geoJsonLayers = new L.GeoJSON(geoJson, {
      pointToLayer: (feature = {}, latlng) => {
        const { properties = {} } = feature;
        let casesString;
        let circleSize;

        const { country, tests, cases, deaths, casesPerOneMillion, deathsPerOneMillion, testsPerOneMillion, flag } = properties;

        casesString = `${cases}`;

        if (cases > 1000) {
          casesString = `${casesString.slice(0, -3)}k+`;
        }

        // Calculate cirle size
        circleSize = Math.sqrt(cases);

        const html = `
          <span style="width: ${circleSize}%; height: ${circleSize}%" class="icon-marker">
            <span class="icon-marker-tooltip">
              <h2><img src=${flag}> ${country} </h2>
              <ul>
                <li><strong>Confirmed:</strong> ${cases}</li>
                <li><strong>Deaths:</strong> ${deaths}</li>
                <li><strong>Cases per million:</strong> ${casesPerOneMillion}</li>
                <li><strong>Deaths per million:</strong> ${deathsPerOneMillion}</li>
                <li><strong>Tests:</strong> ${tests}</li>
                <li><strong>Tests per million:</strong> ${testsPerOneMillion}</li>
              </ul>
            </span>
            ${casesString}
          </span>
        `;

        return L.marker(latlng, {
          icon: L.divIcon({
            className: "icon",
            html,
          }),
          riseOnHover: true,
        });
      },
    });

    geoJsonLayers.addTo(map);
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "OpenStreetMap",
    zoom: DEFAULT_ZOOM,
    mapEffect,
    minZoom: 2,
    maxZoom: 5
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Covid-19 Map Page</title>
        <link rel="shortcut icon" type="image/png" href={favicon} />
      </Helmet>
      {mapData.length === 0 ?
        <Spinner /> :
        <>
          <Map {...mapSettings}></Map>
          <Container fixed className="text-center">
            <Grid container spacing={4}>
              <TotalCard />
            </Grid>            
          </Container>
        </>
      }
    </Layout>
  );
};

export default IndexPage;
