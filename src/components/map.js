'use strict';

const { Map: LeafletMap, geoJSON, tileLayer, icon } = require('leaflet');

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
    constructor(container, center, zoom, geoJSON) {
        const initialMarkerStyle = {
            color: '#474954',
            fillColor: '#C5EDAC',
            radius: 5,
            fillOpacity: 0.8,
            weight: 2
        };

        this.data = geoJSON;
        
        this.markerStyle = initialMarkerStyle;
        this.map = new LeafletMap(container, { minZoom: 3 }).setView(center, zoom);
        this.tileLayer = this.createTileLayer(this.map);
        this.dataLayer = this.createDataLayer(this.data, this.map, this.markerStyle);
    }

    createTileLayer(map) {
        return tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        }).addTo(map);
    }

    createDataLayer(data, map, markerStyle, icon) {
        return geoJSON(data, {
            pointToLayer: (feature, coords) => {
                if(icon && feature.properties.adm0name === 'Spain'){
                    return new L.Marker(coords, { icon: pokeballs });
                } else {
                    return new L.CircleMarker(coords, this.markerStyle);
                }
            }
        }).addTo(map);
    }

    changeStyleProperty(property) {
        const availableProperties = ['radius', 'fillColor', 'color', 'weight', 'fillOpacity'];
        if(!availableProperties.includes(property)) {
            return console.error(`MAP: Invalid property ${property}`);
        }

        return (value) => {
            const newProperty = { [property]: value };
            this.markerStyle = Object.assign(this.markerStyle, newProperty);
            setStyle(this.dataLayer, this.markerStyle);
        }
    }

    addPokeballs() {
        this.map.removeLayer(this.dataLayer);
        this.dataLayer = this.createDataLayer(this.data, this.map, this.markerStyle, pokeballs);
    }
}

module.exports = Map;