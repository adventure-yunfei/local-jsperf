declare var Benchmark: any

import testCases from '../../test-cases/testCases'

export default {
    template: require('./IndexView.html'),
    style: require('./IndexView.less'),

    data() {
        return {
            testCases: testCases
        };
    }
}
