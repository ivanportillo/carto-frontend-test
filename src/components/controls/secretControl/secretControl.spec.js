const secretControl = require('./secretControl');

describe('Secret Control Component', () => {
    const name = 'Test';
    let component;
    let onClickFn;
    let mockHeart;

    
    beforeEach(() => {
        mockHeart = document.createElement('span');
        mockHeart.id = 'heart';
        document.body.appendChild(mockHeart);

        onClickFn = jest.fn();
        component = new secretControl(name, onClickFn, mockHeart.id);
    });

    test('Returns a component', () => {
        const elements = component.childNodes;

        expect(elements.length).toBe(2);
        //Range Slider is composed by 2 elements: label and a button
        const label = elements[0];
        expect(label.nodeName === 'LABEL');
        expect(label.innerHTML === name);

        const div = elements[1];
        expect(div.nodeName === 'BUTTON');
    });

    test('Clicking the button fires the function', () => {
        const elements = component.childNodes;
        const button = elements[1];

        button.click();

        expect(onClickFn.mock.calls.length).toBe(1);
    });

    test('Clicking twice the heart shows us the component', () => {
        expect(component.style.display === 'none');

        component.click();
        component.click();

        expect(component.style.display === 'flex');
    });
});