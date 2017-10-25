const colorSwitch = require('./colorSwitch');

describe('Color Switch Component', () => {
    const name = 'Test';
    const colors = ['#FFFFFF', '#000000'];
    let component;
    let onChangeFn;

    beforeEach(() => {
        onChangeFn = jest.fn();
        component = new colorSwitch(name, colors, onChangeFn);
    });

    test('Returns a component', () => {
        const elements = component.childNodes;
        expect(elements.length).toBe(2);
        
        //A ColorSwitch is composed by a label and a div with buttons
        const label = elements[0];
        expect(label.nodeName === 'LABEL');
        expect(label.innerHTML === name);

        //The second element (div) contains buttons (two)
        const div = elements[1];
        expect(div.nodeName === 'DIV');

        const colorButtons = div.childNodes;
        expect(colorButtons.length).toBe(2);
        expect(colorButtons[0].nodeName).toEqual('BUTTON');
        expect(colorButtons[1].nodeName).toEqual('BUTTON');
    });

    test('Clicking a button fires the function', () => {
        const elements = component.childNodes;
        const colorButtons = elements[1].childNodes;

        //It clicks both buttons
        colorButtons[0].click();
        colorButtons[1].click();

        expect(onChangeFn.mock.calls.length).toBe(2);
        expect(onChangeFn.mock.calls[0] === colors[0]);
        expect(onChangeFn.mock.calls[1] === colors[1]);
    });
});