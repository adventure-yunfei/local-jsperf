import * as Vue from 'vue'
import App from './views/index-view/IndexView';
import router from './views/router';

router.start({
    template: '<div id="app"><router-view></router-view></div>'
}, '#app');
