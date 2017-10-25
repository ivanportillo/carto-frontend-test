'use strict';

const map = require('./components/map');
const style = require('./components/style/style');

const rangeSlider = require('./components/controls/rangeSlider/rangeSlider');
const colorSwitch = require('./components/controls/colorSwitch/colorSwitch');
const secretControl = require('./components/controls/secretControl/secretControl');

const cordobaCoords = [37.887652, -4.779980];
const colors = ['#C5EDAC', '#474954', '#DD1C1A', '#F0C808', '#07A0C3'];
const dataURL = 'https://xavijam.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20ne_10m_populated_places_simple&format=GeoJSON';

class App {
    constructor() {
        this.getGEOJSON(dataURL, data => {
            this.map = new map('js-map', cordobaCoords, 12, data);
            this.style = style(this.generateControls(this.map), 'controls');
        });
    }

    getGEOJSON(url, cb) {
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.send();

        request.onload = data => {
            cb(JSON.parse(data.target.responseText));
        }
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

const app = new App();

