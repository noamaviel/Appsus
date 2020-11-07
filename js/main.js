
import { myRouter } from './routes.js'
import appHeader from '../js/layout-cmps/header-app.cmp.js'
import appFooter from '../js/layout-cmps/footer-app.cmp.js'

const options = {
    el: '#app',
    router: myRouter,
    template: `
        <section class="appsus">
            <app-header />
                    <router-view></router-view>
            <app-footer />
        </section>
        `,
    components: {
        appHeader,
        appFooter,
    }
}

const app = new Vue(options);
