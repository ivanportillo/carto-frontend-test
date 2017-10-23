'use strict';

const Style = (controls, mountPoint) => {
    let container = document.getElementById(mountPoint);

    controls.forEach(control => {
        container.appendChild(control);
    });

    return container;
}

module.exports = Style;