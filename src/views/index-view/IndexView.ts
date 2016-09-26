declare var Benchmark: any

import testCases from '../../test-cases/testCases'
import {VueComponent} from 'vue-typescript'

@VueComponent({
    template: require('./IndexView.html'),
    style: require('./IndexView.less')
})
export default class IndexView {
    testCases = testCases
}
