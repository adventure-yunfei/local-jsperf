declare var Benchmark: any

export default {
    template: require('./IndexView.html'),
    style: require('./IndexView.less'),

    data() {
        return {
            testResultItems: [],
            testSummary: ''
        };
    },

    attached() {
        this.runTest();
    },

    methods: {
        runTest() {
            var suite = new Benchmark.Suite();

            suite
                .add('RegExp#test', () => {
                    /o/.test('Hello World!');
                })
                .add('String#indexOf', () => {
                    'Hello World!'.indexOf('o') > -1;
                })

                .on('cycle', event => {
                    this.addTestResult(String(event.target));
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
