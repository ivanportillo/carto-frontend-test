'use strict';

const { Map: LeafletMap, geoJSON, tileLayer, icon, control } = require('leaflet');

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

    createPopulationChoroLayer(data, colorArray, commonStyle) {
        this.markerStyle = commonStyle;

        const colorFunction = value => {
            let max = 0;
            let valueIndex = 0;

            colorArray.forEach((element, index) => {
                if (value > element.greaterThan) {
                    max = element.greaterThan;
                    valueIndex = index;
                }
            });

            return colorArray[valueIndex].color;
        };

        this.dataLayer = geoJSON(CountriesGEOJSON, {
            style: countryFeature => {
                // First of all, take only country-specific data
                const countryData = data.features.filter(
                    (datafeature) => datafeature.properties.adm0name === countryFeature.properties.name
                );

                const countriesNumber = countryData.length;
                let avg = 0;
                if(countriesNumber) {
                    //Add up all the pop max and then get the average
                    const addPop = countryData.reduce((prev, act) => prev + act.properties.pop_max, 0);
                    avg = addPop / countriesNumber;
                }
                return Object.assign({ fillColor: colorFunction(avg) }, this.markerStyle);
            }
        }
        ).addTo(this.map);

        //Add legend
        this.legend = control({ position: 'bottomright' });
        
        const createLegend = map => {
            const div = L.DomUtil.create('div', 'info legend');
    
            colorArray.forEach((object, index) => {
                let i = document.createElement('i');
                i.style.background = object.color;
                let span = document.createElement('span');
                const secondElement = (index === colorArray.length - 1) ? 
                    '+' : 
                    ` - ${colorArray[index + 1].greaterThan}`;

                span.innerHTML = `${object.greaterThan} ${secondElement}`;

                let innerDiv = document.createElement('div');
                innerDiv.appendChild(i);
                innerDiv.appendChild(span);
                div.appendChild(innerDiv);
            });
        
            return div;
        };

        this.legend.onAdd = createLegend;
        this.legend.addTo(this.map);
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
        this.dataLayer = this.createPointsLayer(this.data, this.markerStyle, pokeballs);
    }
}

module.exports = Map;