'use strict';

class ColorSwitch {
    constructor(name, colors, onChange, containerID) {
        this.container = document.createElement('div');
        this.container.className = 'color-switch-container';
        this.label = this.createLabel(name);
        this.buttons = this.createButtons(name, colors, onChange);

        this.container.appendChild(this.label);
        this.container.appendChild(this.buttons);

        return this.container;

    }

    createLabel(name) {
        let label = document.createElement('label');
        Object.assign(label, {
            innerHTML: name,
            className: 'color-switch-label'
        });

        return label;
    }

    createButtons(name, colors, onChange) {
        let container = document.createElement('div');
        container.className = 'color-switch-buttons';

        colors.forEach(color => {
            let button = document.createElement('button');

            button.className = `color-switch-button`;
            button.style.background = color;
            button.addEventListener('click', () => onChange(color));


            container.appendChild(button);
        }, this);

        return container;
    }
}

module.exports = ColorSwitch;