import { emailService } from '../services/email-service.js'
import { eventBus, EVENT_SHARE_AS_NOTE, EVENT_SHOW_MSG } from '../../../services/event-bus-service.js'


export default {
    name: 'email-read',
    props: [],
    template: `
    <section v-if="email" class="email-read">
        <button @click="onBackToInbox"><i class="fas fa-backspace"></i> Back to Inbox</button>
        <button @click="onDelete"><i class="fas fa-trash"></i></button>
        <button @click="onSendToNote">Send to Note</button>
<<<<<<< HEAD
          <h3>From: {{email.sentBy}}</h3>
          <h4>Sent at: {{email.sentAt}}</h4>
=======
        <h3>From: {{email.sentBy}}</h3>
        <!-- <h1> rEmailID: {{rEmailId}}</h1> -->
          <h4>Sent at: {{showSentAt}}</h4>
>>>>>>> 2d2061112463ee03fc63662de6e330ca701ff3be
          <h5>Subject: {{email.subject}}</h5>
          <h5>{{email.body}}</h5>
          <!-- <long-text v-bind:txt="book.description"></long-text> -->
          <!-- <span v-if="book.listPrice.isOnSale">ON SALE!!!</span> -->
    </section>
    `,
    data() {
        return {
            email: null,
        }
    },
    methods: {
        onDelete() {
            emailService.deleteEmailById(this.email.id)
                .then(res => {
                    console.log(res);
                    this.$router.push('/email/filter');
                });
        },
        onBackToInbox() {
            emailService.markAsRead(this.email.id)
                .then(res => {
                    console.log(res);
                    this.$router.push('/email/filter');
                });
        },
        onSendToNote() {
            console.log('onSendToNote', this.email.body)
            eventBus.$emit(EVENT_SHARE_AS_NOTE, this.email.body);
            const msg = {
                txt: 'Email sent as a Note',
                type: 'success'
            }
            eventBus.$emit(EVENT_SHOW_MSG, msg);
        }
    },
    computed: {
        // showSentAt() {
        //     let date = new Date(this.email.sentAt);
        //     return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        // }
    },
    mounted() {

    },
    created() {
        const id = this.$route.params.rEmailId;
        console.log('email-read id', id);
        console.log('rEmailId', this.rEmailId)
        emailService.getEmailById(id)
            .then(rEmail => {
                this.email = rEmail;
            })
    },
    components: {

    }
}