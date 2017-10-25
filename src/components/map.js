'use strict';

const { Map: LeafletMap, geoJSON, tileLayer, icon } = require('leaflet');

// Credits: https://github.com/johan/world.geo.json
const CountriesGEOJSON = require('../resources/countriesGeoJSON');

const setStyle = (dataLayer, styleObj) => {
    dataLayer.eachLayer(layer => {
        if(!!layer.setStyle) {
            layer.setStyle(styleObj);
        }
    });
}

const pokeballs = icon({
    iconUrl: '../src/resources/pokeball.png',
    iconAnchor: [8, 8]
});

class Map {
    constructor(container, center, zoom) {
        this.map = new LeafletMap(container, { minZoom: 3 }).setView(center, zoom);
        this.tileLayer = this.createTileLayer(this.map);
    }

    createTileLayer(map) {
        return tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        }).addTo(map);
    }

    createPointsLayer(data, markerStyle, icon) {
        this.data = data;
        this.markerStyle = markerStyle;

        this.dataLayer = geoJSON(data, {
            pointToLayer: (feature, coords) => {
                if(icon && feature.properties.adm0name === 'Spain'){
                    return new L.Marker(coords, { icon: pokeballs });
                } else {
                    return new L.CircleMarker(coords, this.markerStyle);
                }
            }
        }).addTo(this.map);
    }

    createPopulationChoroLayer(data, colorFunction) {
        this.dataLayer = geoJSON(CountriesGEOJSON, {
            style: countryFeature => {
                const countryData = data.features.filter(
                    (datafeature) => datafeature.properties.adm0name === countryFeature.properties.name
                );
                const countriesNumber = countryData.length;
                if(countriesNumber) {
                    const sumPop = countryData.reduce((prev, act) => prev + act.properties.pop_max, 0);
                    const avg = sumPop / countriesNumber;
                    console.log(avg);
                    return {
                        fillColor: colorFunction(avg),
                        color: 'black',
                        weight: 1,
                        fillOpacity: 1,
                        opacity: 1
                    };
                }
                return {
                    fillColor: colorFunction(0),
                    color: 'black',
                    weight: 1,
                    fillOpacity: 1,
                    opacity: 1
                };
            }
        }
        ).addTo(this.map);
    }

    changeStyleProperty(property) {
        const availableProperties = ['radius', 'fillColor', 'color', 'weight', 'fillOpacity'];
        const numericProperties = ['radius', 'weight', 'fillOpacity'];
        if(!availableProperties.includes(property)) {
            return console.error(`MAP: Invalid property ${property}`);
        }

        return (value) => {
            const newValue = (numericProperties.includes(property) ? Number(value) : value);
            const newProperty = { [property]: newValue };
            this.markerStyle = Object.assign(this.markerStyle, newProperty);
            setStyle(this.dataLayer, this.markerStyle);
        }
    }

    addPokeballs() {
        this.map.removeLayer(this.dataLayer);
        this.dataLayer = this.createPointsLayer(this.data, this.map, this.markerStyle, pokeballs);
    }
}

module.exports = Map;