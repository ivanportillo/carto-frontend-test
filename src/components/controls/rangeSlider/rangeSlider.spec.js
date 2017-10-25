const rangeSlider = require('./rangeSlider');

describe('Range Slider Component', () => {
    const name = 'Test';
    const initialValue = 1;
    const min = 1;
    const max = 10;
    const step = 1;
    let onChangeFn;
    let component;


    beforeEach(() => {
        onChangeFn = jest.fn();
        component = new rangeSlider(
            name, 
            initialValue, 
            min,
            max,
            step,
            onChangeFn
        );
    });

    test('Returns a component', () => {
        const elements = component.childNodes;

        expect(elements.length).toBe(3);
        //Range Slider is composed by 3 elements: label, div and input
        const label = elements[0];
        expect(label.nodeName === 'LABEL');
        expect(label.innerHTML === name);

        const div = elements[1];
        expect(div.nodeName === 'DIV');
        expect(div.innerHTML === initialValue);

        const input = elements[2];
        expect(div.nodeName === 'INPUT');
        expect(div.min === min);
        expect(div.max === max);
        expect(div.step === step);
    });

    test('Changing value fires the function', () => {
        const elements = component.childNodes;
        const input = elements[2];

        const newValue = 3;
        input.value = newValue;
        input.dispatchEvent(new Event('change'));

        expect(onChangeFn.mock.calls.length).toBe(1);
        expect(onChangeFn.mock.calls[0] === newValue);
    });
});