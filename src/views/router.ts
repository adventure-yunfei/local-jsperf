import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
import IndexView from './index-view/IndexView'
import TestSuiteView from './test-case-view/TestSuiteView'

Vue.use(VueRouter);

const router = new VueRouter();

router.map({
    '/': {
        component: IndexView
    },
    '/test-case/:testSuiteName': {
        component: TestSuiteView
    }
});

export default router;
