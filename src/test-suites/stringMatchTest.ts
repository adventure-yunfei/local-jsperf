import {createTestSuite} from './createTestSuite'

export default createTestSuite({
    name: 'String Match',
    desc: 'A simple test that compares different ways to search in string.',
    testCases: [{
        testCaseName: 'RegExp#test',
        func() {
            return /o/.test('Hello World!');
        }
    }, {
        testCaseName: 'String#indexOf',
        func() {
            return 'Hello World!'.indexOf('o') > -1;
        }
    }]
})
