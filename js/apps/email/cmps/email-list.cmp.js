console.log('email-list');
import emailPreview from './email-preview.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'
import { emailService } from '../services/email-service.js';
// import { eventBus } from '../../../services/event-bus-service.js';

export default {
    name: 'email-list',
    props: [],
    template: `
    <section class="email-list-container">
      <span class="unread-title">Unread messages: {{unReadCount}}</span>
       <ul class="email-list">
           <li v-for="currEmail in this.$parent.emailsToShow" :key="currEmail.id">
                <email-preview :email="currEmail"></email-preview>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        unReadCount() {
            return emailService.getUnreadCount()
        }
    },
    mounted() {

    },
    created() {

    },
    components: {
        emailPreview,
        emailCompose
    }

}