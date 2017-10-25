'use strict';

class RangeSlider {
    constructor(name, initialValue, min, max, step, onInput, containerID) {
        this.label = this.createLabel(name, this.container);
        this.valueLabel = this.createValueLabel(initialValue);
        this.slider = this.createSlider(name, initialValue, this.valueLabel, min, max, step, onInput);

        this.container = this.createContainer(
            'range-slider-container', 
            this.label,
            this.valueLabel,
            this.slider
        );
        
        return this.container;
    }

    createLabel(name) {
        let label = document.createElement('label');
        Object.assign(label, {
            innerHTML: name,
            className: 'range-slider-label'
        });

        return label;
    }

    createValueLabel(value) {
        let valueLabel = document.createElement('label');
        Object.assign(valueLabel, {
            className: 'range-slider-value-label',
            innerHTML: value
        });

        return valueLabel;
    }

    createSlider(name, value, valueLabel, min, max, step, onInput) {
        let slider = document.createElement('input');
        Object.assign(slider, {
            type: 'range',
            className: 'range-slider',
            id: name,
            min,
            max,
            step,
            value,
            onchange: ({ target: { value }}) => { onInput(value); },
            oninput: ({ target: { value }}) => { valueLabel.innerHTML = value; }
        });

        return slider;
    }

    createContainer(className, label, valueLabel, slider) {
        let container = document.createElement('div');
        container.className = 'range-slider-container';

        container.appendChild(this.label);
        container.appendChild(this.valueLabel);
        container.appendChild(this.slider);

        return container;
    }
}

module.exports = RangeSlider;