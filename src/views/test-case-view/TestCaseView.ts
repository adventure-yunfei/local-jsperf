declare var Benchmark: any;
declare var _: any;

import testCases from '../../test-cases/testCases'
import {VueComponent} from 'vue-typescript'

@VueComponent({
    template: require('./TestCaseView.html'),
    style: require('./TestCaseView.less'),

    created() {
        const testCaseName = decodeURIComponent(this.$route.params.testCaseName);
        this.testCase = testCases.filter(testCase => testCase.name === testCaseName)[0];
        this.testResultItems = [];
        this.testSummary = '';
    },

    beforeDestroy() {
        this.clearTestSuite();
    }
})
export default class TestCaseView {
    testCase = null
    testResultItems = []
    testSummary = ''

    _testSuite = null

    clearTestSuite() {
        if (this._testSuite) {
            this._testSuite.abort();
            this._testSuite.off();
        }
    }

    getTestItemIdx(name) {
        return _.findIndex(this.testCase.items, item => item.name === name);
    }

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
                this.testSummary = 'Fastest is ' + suite.filter('fastest').map('name');
            })
            .run({ 'async': true });
    }
}
