declare var Benchmark: any

import testSuites from '../../test-suites/testSuites'
import {VueComponent} from 'vue-typescript'

@VueComponent({
    template: require('./IndexView.html'),
    style: require('./IndexView.less')
})
export default class IndexView {
    testSuites = testSuites
}
