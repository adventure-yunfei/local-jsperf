export default function createTestCase(testCaseName: string, testItems: [{name: string, func: Function}]) {
    return {
        name: testCaseName,
        items: testItems
    };
}

export function testItem(name: string, desc: string, func: Function) {
    return {
        name: name,
        desc: desc,
        func: func
    };
}
