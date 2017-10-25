const style = require('./style');

describe('Style Component', () => {
    let component;
    let dummyComponent;
    let controls;
    let mountPoint = 'mountDiv';

    beforeEach(() => {
        let div = document.createElement('div');
        div.id = mountPoint;
        document.body.appendChild(div);

        dummyComponent = document.createElement('label');
        dummyComponent.innerHTML = 'LABEL';

        controls = [dummyComponent, dummyComponent, dummyComponent];

        component = style(
            [dummyComponent, dummyComponent, dummyComponent],
            mountPoint
        );
    });

    test('Renders correctly', () => {
        const elements = component.childNodes;
        expect(elements.length === controls.length);
    });
});