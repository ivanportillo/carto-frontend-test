'use strict';

class SecretControl {
    constructor(name, onClick, heartContainer) {
        this.container = document.createElement('div');
        this.container.className = 'secret-control-container';
        this.label = this.createLabel(name);
        this.button = this.createButton(onClick);

        this.heart = this.addHeart(heartContainer, () => this.setVisible(this.container));

        this.container.appendChild(this.label);
        this.container.appendChild(this.button);

        return this.container;
    }

    createLabel(name) {
        let label = document.createElement('label');
        Object.assign(label, {
            innerHTML: name,
            className: 'secret-control-label'
        });

        return label;
    }

    createButton(onClick) {
        let button = document.createElement('button');
        Object.assign(button, {
            innerHTML: 'X',
            className: 'secret-control-button',
            onclick: onClick
        });

        return button;
    }

    addHeart(container, onPress) {
        let counter = 0;
        let span = document.getElementById(container);
        span.addEventListener('click', () => {
            counter++;
    
            if(counter == 2) {
                onPress();
                counter = 0;
            }
        });
    }

    setVisible(container) {
        this.container.style.display = 'flex';
    }
}

module.exports = SecretControl;