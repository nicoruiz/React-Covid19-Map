import React, { useState } from "react";
import Helmet from "react-helmet";
import axios from "axios";

import Layout from "components/Layout";
import Container from "components/Container";
import Map from "components/Map";

import "typeface-roboto";
import TotalCard from "components/TotalCard";
import L from "leaflet";

const API_URL = "https://corona.lmao.ninja/v2";

const LOCATION = {
  lat: 0,
  lng: 0,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 3;

const IndexPage = () => {
  const [mapData, setMapData] = useState({});

  // Get and fills the map
  async function mapEffect({ leafletElement: map } = {}) {

    let response;

    try {
      response = await axios.get(`${API_URL}/countries`);
    } catch (e) {
      console.log(`Failed to fetch countries: ${e.message}`, e);
      return;
    }

    const { data = [] } = response;
    console.log(data);

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
        let updatedFormatted;
        let casesString;
        let circleSize;

        const { country, updated, cases, deaths, recovered, flag } = properties;

        casesString = `${cases}`;

        if (cases > 1000) {
          casesString = `${casesString.slice(0, -3)}k+`;
        }

        if (updated) {
          updatedFormatted = new Date(updated).toLocaleString();
        }

        // Calculate cirle size
        circleSize = Math.sqrt(cases) * 1.5;

        const html = `
          <span style="width: ${circleSize}%; height: ${circleSize}%" class="icon-marker">
            <span class="icon-marker-tooltip">
              <h2>${country} <img src=${flag}></h2>
              <ul>
                <li><strong>Confirmed:</strong> ${cases}</li>
                <li><strong>Deaths:</strong> ${deaths}</li>
                <li><strong>Recovered:</strong> ${recovered}</li>
                <li><strong>Last Update:</strong> ${updatedFormatted}</li>
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
      </Helmet>

      <Map {...mapSettings}></Map>

      <Container type="content" className="text-center home-start">
        <TotalCard api_url={API_URL} />
      </Container>
    </Layout>
  );
};

export default IndexPage;
