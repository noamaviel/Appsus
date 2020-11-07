
import homePage from './pages/home-page.cmp.js';
import aboutUs from './pages/about-us.cmp.js';
import emailApp from './apps/email/pages/email-app.cmp.js';
import noteApp from './apps/note/pages/note-app.cmp.js';
import emailCompose from './apps/email/cmps/email-compose.cmp.js'
import emailRead from './apps/email/cmps/email-read.cmp.js';
import emailFilter from './apps/email/cmps/email-filter.cmp.js';
import emailList from './apps/email/cmps/email-list.cmp.js';
import testComp from './apps/email/cmps/test-component.cmp.js'

const myRoutes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutUs
    },
    {
        path: '/email',
        component: emailApp,
        children: [
            {
                path: '/email/compose',
                components: {
                    compose: emailCompose
                }
            },
            {
                path: '/email/filter',
                components: {
                    filter: emailFilter,
                    list: emailList
                }
            },
            {
                path: '/email/:rEmailId',
                components: {
                    details: emailRead
                },
                props: {
                    details: true
                }
            },
        ]
    },
    {
        path: '/note',
        component: noteApp
    },
]

export const myRouter = new VueRouter({ routes: myRoutes })
