import stringMatchTest from './stringMatchTest'
import virtualDomTest from './virtualDomTest'
import {TestSuite} from './createTestSuite'

const testSuites: TestSuite[] = [
    stringMatchTest,
    virtualDomTest
];

export default testSuites
