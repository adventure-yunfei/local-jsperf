import createTestCase, {testItem} from './createTestCase'

export default createTestCase('String Match Test', [
    testItem('RegExp#test', '', () => {
        return /o/.test('Hello World!');
    }),

    testItem('String#indexOf', '', () => {
        return 'Hello World!'.indexOf('o') > -1;
    })
])
