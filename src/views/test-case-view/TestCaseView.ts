declare var Benchmark: any
declare var _: any

import testCases from '../../test-cases/testCases'

export default {
    template: require('./TestCaseView.html'),
    style: require('./TestCaseView.less'),

    data() {
        const testCaseName = decodeURIComponent(this.$route.params.testCaseName);
        return {
            testCase: testCases.filter(testCase => testCase.name === testCaseName)[0],
            testResultItems: [],
            testSummary: ''
        };
    },

    beforeDestroy() {
        this.clearTestSuite();
    },

    methods: {
        clearTestSuite() {
            if (this._testSuite) {
                this._testSuite.abort();
                this._testSuite.off();
            }
        },

        getTestItemIdx(name) {
            return _.findIndex(this.testCase.items, item => item.name === name);
        },

        runTest() {
            this.clearTestSuite();

            this.testResultItems = [];
            this.testSummary = '';

            var suite = this._testSuite = new Benchmark.Suite();
            this.testCase.items.forEach(testItem => {
                suite.add(testItem.name, testItem.func);
            });

            suite
                .on('start', event => {
                    const testResultItems = this.testResultItems;
                    this.testCase.items.forEach((item, idx) => testResultItems[idx] = 'Executing...');
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
                    this.addTestFinalSummary('Fastest is ' + suite.filter('fastest').map('name'));
                })
                .run({ 'async': true });
        },

        addTestResult(testResult:string) {
            this.testResultItems.push(testResult);
            console.log(testResult);
        },

        addTestFinalSummary(testSummary:string) {
            this.testSummary = testSummary;
            console.log(testSummary);
        }
    }
}
