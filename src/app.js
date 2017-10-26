'use strict';

const map = require('./components/map');
const style = require('./components/style/style');

const rangeSlider = require('./components/controls/rangeSlider/rangeSlider');
const colorSwitch = require('./components/controls/colorSwitch/colorSwitch');
const secretControl = require('./components/controls/secretControl/secretControl');

const cordobaCoords = [37.887652, -4.779980];
const colors = ['#C5EDAC', '#474954', '#DD1C1A', '#F0C808', '#07A0C3', '#FFFFFF'];
const dataURL = 'https://xavijam.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20ne_10m_populated_places_simple&format=GeoJSON';

const getGEOJSON = (url, cb) => {
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();

    request.onload = data => {
        cb(JSON.parse(data.target.responseText));
    }
}

class MarkersApp {
    constructor() {
        const initialMarkerStyle = {
            color: '#474954',
            fillColor: '#C5EDAC',
            radius: 5,
            fillOpacity: 0.8,
            weight: 2
        };

        getGEOJSON(dataURL, data => {
            this.map = new map('js-map', cordobaCoords, 12);
            this.map.createPointsLayer(data, initialMarkerStyle);
            this.style = style(this.generateControls(this.map), 'controls');
        });
    }

    generateControls(map) {
        const strokeSlider = new rangeSlider(
            'Stroke',
            map.markerStyle.weight,
            1,
            20,
            0.5,
            map.changeStyleProperty('weight'), 
        );
        
        const radiusSlider = new rangeSlider(
            'Radius',
            map.markerStyle.radius, 
            1,
            20,
            0.5,
            map.changeStyleProperty('radius'), 
        );
        
        const fillOpacitySlider = new rangeSlider(
            'Fill opacity',
            map.markerStyle.fillOpacity,
            0,
            1,
            0.1,
            map.changeStyleProperty('fillOpacity'),
        );
        
        const fillColorSwitch = new colorSwitch(
            'Fill color',
            colors,
            map.changeStyleProperty('fillColor'),
        );
        
        const strokeColorSwitch = new colorSwitch(
            'Stroke',
            colors,
            map.changeStyleProperty('color'),
        );
        
        const secret = new secretControl(
            "Catch Em' All (only in Spain)",
            () => map.addPokeballs(),
            'heart'
        );

        return [
            strokeSlider,
            radiusSlider,
            fillOpacitySlider,
            fillColorSwitch,
            strokeColorSwitch,
            secret
        ];
    }
}

class ChoroApp {
    constructor() {
        const initialCommonStyle = {
            color: '#FFFFFF',
            weight: 1,
            fillOpacity: 1,
            opacity: 1
        };

        const colorArray = [
            { greaterThan: 0, color: '#FED976' },
            { greaterThan: 207000, color: '#FEB24C' },
            { greaterThan: 414000, color: '#FD8D3C' },
            { greaterThan: 621000, color: '#FC4E2A' },
            { greaterThan: 828000, color: '#E31A1C' },
            { greaterThan: 1035000, color: '#BD0026' },
            { greaterThan: 1242000, color: '#800026' },
        ];

        getGEOJSON(dataURL, data => {
            this.map = new map('js-map', cordobaCoords, 3);
            this.map.createPopulationChoroLayer(data, colorArray, initialCommonStyle);
            this.style = style(this.generateControls(this.map), 'controls');
        });
    }

    generateControls(map) {
        const strokeSlider = new rangeSlider(
            'Stroke',
            map.markerStyle.weight,
            1,
            20,
            0.5,
            map.changeStyleProperty('weight'), 
        );
        
        const fillOpacitySlider = new rangeSlider(
            'Fill opacity',
            map.markerStyle.fillOpacity,
            0,
            1,
            0.1,
            map.changeStyleProperty('fillOpacity'),
        );
        
        const strokeColorSwitch = new colorSwitch(
            'Stroke',
            colors,
            map.changeStyleProperty('color'),
        );
        

        return [
            strokeSlider,
            fillOpacitySlider,
            strokeColorSwitch
        ];
    }
}

const mapType = document.getElementsByTagName('script')[0].getAttribute('data-map');

const mapToRender = type => {
    if(mapType === 'markers') {
        return new MarkersApp();
    }
    return new ChoroApp();
}

let app = mapToRender(mapType);