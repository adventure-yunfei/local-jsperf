interface TestCase {
    testCaseName: string,
    func: Function,
    desc?: string,
    setup?: Function,
    teardown?: Function,
    eachLoopSetup?: Function,
    eachLoopTeardown?: Function
}

export interface TestSuite {
    name: string,
    desc: string,
    testCases: TestCase[],
    libs: string[]
}

interface _TestSuiteInput {
    name: string,
    testCases: TestCase[],
    desc?: string,
    libs?: string[]
}

export function createTestSuite(options: _TestSuiteInput): TestSuite {
    return {
        name: options.name,
        desc: options.desc || '',
        testCases: options.testCases,
        libs: options.libs || []
    };
}
