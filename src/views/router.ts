import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
import IndexView from './index-view/IndexView'
import TestCaseView from './test-case-view/TestCaseView'

Vue.use(VueRouter);

const router = new VueRouter();

router.map({
    '/': {
        component: IndexView
    },
    '/test-case/:testCaseName': {
        component: TestCaseView
    }
});

export default router;
