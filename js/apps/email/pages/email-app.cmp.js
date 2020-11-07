console.log('email-app run')
import { emailService } from '../services/email-service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import emailList from '../cmps/email-list.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'
import testComp from '../cmps/test-component.cmp.js'

export default {
    name: 'email-app',
    props: [],
    template: `
    <section class="email-app">
        <div class='side-bar'>
            
            <router-link :to="'/email/compose'" exact class="compose-button"><i class="fas fa-plus"></i> Compose</router-link>
            <router-link :to="'/email/filter'" exact class="inbox-button"><i class="fas fa-inbox"></i> Inbox</router-link>
            <router-link :to="'/email/filter'" exact class="inbox-button"><i class="fas fa-paper-plane"></i> Sent</router-link>
            <router-link :to="'/email/filter'" exact class="inbox-button"><i class="fas fa-star"></i> Starred</router-link>

        </div>
        <div class="work-area">
            <router-view name="details"></router-view>
            <router-view name="compose"></router-view>
            <router-view name="filter"></router-view>
            <router-view name="list"></router-view>
             
        <!-- <email-filter></email-filter> -->
        <!-- <email-list></email-list> -->
        </div>
    </section>
    `,
    data() {
        return {
            emails: null,
            filterBy: null,
        }
    },
    methods: {
        setFilter(filterBy) {
            console.log('entered setFilter')
            let filter = {};
            filter = { ...filterBy };
            this.filterBy = filter;
            console.log('this.filterBy', this.filterBy);
        }
    },
    computed: {
        emailsToShow() {
            if (!this.filterBy) return this.emails;

            const txt = this.filterBy.byText.toLowerCase();
            return this.emails.filter(email =>
                (email.subject.toLowerCase().includes(txt) ||
                    email.sendTo.toLowerCase().includes(txt) ||
                    email.body.toLowerCase().includes(txt)) &&
                (
                    email.isRead && this.filterBy.isRead ||
                    !email.isRead && this.filterBy.isUnread
                )
            )
        }
    },
    mounted() {

    },
    created() {
        emailService.getEmails()
            .then(emails => {
                console.log('email app finished created', emails);
                this.emails = emails;
            });
        eventBus.$on('doFilter', (filter) => {
            this.setFilter(filter);
            // this.message = msg;
        });

        this.$router.push('/email/filter');
        // this.$router.push('filter').catch(failure => {
        //     if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
        //       failure.to.path // '/admin'
        //       failure.from.path // '/'
        //     }
        //   })
    },
    components: {
        emailList,
        emailFilter,
        emailCompose,
        testComp
    }

}