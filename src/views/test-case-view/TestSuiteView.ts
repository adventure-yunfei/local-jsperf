declare var Benchmark: any;

const loadScript = require('load-script');
import {TestSuite} from '../../test-suites/createTestSuite'
import testSuites from '../../test-suites/testSuites'
import {VueComponent} from 'vue-typescript'

@VueComponent({
    template: require('./TestSuiteView.html'),
    style: require('./TestSuiteView.less'),

    created() {
        const testCaseName = decodeURIComponent(this.$route.params.testSuiteName);
        this.testSuite = testSuites.filter(testCase => testCase.name === testCaseName)[0];
        this.testResultItems = [];
        this.testSummary = '';

        let executeLoad = () => {};
        this.testSuite.libs.reverse().forEach(libSrc => {
            const _originExecLoad = executeLoad;
            executeLoad = () => loadScript(libSrc, _originExecLoad);
        });
        executeLoad();
    },

    beforeDestroy() {
        this.clearTestSuite();
    }
})
export default class TestCaseView {
    testSuite: TestSuite = null;
    testResultItems: string[] = [];
    testSummary: string = '';

    _testSuite: any = null;

    clearTestSuite() {
        if (this._testSuite) {
            this._testSuite.abort();
            this._testSuite.off();
        }
    }

    getTestItemIdx(name) {
        return _.findIndex(this.testSuite.testCases, item => item.testCaseName === name);
    }

    runTest(): void {
        this.clearTestSuite();

        this.testResultItems = [];
        this.testSummary = '';

        var suite = this._testSuite = new Benchmark.Suite();
        this.testSuite.testCases.forEach(testItem => {
            suite.add(testItem.testCaseName, testItem.func, {
                onStart: () => {
                    this.testResultItems[this.getTestItemIdx(testItem.testCaseName)] = 'Executing...';
                    this.testResultItems = this.testResultItems.concat();
                    testItem.setup && testItem.setup();
                },
                onComplete: testItem.teardown,
                setup: testItem.eachLoopSetup,
                teardown: testItem.eachLoopTeardown
            });
        });

        suite
            .on('start', event => {
                const testResultItems = this.testResultItems;
                this.testSuite.testCases.forEach((item, idx) => testResultItems[idx] = 'Waiting...');
                this.testResultItems = testResultItems.concat();
            })
            .on('cycle', event => {
                const itemIdx = this.getTestItemIdx(event.target.name);
                if (itemIdx !== -1) {
                    const testResultItems = this.testResultItems;
                    testResultItems[itemIdx] = event.target.toString();
                    this.testResultItems = testResultItems.concat();
                }
            })
            .on('complete', () => {
                this.testSummary = 'Fastest is ' + suite.filter('fastest').map('name');
            })
            .run({ 'async': true });
    }
}
